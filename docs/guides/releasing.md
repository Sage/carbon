# Releasing

* N.B. Releases are created by Sage Carbon Team. We use [semantic versioning](http://semver.org/)

* If releasing a minor version, create a branch from `master`.
* If releasing a patch version, create a branch from the tag you want to patch. This should be the latest tag apart from exceptional circumstances.
* Bump the version in `package.json`.
* Generate Release Notes using the provided script `./script/generate-release-notes.sh` - please note this relies on [renogen](https://github.com/DDAZZA/renogen).
* Commit and push changes.

* If releasing a minor version:
    * Open a PR to `master`
    * Merge PR into `master`
    * Raise PR to merge `master` into `release`
    * Merge PR into `release`
    * Cut new version from `release`

* If releasing a patch version:
    * Open a PR to `release`
    * Merge PR into `release`

* Once merged, publish a release in GitHub using the new version number as the tag. Make sure to target the correct branch (`release`). This will auto-deploy to npm. (relase should be published from `release`)
* If you have released from a branch other than `master`, open a PR to merge that branch back into `master`.
