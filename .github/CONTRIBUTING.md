# Contributing

## Reporting Issues/Bugs

The [issue tracker](https://github.com/sage/carbon/issues) is the preferred area to report any bugs or issues with the codebase. Once an issue is submitted, it will be reviewed and handled accordingly.

When reporting an issue, please provide as much information and context as possible allowing a developer to replicate and understand the problem. Also ensure you record the version of Carbon you are using, as well as any console or error logs.

## Requesting Features

For any feature requests, please use the [issue tracker](https://github.com/sage/carbon/issues). When you raise the feature request, please provide as much information as possible to describe the feature required, as well as examples of how you would like the feature to work.

## Submitting Pull Requests

When submitting a pull request, please ensure your branch meets the following criteria:

* It is a passing build.
* The code is fully tested and has full coverage.
* The code follows our coding guidelines (TBC).
* The code does not introduce unnecessary dependencies (no jQuery!).

To be merged, we prefer the pull request to be reviewed by at least two people with merge rights.

## Submitting a Release

* Bump the version in `package.json`.
* Ensure the `CHANGELOG.md` is up to date.
* Run `npm run-script release` to update `/lib`.
* If releasing a minor version, create a branch from `master`.
* If releasing a patch version, create a branch from `release`.
* Commit and push changes.
* If releasing a minor version, open a PR to `master`.
* If releasing a patch version, open a PR to `release`.
* Once merged, create a tag in either the release or master branch. e.g. `git tag v0.1.5`
* Push tag to Github.
* Draft a release in GitHub from the new tag.
* If you have merged into `release`, open a PR to merge back into `master`.
