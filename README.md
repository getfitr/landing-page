# GetFitr! Landing Page

This is the project for developing and deploying the landing page for the GetFitr! project.

## Getting Started

### Clone the repository:

```bash
git clone https://github.com/getfitr/landing-page.git
cd landing-page
```

### Make sure you configure your AWS environment:

```bash
aws configure
```

You connect to your AWS account using an access key and a secret and you provide the AWS Region in which you will deploy the pipeline.

### Install all dependencies for the project:

```bash
# installs dependencies for the CDK
npm install
# installs dependencies for the app
npm run app:install
```

### Start your app locally:

```bash
npm run app:start
```

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits. You will also see any lint errors in the console.

### To run test just run:

```bash
# this starts a jest runner which is watching for changes
npm run app:test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### Build the React app:

```bash
npm run app:build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Create a release like this:

```bash
npm run release
```

A release will...

- create a new version number based on conventional versioning guidelines (see [standard-version documentation](https://github.com/conventional-changelog/standard-version) for commit guidelines),
- write all commit messages to the `CHANGELOG.md` file,
- create a git tag with the version number,
- pushes the changes to the main branch on GitHub,
- and deploys the CI/CD pipeline, if changes where made.

A push to the main branch on GitHub will always trigger the pipeline to build and deploy the change into production.

The `cdk.json` file tells the CDK Toolkit how to build the pipeline.

## Dependencies / Requirements

The stack expects a couple of information being provided within the `cdk.json`:

1. The AWS Resource Name (ARN) for the GitHub Connection (this is [how to create the connection in the CodePipeline settings](https://docs.aws.amazon.com/codepipeline/latest/userguide/connections-github.html)).
2. A domain name for the landing page (Hosted by Route53).
3. A subdomain name for the landing page (e.g., `landing.example.com`).
4. The ARN for the certificate, to allow https access (the certificate must be provided in the us-east-1 region, as this is the region where CloudFront is searching for it).
5. Information about the repository in GitHub which will trigger the pipeline (i.e., the `owner`, the `repo` name, and the `branch` name).

### Todos:

- [ ] Explain how to create a Hosted Zone in Route 53.
- [ ] Explain how to create a certificate.

Here is an example for the settings in the `cdk.json`:

```json
{
  ...
  "context": {
    ...
    "domain": "getfitr.de",
    "subdomain": "",
    "certificateArn": "arn:aws:acm:us-east-1:691062780315:certificate/a44066ce-66a7-41c8-a9ce-e76940b7d226",
    "githubConnectionArn": "arn:aws:codestar-connections:eu-west-1:691062780315:connection/5a5860b1-a9a0-4e2b-8c10-34b65c5f712c",
    "gitRepository": {
      "owner": "getfitr",
      "repo": "landing-page",
      "branch": "main"
    },
    ...
  }
}
```

## Project structure

### Todo:

- [ ] Explain the structure of the project folder
