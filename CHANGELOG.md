### [12.0.3](https://github.com/Sage/carbon/compare/v12.0.2...v12.0.3) (2020-01-22)


### Bug Fixes

* **date:** support for runtime value update ([8b92bff](https://github.com/Sage/carbon/commit/8b92bff610f3ce8fb30999a1b299db18bc1edcf8)), closes [#2604](https://github.com/Sage/carbon/issues/2604)

### [12.0.2](https://github.com/Sage/carbon/compare/v12.0.1...v12.0.2) (2020-01-15)


### Bug Fixes

* **card:** export footer ([10993d6](https://github.com/Sage/carbon/commit/10993d6d21fe79200456f822d4f4037c4130a355)), closes [#2596](https://github.com/Sage/carbon/issues/2596)

### [12.0.1](https://github.com/Sage/carbon/compare/v12.0.0...v12.0.1) (2020-01-14)


### Bug Fixes

* **pager:** add I18n translation to First option ([236c0e0](https://github.com/Sage/carbon/commit/236c0e0acc7a8cb2ca702f17b6182f26904a009e)), closes [#2584](https://github.com/Sage/carbon/issues/2584)

## [12.0.0](https://github.com/Sage/carbon/compare/v11.0.1...v12.0.0) (2020-01-13)


### ⚠ BREAKING CHANGES

* This removes renogen in favour of semantic-release
* This is a major version bump and includes upgrades to
webpack dependencies
* some tests will now fail when targeting `<a />`
elements so this is breaking
* carbon-factory updated to v10 to support linting of
hooks and replace 'stage 0' flag in precompile script
* an invariant was added to require the initial value or
defaultValue passed to the Date component to be iso format (YYYY-MM-DD)

### Features

* Add toggle open close to date ([0f6f409](https://github.com/Sage/carbon/commit/0f6f4098957c67a8ce81bbf5c0359a507bcf3c01))
* adds support for src prop in Profile ([98b15ce](https://github.com/Sage/carbon/commit/98b15ce55bf748bc40c2a2efc8f8f3cfacdabdd5))


### Bug Fixes

* adds invariant for init value to be iso format ([605f560](https://github.com/Sage/carbon/commit/605f560081572107e1d400bb1dd5d1cca90968aa))
* correct typos ([75f494a](https://github.com/Sage/carbon/commit/75f494ab1aef9f770123067ef860618f231a37e1))
* FE-2475 header alignment change when zoomed ([9ce577f](https://github.com/Sage/carbon/commit/9ce577f4bfe53617890405590c3dca3b6648d1e7))
* fixes [#2500](https://github.com/Sage/carbon/issues/2500) renders a button as link when onClick passed ([517f847](https://github.com/Sage/carbon/commit/517f8470b07a329ad23243b01e32f386ee829c23))
* implements styling in Heading/ Pages for when link is button ([1e18459](https://github.com/Sage/carbon/commit/1e18459e081c21cfb96fe6b400e99bc88efed062))
* incorrect cursor on focused link component ([5865795](https://github.com/Sage/carbon/commit/58657955f55749623cfe05f20d73ad727353c197))
* incorrect onBlur behaviour on checkable input ([6f37b2f](https://github.com/Sage/carbon/commit/6f37b2f99dfd2e40b70fd42fc879b656cf637fd1))
* no theme not passed correctly to themesMap ([dbe8d44](https://github.com/Sage/carbon/commit/dbe8d440e1faf85ca129a24e10256ed0fc1a7146))
* remove console log ([850f525](https://github.com/Sage/carbon/commit/850f5254979db087a2cffc4df854bd870175db8f))
* reposition dialog close icon to align with header ([0210bef](https://github.com/Sage/carbon/commit/0210bef63acac93a35d8acd9a36b6041dd4cc0b3))
* typos ([705adbd](https://github.com/Sage/carbon/commit/705adbd158e6283930d358ac6e949978fb81acb4))
* update carbon-factory ([4edc009](https://github.com/Sage/carbon/commit/4edc009809eb832154deb1d140537544d037d649))
* **date-component:** allow null value when renderd with allowEmptyValue ([a185f86](https://github.com/Sage/carbon/commit/a185f862538fc8b0812822cb7abfed59f3884e20))


### Miscellaneous Chores

* updates carbon-factory dependency ([c0d6ee5](https://github.com/Sage/carbon/commit/c0d6ee5f9fae2379e925e286f22bfc14c1abadca))
* upgrade carbon-factory to v11.0.0 ([7b8f10f](https://github.com/Sage/carbon/commit/7b8f10f8b67b1a8d07cbd112b80a238370af1e05))


### Continuous Integration

* remove renogen ([41a346c](https://github.com/Sage/carbon/commit/41a346caec676fe62a887d798e34a32b350b6f49))
