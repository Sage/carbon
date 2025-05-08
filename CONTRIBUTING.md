# Contributing to Carbon

We love contributions, so thanks for choosing to get involved with the Carbon project.

## Contents

- [Setting up dev environment](#setting-up-dev-environment)
- [Codebase Overview](#codebase-overview)
- [Testing](#testing)
- [Semantic Versioning](#semantic-versioning)
- [Git commit messages](#git-commit-messages)
- [Contributor License Agreement (CLA)](#contributor-license-agreement-cla)
- [Have a question?](#have-a-question)

## Setting up dev environment

To help you get setup for working on Carbon, we have a [dev environment setup guide](contributing/dev-environment-setup.md) with more information.

## Codebase Overview

More details can be found in our [Codebase Overview](contributing/codebase-overview.md) guide.

## Testing

More details about how we test can be found in our [Testing Guide](contributing/testing-guide.md).

## Bugs

### Where to find known issues

We use [GitHub Issues](https://github.com/Sage/carbon/issues) to keep track of incoming bugs and enhancement requests. Before you raise a new issue, please have a look to see if your problem does not already exist.

### Reporting an issue

Please provide as much as possible to help us replicate and understand the problem. The best way to do this is to provide a sandbox that reproduces the issue. We have a starter template to help you do this:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/Parsium/carbon-starter)

### Proposing a large change

Most bug fixes and enhancements are trivial and can be implemented and raised as a pull request as normal. For larger, complex changes however, we ask if an [Request for Comments (RFC)](rfcs/README.md) is raised first.

## Raising a Pull Request

We accept two standard workflows for raised pull requests:

- **Feature branch** workflow - for internal Sage contributors with access rights to the repository. Features should be developed in a branch off `master` and a pull request raised to merge into back into `master`.
- **Forking** workflow - for third-party contributors outside Sage. You should fork the repository and make your changes there, then raise a pull request to merge back into the Carbon `master` branch.

## Updating a Pull Request

When updating your pull request after receiving comments as part of a pier review we recommended avoiding `amend`ing existing commits. When a reviewer compares the changes, if you have also rebased with `master`, the diff will include all the changes that have been added to `master` since you last updated your branch with it. This can make reviewing the new changes more difficult so it is better to add a new commit with just the small subset of changes requested as part of the review, these additional commits can then be squashed into the main commit once the pull request has been approved.

## Semantic Versioning

Carbon uses [semantic versioning](https://semver.org/) - we release major versions for breaking changes, minor versions for new features or non-essential changes, and patch versions for critical bugfixes.

We automate our release process by standardising our git commit messages using the [`conventional-commits`](https://www.conventionalcommits.org/) format, and the [`semantic-release`](https://www.npmjs.com/package/semantic-release) package - which uses commit messages to determine the next version number, generate release notes, and publish a new version.

## Git commit messages

Following the [`conventional-commits`](https://www.conventionalcommits.org/) format, all commit messages should be structured as below.

```none
<type>([optional scope]): <description>
<BLANK LINE>
[optional body]
<BLANK LINE>
[optional footer]
```

Carbon accepts the following commit types, shown with the corresponding release that is generated using `semantic-release`:

| Type        | Description                                                                                                 | Release Type |
| ----------- | ----------------------------------------------------------------------------------------------------------- | ------------ |
| `feat:`     | Introduce a new feature                                                                                     | minor        |
| `fix:`      | A bug fix                                                                                                   | patch        |
| `docs:`     | Documentation only changes                                                                                  | :x:          |
| `style:`    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      | :x:          |
| `refactor:` | A code change that neither fixes a bug nor adds a feature                                                   | :x:          |
| `perf:`     | A code change that improves performance                                                                     | patch        |
| `test:`     | Adding missing tests or correcting existing tests                                                           | :x:          |
| `build:`    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         | :x:          |
| `ci:`       | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) | :x:          |
| `chore:`    | Other changes that don't modify src or test files                                                           | :x:          |
| `revert:`   | Reverts a previous commit                                                                                   | patch        |

### Denoting a breaking change

Any of the types in the previous table can trigger a **major** release by including `BREAKING CHANGE:` in the commit footer, or appending a `!` after the type/scope.

### Messages are validated on commit

Messages are automatically validated against the `conventional-commit` guidelines when a commit is made. We use [`commitlint`](https://github.com/conventional-changelog/commitlint) and [`husky`](https://github.com/typicode/husky) to do this.

- [`husky`](https://github.com/typicode/husky) manages the git commit hooks defined in `package.json`
- we have a hook that runs the commit message via [`commitlint`](https://github.com/conventional-changelog/commitlint)
- we use the [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) config
- [`husky`](https://github.com/typicode/husky) aborts the commit if the commit message is in the wrong format

## Contributor License Agreement (CLA)

For contributors external to Sage, we require a CLA to be signed before we can accept your pull request. Please find links to the relevent documents below:

- [Individual CLA](cla/SAGE-CLA.docx)
- [Corporate CLA](cla/SAGE-CCLA.docx)

## Have a question?

- Internal **Sage** contributors are invited to post in our #carbon Slack channel.
- External contributors are invited to use our [GitHub Issues](https://github.com/sage/carbon/issues) page.
