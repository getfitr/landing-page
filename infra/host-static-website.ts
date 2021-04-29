#!/usr/bin/env node
import { CloudFrontWebDistribution, OriginAccessIdentity, SecurityPolicyProtocol, SSLMethod } from '@aws-cdk/aws-cloudfront';
import { Bucket } from '@aws-cdk/aws-s3';
import { App, CfnOutput, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 * 
 * This stack relies on getting the domain name from CDK context, and the 
 * certificateArn which must be provided in the us-east-1 region.
 * 
 * Add the following to cdk.json:
 * {
 *   "context": {
 *     "domain": "mystaticsite.com",
 *     "certificateArn": "arn:aws:acm:us-east-1:691062780315:certificate/a44066ce-66a7-41c8-a9ce-e76940b7d226"
 *   }
 * }
 */
export interface HostStaticWebsiteProps extends StackProps {
  readonly s3BucketName: string;
  readonly siteDomain: string;
  readonly certificateArn: string;
};

export class HostStaticWebsite extends Stack {
  readonly distribution: CloudFrontWebDistribution;

  constructor(app: App, id: string, { s3BucketName, siteDomain, certificateArn, ...rest}: HostStaticWebsiteProps) {
    super(app, id, { ...rest });

    // S3 Bucket for static website 
    const siteBucket = new Bucket(this, `${id}Bucket`, {
      bucketName: s3BucketName,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.html",
      removalPolicy: RemovalPolicy.DESTROY,
    });
    new CfnOutput(this, `${id}BucketName`, { value: siteBucket.bucketName });
        
    // CloudFront distribution that provides HTTPS
    const oai = new OriginAccessIdentity(this, "OriginAccessIdentity");
    this.distribution = new CloudFrontWebDistribution(this, `${id}Distribution`, {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: siteBucket,
          originAccessIdentity: oai,
        },
        behaviors: [{ isDefaultBehavior: true }],
      }],
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [siteDomain],
        sslMethod: SSLMethod.SNI,
        securityPolicy: SecurityPolicyProtocol.TLS_V1_1_2016,
      },
    });
    new CfnOutput(this, `${id}Url`, { value: `https://${siteDomain}` });
  };
};
