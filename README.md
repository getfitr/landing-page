# GetFitr! Landing Page

This is the project for developing and deploying the landing page for the GetFitr! project.

## Getting Started

### Clone the repository:

```bash
git clone https://github.com/getfitr/landing-page.git
cd landing-page
```

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

The stack needs an existing GitHub connection. The documentation explains [how to create the connection in the CodePipeline settings](https://docs.aws.amazon.com/codepipeline/latest/userguide/connections-github.html).

The stack is expecting an AWS Resource Name (ARN) for the GitHub Connection you have created. It is expecting a `aws-config.js` which has a `connectionArn` parameter. Provide your GitHub Connection ARN in this file.

The `aws-config.js` should also provide the information to the repository (i.e., the owner, the repo name, and the branch).

Here is an example for the `aws-config.js` file:

```js
export const connectionArn = "arn:aws:codestar-connections:[REGION]:[ACCOUNT_ID]:connection/[RESOURCE_ID]";
```

## Project structure

