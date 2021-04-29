import { Artifact } from "@aws-cdk/aws-codepipeline";
import { CodeStarConnectionsSourceAction } from "@aws-cdk/aws-codepipeline-actions";
import { Stack } from "@aws-cdk/core";

export const cloneGithubSources = (context: Stack, sourceOutput: Artifact) => {
  const connectionArn = context.node.tryGetContext("githubConnectionArn");
  const gitRepository = context.node.tryGetContext("gitRepository");

  return new CodeStarConnectionsSourceAction({
    actionName: 'Checkout',
    output: sourceOutput,
    ...gitRepository,
    connectionArn: connectionArn,
  });
};
