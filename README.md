# Carbon [![npm](https://img.shields.io/npm/v/carbon-react.svg)](https://www.npmjs.com/package/carbon-react) [![Playwright](https://github.com/Sage/carbon/actions/workflows/playwright.yml/badge.svg)](https://github.com/Sage/carbon/actions/workflows/playwright.yml)

Carbon is a [React](https://react.dev/) component library developed by Sage.

## Getting started

Our [getting started guide](https://carbon.sage.com/?path=/docs/getting-started-installation--docs) provides instructions on how to install and use the Carbon library.

## Examples

See our [docs](https://carbon.sage.com/) for live examples.

## Agent skills

After installing `carbon-react`, add the Carbon agent skills to your project:

```shell
npx skills add Sage/carbon
```

These skills give agents full context about the Carbon library, including component props, usage examples, deprecation notices, migration guides, and documentation references.

## Browser Support

We support and test the Carbon Library against the latest versions of the following browsers:

- [Chrome](https://www.google.com/chrome/)
- [Firefox](https://www.mozilla.org/firefox/)
- [Safari](https://www.apple.com/safari/)
- [Edge](https://www.microsoft.com/windows/microsoft-edge)

We provide polyfills for the latest two versions of each of these browsers to give a grace period to update.

## Versioning

We follow [Semantic Versioning](https://semver.org/) and we use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

While we make every effort to avoid breaking changes, sometimes they are necessary. We choose to take an overly cautious
approach to breaking changes. That is we will mark something as a breaking change, even if it is extremely unlikely to affect any consumers.

We choose to make frequent but small breaking changes to give you the choice of making small incremental updates or by jumping multiple versions
in one upgrade. Ultimately the amount of breaking changes is the same, but version number increases more frequently.

We will batch breaking changes into a single version if there is a technical reason why we can't make a small breaking change, or if the impact is extraordinarily low.

We publish release notes that include the necessary upgrade steps. We also publish a codemod when possible, this will update your code to work with the new version.

For more information please see the [GitHub releases](https://github.com/Sage/carbon).

## Contributing

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to suggest bugfixes and raise issues.

## Thanks

<a href="https://www.chromatic.com/"><img src="https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png" width="153" height="30" alt="Chromatic" /></a>

Thanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.

## Licence

Carbon is licensed under the [Apache-2.0 licence](LICENSE).

Copyright (c) 2018-2026 Sage Group Plc. All rights reserved.
