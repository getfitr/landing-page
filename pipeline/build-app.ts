import { LinuxBuildImage, PipelineProject } from "@aws-cdk/aws-codebuild";
import { Artifact } from "@aws-cdk/aws-codepipeline";
import { CodeBuildAction } from "@aws-cdk/aws-codepipeline-actions";
import { Stack } from "@aws-cdk/core";

export const buildApp = (context: Stack, id: string, sourceOutput: Artifact, buildOutput: Artifact) => {
  const build = new PipelineProject(context, `${id}Build`, {
    environment: {
      buildImage: LinuxBuildImage.STANDARD_5_0,
    },
  });

  return new CodeBuildAction({
    actionName: 'Build',
    project: build,
    input: sourceOutput,
    outputs: [buildOutput],
  });
};
