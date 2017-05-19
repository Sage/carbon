# Carbon [ ![Codeship Status for Sage/carbon](https://codeship.com/projects/dd2c7bd0-6c4e-0133-1f77-72bb5571e5ad/status?branch=master)](https://codeship.com/projects/115478)

<img src="./../master/logo/carbon-logo.png" width="50">

Carbon is a library of reusable [React](https://facebook.github.io/react/) components and an interface for easily building user interfaces based on [Flux](https://facebook.github.io/flux/).

[Carbon Factory](https://github.com/sage/carbon-factory) is supplementary to Carbon; providing tools to easily get your environment and project up and running to start building with React. As well as providing a command line interface to build projects, it manages tasks for compiling your assets and running test suites.

Check out our [demo and documentation site](https://carbon.sage.com/) for live examples and code snippets.

## Documentation

### Getting Started

* [Setting up your environment](docs/guides/setting-up-your-environment.md)
* [An introduction to Node/npm](docs/guides/an-introduction-to-node-and-npm.md)
* [Getting started](docs/guides/getting-started.md)
* [A basic example of Flux](docs/guides/a-basic-example.md)
* [Running Tests](https://github.com/Sage/carbon-factory/blob/master/docs/running-tests.md)

### Guides

* [Assets](docs/guides/assets.md)
* [Flux](docs/guides/flux.md)
* [Immutable](docs/guides/immutable.md)
* [Validations](docs/guides/validations.md)
* [Decorators](docs/guides/decorators.md)
* [Handlers](docs/guides/handlers.md)
* [Retrieving Data](docs/guides/retrieving-data.md)
* [Integrating React & Flux with Other UI](docs/guides/integrating-with-other-ui.md)

### Tutorials

* Rails:
  * [Hello world](docs/tutorials/carbon-rails/hello-world.md)
  * [Introducing data](docs/tutorials/carbon-rails/introducing-data.md)
  * [Updating data](docs/tutorials/carbon-rails/updating-data.md)
* [Creating a component](docs/tutorials/creating-a-component.md)

## Running the Example

Carbon has an example page, which demonstrates most of the components with a Flux implementation. This can be used to quickly see a demonstration of the components and/or as an area to test while developing with the components.

To run the example, do the following steps:
  1. Clone the carbon repository (`git clone git@github.com:Sage/carbon.git`)
  2. `cd carbon`
  3. `npm install`
  4. `gulp`
  5. Navigate to [http://localhost:8095/](http://localhost:8095/) in your favourite browser

## Testing Changes Locally in your App

See the guide on [installing unreleased changes](https://github.com/Sage/carbon/blob/master/docs/guides/installing-unreleased-changes.md)

## Submitting a Release
* N.B. Releases are created by Sage Carbon Team.

* Bump the version in `package.json`.
* Ensure the `CHANGELOG.md` is up to date.
* Run `npm install` to make sure the packages are all up to date.
* Run `npm run-script release` to update `/lib`.
* If releasing a minor version, create a branch from `master`.
* If releasing a patch version, create a branch from `release`.
* Commit and push changes.
* If releasing a minor version, open a PR to `master`.
* If releasing a patch version, open a PR to `release`.
* Once merged, draft a release in GitHub using the new version number as the tag. Make sure to target the correct branch (`master` or `release`).
* If you have merged into `release`, open a PR to merge back into `master`.

## Technologies

The following is a list of technologies Carbon utilises:

* [React](http://facebook.github.io/react/) ([JSX](https://facebook.github.io/jsx/)) - Components are written using React, as well as the useful JSX syntax.
* [Flux](https://facebook.github.io/flux/) - If your application requires a heavy use of data and interaction, Carbon provides utilities for easily integrating Flux based data stores.
* [Immutable.js](https://facebook.github.io/immutable-js/) - For better performance and data handling, the components rely on using immutable data.
* [Node](https://nodejs.org/) ([CommonJS](https://nodejs.org/docs/latest/api/modules.html)) - The components (or modules) are written using the CommonJS pattern. This allows for modularity and creating isolated/independent components.
* [Browserify](http://browserify.org/) - In order to consume the modular components in the browser, the code is compiled through Browserify. This also allows managing other dependencies such as stylesheets and images.
* [Gulp](http://gulpjs.com/) - To easily run tasks in development, the Gulp task runner is recommended.
* [Babel](https://babeljs.io/) ([ES6](https://github.com/lukehoban/es6features)) - To benefit from ES6 (and ES7) features, the code is compiled through Babel (this also compiles the JSX).

## Licence

Carbon is licensed under the [Apache-2.0 licence](https://github.com/Sage/carbon/blob/master/LICENSE).

Copyright (c) 2017 Sage Group Plc. All rights reserved.
