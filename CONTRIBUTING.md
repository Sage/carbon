# Contributing to Carbon
We love contributions, so thanks for choosing to get involved with the Carbon project. The following guidelines are provided to help you understand our contribution guidelines. 

## I just have a quick question
If you don't want to read this whole thing here's the shortcuts that you're looking for.
 - Internal **Sage** contributors are invited to post in our #carbon Slack channel, in the first instance. 
 - Public contributors are invited to use our [issue tracker](https://github.com/sage/carbon/issues).

## Reporting Issues/Bugs
If you have identified a reproduceable problem in Carbon, or if you have a new feature to request we want to hear about it. Following these guidelines helps us to understand your report, reproduce the issue and find related reports.

### Look for an existing issue
Before you create a new issue please search our [open issues](https://github.com/Sage/carbon/issues) to see if someone has already raised it. If you find your issue already exists, make relevant comments and add your [reaction](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments). Use a reaction in place of a "+1" comment:

* 👍 - upvote
* 👎 - downvote

If you can't find an existing issue that describes your bug or feature, create a new issue using the guidelines below.

The [issue tracker](https://github.com/sage/carbon/issues) is the preferred way to report any bugs or issues with the codebase. Once an issue is submitted, it will be reviewed and handled accordingly.

When reporting an issue, please provide as much information and context as possible allowing a developer to replicate and understand the problem. Also ensure you record the version of Carbon you are using, as well as any console or error logs.

## Requesting Features

For any feature requests, please use the [issue tracker](https://github.com/sage/carbon/issues). When you raise the feature request, please provide as much information as possible to describe the feature required, as well as examples of how you would like the feature to work.

## Defining Features

For features that you have a proposed solution for, please write an [RFC](./rfcs/README.md).

## Automated issue management

We use a bot to help us manage issues. The bot automatically labels issues where there has been no activity for 365 days as `stale`. We then consider the issue for closure. 

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

## Pull Request Guidelines

* Before submitting a pull request, check the [issue tracker](https://github.com/sage/carbon/issues) to see if the feature or bug has already been discussed. If it has, check with us before beginning work on it to avoid duplicated effort.

* If no issue has been raised, please raise one first before beginning work. You can then link back to this when submitting a pull request to address it.

* Create a branch from master and work in the `src` folder.

* Include a detailed description of the feature you are adding in the PR. Ensure you have included information on how to setup and QA your new feature or bug-fix.

* We prefer detailed commit messages and squashed commits. PRs with commit messages like 'WIP' and 'addressed comments', or long lists of commits will likely require amending."

When submitting a pull request, please ensure your branch meets the following criteria:

* It is a passing build (`gulp test --build` returns success).
* The code is fully tested and has full coverage.
* The code follows our coding guidelines (TBC).
* The code does not introduce unnecessary dependencies (no jQuery!).

To be merged, we prefer the pull request to be reviewed by at least two people with merge rights.

## Styleguides
### Git commit messages
We use the [`conventional-commits`](https://www.conventionalcommits.org/en/v1.0.0/) commit message format. This specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with [SemVer](https://semver.org/), by describing the features, fixes, and breaking changes made in commit messages.

Your commit message should be structured as follows:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
The commit contains the following structural elements, to communicate intent to the consumers of your library:

1. **fix:** a commit of the *type* `fix` patches a bug in your codebase (this correlates with [`PATCH`](https://semver.org/) in semantic versioning).
1. **feat:** a commit of the *type* `feat` introduces a new feature to the codebase (this correlates with [`MINOR`](https://semver.org/) in semantic versioning).
1. **BREAKING CHANGE:** a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlating with [`MAJOR`](https://semver.org/) in semantic versioning). A BREAKING CHANGE can be part of commits of any *type*.
1. *types* other than `fix:` and `feat:` are allowed, for example [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the the [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) recommends `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.
1. footers other than `BREAKING CHANGE: <description> `may be provided and follow a convention similar to [git trailer format](https://git-scm.com/docs/git-interpret-trailers).

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.  
[[Source]](https://github.com/angular/angular/blob/2089727db988c8d3336e06c10fc75049565305ad/CONTRIBUTING.md#commit)

We use [`commitlint`](https://github.com/conventional-changelog/commitlint) and [`husky`](https://github.com/typicode/husky) to check our commits against the `conventionalcommits` guidelines.
- [`husky`](https://github.com/typicode/husky) manages the git commit hooks defined in `package.json`
- we write a hook that runs the commit message via [`commitlint`](https://github.com/conventional-changelog/commitlint)
- we use the [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) config
- [`husky`](https://github.com/typicode/husky) aborts the commit if the commit message is in the wrong format

We use [`commitizen`](https://github.com/commitizen/cz-cli) to help write commit messages
- we use the [`cz-conventional-changelog`](https://github.com/commitizen/cz-conventional-changelog) config
- you can choose to write commit messages with the regular `git` CLI or in their IDE still
- you can launch [`commitizen`](https://github.com/commitizen/cz-cli) with `npm run commit`
- If a commit message is discarded by `husky` e.g. if we run the tests in the `pre-commit` hook and they fail; you can use `npm run commit -- --retry` to retry with the same commit message. 

| Type           | Description                                                                                                 | Release Type |
|----------------|-------------------------------------------------------------------------------------------------------------|--------------|
| `feat:`        | A new feature                                                                                               | minor        |
| `fix:`         | A bug fix                                                                                                   | patch        |
| `docs:`        | Documentation only changes                                                                                  | :x:          |
| `style:`       | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      | :x:          |
| `refactor:`    | A code change that neither fixes a bug nor adds a feature                                                   | :x:          |
| `perf:`        | A code change that improves performance                                                                     | patch        |
| `test:`        | Adding missing tests or correcting existing tests                                                           | :x:          |
| `build:`       | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         | :x:          |
| `ci:`          | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) | :x:          |
| `chore:`       | Other changes that don't modify src or test files                                                           | :x:          |
| `revert:`      | Reverts a previous commit                                                                                   | patch        |

Any of these types can trigger a `major` release by including `BREAKING CHANGE:` in the commit footer.


## CLA

To accept any third party contributions we require a Contributor License Agreement to be signed. Please find links to the relevent documents below:

* [Individual CLA](https://github.com/Sage/carbon/blob/master/cla/SAGE-CLA.docx)
* [Corporate CLA](https://github.com/Sage/carbon/blob/master/cla/SAGE-CCLA.docx)
