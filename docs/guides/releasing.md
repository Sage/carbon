# Releasing

* N.B. Releases are created by Sage Carbon Team. We use [semantic versioning](http://semver.org/)

* If releasing a minor version, create a branch from `master`.
* If releasing a patch version, create a branch from the tag you want to patch. This should be the latest tag apart from exceptional circumstances.
* Bump the version in `package.json`.
* Generate Release Notes using the provided script `./script/generate-release-notes.sh` - please note this relies on [renogen](https://github.com/DDAZZA/renogen).
* Commit and push changes.
* If releasing a minor version, open a PR to `master`.
* If releasing a patch version, open a PR to `release`.
* Once merged, publish a release in GitHub using the new version number as the tag. Make sure to target the correct branch (`master` or `release`). This will auto-deploy to npm.
* If you have released from a branch other than `master`, open a PR to merge that branch back into `master`.
