#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaStack } from '../lib/lambda-stack';
import { LandingPagePipelineStack } from '../lib/landing-page-pipeline-stack';

const app = new cdk.App();
const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION;

const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  env: { account, region },
});

new LandingPagePipelineStack(app, 'LandingPagePipelineStack', {
  lambdaCode: lambdaStack.lambdaCode,
  env: { account, region },
});

app.synth();
