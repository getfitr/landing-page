#!/usr/bin/env node
import 'source-map-support/register';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { App, Stack, StackProps } from '@aws-cdk/core';

const app = new App();
const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION;

export interface LandingPagePipelineProps extends StackProps {
  readonly siteBucket: string; // need to update it when I know what is needed
}

export class LandingPagePipeline extends Stack {
  constructor(app: App, id: string, props: LandingPagePipelineProps) {
    super(app, id, props);

    const build = new codebuild.PipelineProject(this, `${id}Build`, {
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      },
    });

    const sourceOutput = new codepipeline.Artifact(`${id}SrcOutput`);
    const buildOutput = new codepipeline.Artifact(`${id}BuildOutput`);
    const connectionArn = this.node.tryGetContext("githubConnectionArn");

    new codepipeline.Pipeline(this, id, {
      restartExecutionOnUpdate: true,
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipeline_actions.CodeStarConnectionsSourceAction({
              actionName: 'Checkout',
              output: sourceOutput,
              owner: 'getfitr',
              repo: 'landing-page-pipeline',
              branch: 'main',
              connectionArn: connectionArn,
            }),
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new codepipeline_actions.CodeBuildAction({
              actionName: 'Build',
              project: build,
              input: sourceOutput,
              outputs: [buildOutput],
            }),
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
