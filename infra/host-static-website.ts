#!/usr/bin/env node
import { CloudFrontWebDistribution, OriginAccessIdentity, SecurityPolicyProtocol, SSLMethod } from '@aws-cdk/aws-cloudfront';
import { Bucket, CfnBucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { App, CfnOutput, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';

import * as lambda from '@aws-cdk/aws-lambda';


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
export class HostStaticWebsite extends Stack {
  public readonly siteDeployment: string; // don't know yet what to put here
  
  constructor(app: App, id: string, props?: StackProps) {
    super(app, id, props);

    //     this.lambdaCode = lambda.Code.fromCfnParameters();
    //     const func = new lambda.Function(this, 'Lambda', {
    //     });
    //     const alias = new lambda.Alias(this, 'LambdaAlias', {
    //       aliasName: 'Prod',
    //     });
    //     new codedeploy.LambdaDeploymentGroup(this, 'DeploymentGroup', {
    //       alias,
    //       deploymentConfig: codedeploy.LambdaDeploymentConfig.LINEAR_10PERCENT_EVERY_2MINUTES,
    //     });
    

    // S3 Bucket for static website 
    const siteBucket = new Bucket(this, "SiteBucket", {
      bucketName: "getfitr-landing-page-site",
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.html",
      removalPolicy: RemovalPolicy.DESTROY,
    });
    new CfnOutput(this, "SiteBucketName", { value: siteBucket.bucketName });
        
    const siteDomain = this.node.tryGetContext("domain");
    const certificateArn = this.node.tryGetContext("certificateArn");

    // CloudFront distribution that provides HTTPS
    const oai = new OriginAccessIdentity(this, "OriginAccessIdentity");
    const distribution = new CloudFrontWebDistribution(this, "SiteDistribution", {
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
    new CfnOutput(this, "SiteUrl", { value: `https://${siteDomain}` });

    // Deploy `./src` on your S3 Bucket
    // new BucketDeployment(this, "DeployOnSiteBucket", {
    //   sources: [Source.asset("./src")],
    //   destinationBucket: siteBucket,
    //   distribution,
    //   distributionPaths: ["/*"],
    // })
  }
}
