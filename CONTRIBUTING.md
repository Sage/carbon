# Contributing

## Reporting Issues/Bugs

The [issue tracker](https://github.com/sage/carbon/issues) is the preferred area to report any bugs or issues with the codebase. Once an issue is submitted, it will be reviewed and handled accordingly.

When reporting an issue, please provide as much information and context as possible allowing a developer to replicate and understand the problem. Also ensure you record the version of Carbon you are using, as well as any console or error logs.

## Requesting Features

For any feature requests, please use the [issue tracker](https://github.com/sage/carbon/issues). When you raise the feature request, please provide as much information as possible to describe the feature required, as well as examples of how you would like the feature to work.

## Pull Request Guidelines

* Before submitting a pull request, check the [issue tracker](https://github.com/sage/carbon/issues) to see if the feature or bug has already been discussed. If it has, check with us before beginning work on it to avoid duplicated effort.

* If no issue has been raised, please raise one first before beginning work. You can then link back to this when submitting a pull request to address it.

* Create a branch from master and work in the `src` folder.

* Include a detailed description of the feature you are adding in the PR. Ensure you have included information on how to setup and QA your new feature or bug-fix.

* We prefer detailed commit messages and squashed commits. PRs with commit messages like 'WIP' and 'addressed comments', or long lists of commits will likely require amending."

## Project Structure

- **`lib`**: contains transpiled files for release. This folder is transpiled during a release. Do not submit compiled JS with your PRs.

- **`src`**: contains the source code in ES2015+.

    - **`components`**: contains the Carbon components divided by folder. Each component contains:
        - the component file
        - a `__spec__.js` file
        - a `.scss` file (if required)
        - a `package.json`
        - a definition file used for the demo site.

    - **`utilites`**: A variety of helpers, decorators and utilities for working with Flux.

    - **`style-config`**: Global styles and config for the Carbon library.

## Testing

* Carbon has a 100% coverage policy. Testing is done using [Jest](https://facebook.github.io/jest/). We use the [Enzyme](https://github.com/airbnb/enzyme) testing utility for interacting with components in tests.
* Legacy code used React Testutils - we are currently in the process of migrating to 100% Enzyme usage.
* New tests need to be written using Enzyme - it's ok for a Testutils and Enzyme to be mixed in a legacy code file.

## Submitting Pull Requests

When submitting a pull request, please ensure your branch meets the following criteria:

* It is a passing build (`gulp test --build` returns success).
* The code is fully tested and has full coverage.
* The code follows our coding guidelines (TBC).
* The code does not introduce unnecessary dependencies (no jQuery!).
* Ensure descriptive `.yml` file is added to the `./change/next` directory.

To be merged, we prefer the pull request to be reviewed by at least two people with merge rights.

## CLA

To accept any third party contributions we require a Contributor License Agreement to be signed. Please find links to the relevent documents below:

* [Individual CLA](https://github.com/Sage/carbon/blob/master/cla/SAGE-CLA.docx)
* [Corporate CLA](https://github.com/Sage/carbon/blob/master/cla/SAGE-CCLA.docx)
