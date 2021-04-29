#!/usr/bin/env node
import 'source-map-support/register';
import { App, CfnOutput, Stack, StackProps } from '@aws-cdk/core';
import { cloneGithubSources } from './clone-github-sources';
import { buildApp } from './build-app';
import { Artifact, Pipeline } from '@aws-cdk/aws-codepipeline';
import { HostStaticWebsite } from '../infra/host-static-website';

const app = new App();
const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION;

export interface LandingPagePipelineProps extends StackProps {
  readonly siteBucket: string; // need to update it when I know what is needed
}

export class LandingPagePipeline extends Stack {
  constructor(app: App, id: string, props: LandingPagePipelineProps) {
    super(app, id, props);

    /**
     * What did the original script do?
     * 
     * 1. It created a Lambda Stack
     *  - it defines a CF Parameter lambdaCode which requires the code for the Lambda function
     *  - it creates the Lambda function with lambdaCode as the code (as the code is not ready the function can not be created yet)
     *  - it creates an alias Prod with the version number for the Lambda function
     *  - it creates a deployment group to gradually deploy the function (10% of the traffic per minute)
     * 
     * 2. It created a Pipeline Stack which requests the variable lambdaCode from the Lambda Stack
     *  - it creates a project for the CDK Build (it creates the CF file for the Lambda function creation)
     *  - it creates a project for building the Lambda function from the lambda folder
     *  - it creates three output Artifact variables (i.e., sources, CF template file, build output)
     *  - it creates a pipeline with three steps: Source, Build, and Deploy
     *    - the Source step clones the sources from the GitHub repo
     *    - the Build step takes the code and 1/ creates the build for the Lambda function, and 2/ creates the CF template file
     *    - the Deploy step creates the Lambda function based on the CF template file and the build
     * 
     * In our case we need the following
     * 
     * 1. Create a Stack that creates a S3 bucket for the static website content and a CloudFront distribution
     * 2. Create a Pipeline Stack which
     *  - it creates a pipeline with three steps: Source, Build, and Deploy
     *    - the Source step clones the sources from the GitHub repo
     *    - the Build step takes the code and 1/ creates the build, and 2/ creates the S3 bucket
     * 
     */
    const sourceOutput = new Artifact(`${id}SrcOutput`);
    const buildOutput = new Artifact(`${id}BuildOutput`);
    const siteDomain = this.node.tryGetContext("domain");
    const certificateArn = this.node.tryGetContext("certificateArn");

    const staticBucket = new HostStaticWebsite(this, `${id}Site`, {
      s3BucketName: 'getfitr-landing-page-static-site',
      siteDomain,
      certificateArn,
    });
    const { distribution: { distributionId }} = staticBucket;
    new CfnOutput(this, `${id}DistributionId`, { value: distributionId });

    new Pipeline(this, id, {
      restartExecutionOnUpdate: false,  // it should only start when new sources are pushed to GitHub
      stages: [
        {
          stageName: 'Source',
          actions: [cloneGithubSources(this, sourceOutput)],
        },
        {
          stageName: 'Build',
          actions: [
            buildApp(this, id, sourceOutput, buildOutput),
          ],
        },
      ],
    });
  }
};

new LandingPagePipeline(app, 'LandingPagePipeline', {
  siteBucket: 'should-be-site-bucket-name', // from S3 Bucket Stack
  env: { account, region },
});

app.synth();
