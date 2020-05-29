### [22.1.1](https://github.com/Sage/carbon/compare/v22.1.0...v22.1.1) (2020-05-29)


### Bug Fixes

* **drawer:** update overflow behaviour ([5883c89](https://github.com/Sage/carbon/commit/5883c89ff50282e706e02c98b69db3a5a275b8c7))

## [22.1.0](https://github.com/Sage/carbon/compare/v22.0.3...v22.1.0) (2020-05-29)


### Features

* **toast:** multiple toasts can now stack ([f508f0f](https://github.com/Sage/carbon/commit/f508f0f9a3ed861a7514da9c5dde74662f733339)), closes [#2737](https://github.com/Sage/carbon/issues/2737)


### Bug Fixes

* **portal:** compatibility with styled components lib ([3688c34](https://github.com/Sage/carbon/commit/3688c348be18f24a0ad238b7209f41637b3fc7de))

### [22.0.3](https://github.com/Sage/carbon/compare/v22.0.2...v22.0.3) (2020-05-28)


### Bug Fixes

* **link:** add target prop ([87bc937](https://github.com/Sage/carbon/commit/87bc937e5c0163d52a75694a37f167dbab5ae131)), closes [#2921](https://github.com/Sage/carbon/issues/2921)

### [22.0.2](https://github.com/Sage/carbon/compare/v22.0.1...v22.0.2) (2020-05-28)


### Bug Fixes

* **checkbox:** update typescript definitions ([578de51](https://github.com/Sage/carbon/commit/578de51964caf864bf7f22224ff2388ca07fb48b)), closes [#2813](https://github.com/Sage/carbon/issues/2813)

### [22.0.1](https://github.com/Sage/carbon/compare/v22.0.0...v22.0.1) (2020-05-27)


### Bug Fixes

* **inline-input:** update story and knobs ([9a7daff](https://github.com/Sage/carbon/commit/9a7daffa3871a4885f73c9c0c869185989ae9d04))

## [22.0.0](https://github.com/Sage/carbon/compare/v21.1.2...v22.0.0) (2020-05-26)


### ⚠ BREAKING CHANGES

* **portrait:** removes classic theme support from portrait

### Bug Fixes

* **portrait:** portrait story not loading in storybook ([667a89a](https://github.com/Sage/carbon/commit/667a89a5d67a2138a8ee748a288af913cf2a111e))

### [21.1.2](https://github.com/Sage/carbon/compare/v21.1.1...v21.1.2) (2020-05-22)


### Bug Fixes

* **date:** allow to programatically set date as empty string ([7d9e596](https://github.com/Sage/carbon/commit/7d9e596d50971a8d36000726aa4eac31691b5cde))

### [21.1.1](https://github.com/Sage/carbon/compare/v21.1.0...v21.1.1) (2020-05-22)


### Bug Fixes

* **button:** add missing type declarations ([36aeedc](https://github.com/Sage/carbon/commit/36aeedcaff749244712b71f9ca8736b6c288e3b4))
* **content:** add typescript declarations ([de8c335](https://github.com/Sage/carbon/commit/de8c335f8c6ef96f3e69ebb37b7e605eeec73c6d))

## [21.1.0](https://github.com/Sage/carbon/compare/v21.0.1...v21.1.0) (2020-05-22)


### Features

* **flat-table-checkbox:** add new component used when rows selectable ([ca387f1](https://github.com/Sage/carbon/commit/ca387f16d5a78650f8dd870ddc9830e4c038e95e))
* **flat-table-row:** add new prop to apply highlighted styling ([28ecefa](https://github.com/Sage/carbon/commit/28ecefa203843df00d8cacaa0a5384085a31d0a9))
* **flat-table-row:** add new prop to apply styling when row is selected ([19c60ff](https://github.com/Sage/carbon/commit/19c60ffe4d942cdae1918b2948cc678bb949d7b6))

### [21.0.1](https://github.com/Sage/carbon/compare/v21.0.0...v21.0.1) (2020-05-22)


### Bug Fixes

* **inline-input:** implement aria-labelledby ([59aae72](https://github.com/Sage/carbon/commit/59aae7268c926f4f1935deb280fa9ea830af66e7))

## [21.0.0](https://github.com/Sage/carbon/compare/v20.2.0...v21.0.0) (2020-05-22)


### ⚠ BREAKING CHANGES

* **action-popover:** In order for the styling to work as before you should pass this component into the `renderButton` prop to guarantee the same look as previously
* **button:** The `styleOverride` prop has been removed

### Features

* **action-popover:** add a menu button wrapper component ([0cecc47](https://github.com/Sage/carbon/commit/0cecc4748a7967eae04002e5185f41e898ab95af))


### Code Refactoring

* **button:** remove style override prop from component ([39df8bc](https://github.com/Sage/carbon/commit/39df8bc0218bb6b9a3e2a2ed858b5475fd09fa4f))

## [20.2.0](https://github.com/Sage/carbon/compare/v20.1.3...v20.2.0) (2020-05-21)


### Features

* **accordion:** allow passing data-role prop to the root element ([5b08c5d](https://github.com/Sage/carbon/commit/5b08c5d7da72c2715936de5d3c63cb38ad1d7772))

### [20.1.3](https://github.com/Sage/carbon/compare/v20.1.2...v20.1.3) (2020-05-18)


### Bug Fixes

* **search:** fix height, width and background style bugs ([86147a6](https://github.com/Sage/carbon/commit/86147a6d44ef0c07256a6b3a347e1e8be869da21))

### [20.1.2](https://github.com/Sage/carbon/compare/v20.1.1...v20.1.2) (2020-05-14)


### Bug Fixes

* **link:** update routerLink prop to allow Router Link as prop ([8e66353](https://github.com/Sage/carbon/commit/8e663534e8a227ed29c74755c92cc7da7e4199e2)), closes [#2924](https://github.com/Sage/carbon/issues/2924)
* **menu:** add routerLink prop as no longer provided by link component ([44035b4](https://github.com/Sage/carbon/commit/44035b48075a1a0a255db118961d66da74090393))

### [20.1.1](https://github.com/Sage/carbon/compare/v20.1.0...v20.1.1) (2020-05-11)


### Bug Fixes

* **drawer:** add unit test ([65c4b44](https://github.com/Sage/carbon/commit/65c4b4492db92a86600c506819a1f636a8906fc5))
* **drawer:** improve stories ([885c933](https://github.com/Sage/carbon/commit/885c933ae70cd52c9d22deedd80fb46de137e965))
* **drawer:** make content overflow ([6c3414b](https://github.com/Sage/carbon/commit/6c3414b536d192f1b556bdb8f77a51d6e8e4c9de))
* **drawer:** story update ([b1c2bb8](https://github.com/Sage/carbon/commit/b1c2bb85c8048ef603858c6e67d4e0813ed95342))
* **drawer:** update data attribute and spec ([3b1ca57](https://github.com/Sage/carbon/commit/3b1ca57d897ca707238e04b8ee85f99f04c47134))
* **drawer:** update snapshot ([a5746e0](https://github.com/Sage/carbon/commit/a5746e05c543ae4207235e868a9c339d8cb4a076))
* **drawer:** update style ([eae6c55](https://github.com/Sage/carbon/commit/eae6c558c113db31b4de0cc14ff7280aa66492b2))

## [20.1.0](https://github.com/Sage/carbon/compare/v20.0.1...v20.1.0) (2020-05-11)


### Features

* **flat-table:** add colspan and rowspan props ([c968e01](https://github.com/Sage/carbon/commit/c968e01eace657a4571d95d5e633eda7dde1cfa0))

### [20.0.1](https://github.com/Sage/carbon/compare/v20.0.0...v20.0.1) (2020-05-07)


### Bug Fixes

* **inline-input:** fix responsive width ([f8b9df8](https://github.com/Sage/carbon/commit/f8b9df8a328a3e9b6b7859a5459a6e661f8b8b1d)), closes [#2748](https://github.com/Sage/carbon/issues/2748)

## [20.0.0](https://github.com/Sage/carbon/compare/v19.0.1...v20.0.0) (2020-05-06)


### ⚠ BREAKING CHANGES

* styled-components is now a peer dependency.

To upgrade you should install styled-components@^4.4.1 in your project.

### Miscellaneous Chores

* make styled-component a peer dependency ([50a75a3](https://github.com/Sage/carbon/commit/50a75a3f7287a94e0e16a970a613136ffa527aa2))

### [19.0.1](https://github.com/Sage/carbon/compare/v19.0.0...v19.0.1) (2020-05-06)


### Bug Fixes

* **colors:** make used colors in Carbon DLS compliant ([d04e114](https://github.com/Sage/carbon/commit/d04e114e887a8dad65fe8544d65d4dfa37c24248))
* **popover-container:** fix displaying under other components ([3db3fed](https://github.com/Sage/carbon/commit/3db3fed6214762350a42e292a1ddc6098b16c54f))

## [19.0.0](https://github.com/Sage/carbon/compare/v18.1.1...v19.0.0) (2020-05-05)


### ⚠ BREAKING CHANGES

* **pager:** Pager interface changed to controlled. Implementation now offers callback functions onNext, onPrevious, onFirst, onLast, onPagination.

### Bug Fixes

* **pager:** new pager component ([4d7311c](https://github.com/Sage/carbon/commit/4d7311c22fe10691e02cf967515b81459c85838d))
* **table:** updated default value of page size for pagination ([40579fe](https://github.com/Sage/carbon/commit/40579fed0c0c74d8d53848dc770bf9e50f6d202d))

### [18.1.1](https://github.com/Sage/carbon/compare/v18.1.0...v18.1.1) (2020-05-04)


### Bug Fixes

* **checkbox:** css styling fix for label ([062b9cc](https://github.com/Sage/carbon/commit/062b9cc83d9b904b29b22dbbcd9fe537fb8066d8))
* **switch:** css styling fix for label ([16b88e9](https://github.com/Sage/carbon/commit/16b88e9521ed807dee02d34528296e6fd4850de2))

## [18.1.0](https://github.com/Sage/carbon/compare/v18.0.0...v18.1.0) (2020-05-04)


### Features

* **button:** add dashed button ([4fb2e30](https://github.com/Sage/carbon/commit/4fb2e307e52d7db6777ddff43aaaa96497c54b85))

## [18.0.0](https://github.com/Sage/carbon/compare/v17.5.1...v18.0.0) (2020-04-30)


### ⚠ BREAKING CHANGES

* **popover-container:** `iconType` prop is no longer supported
To upgrade you should use `renderOpenComponent` prop to customise the
open button.

### Features

* **popover-container:** add render props and support controlled usage ([b53a77c](https://github.com/Sage/carbon/commit/b53a77cbd00b68dcaa686c15886ee90b4fffce71))

### [17.5.1](https://github.com/Sage/carbon/compare/v17.5.0...v17.5.1) (2020-04-30)


### Bug Fixes

* **popover-container:** revert previous release due to breaking change ([c33cef2](https://github.com/Sage/carbon/commit/c33cef2a57bb8027cabd2b8d45306143a112eaf1))

## [17.5.0](https://github.com/Sage/carbon/compare/v17.4.3...v17.5.0) (2020-04-30)


### Features

* **popover-container:** add render props and support controlled usage ([6e1671f](https://github.com/Sage/carbon/commit/6e1671ff57816aa438ef9f9d4787583693c4467a))

### [17.4.3](https://github.com/Sage/carbon/compare/v17.4.2...v17.4.3) (2020-04-30)


### Bug Fixes

* **card-footer:** update the footer non interactive text colour to black ([57488a7](https://github.com/Sage/carbon/commit/57488a7d245a1a81ba1e7fb550c029e7816b363b)), closes [#2900](https://github.com/Sage/carbon/issues/2900)

### [17.4.2](https://github.com/Sage/carbon/compare/v17.4.1...v17.4.2) (2020-04-29)


### Bug Fixes

* **anchor-navigation:** incorrect scroll animation in firefox ([96396f5](https://github.com/Sage/carbon/commit/96396f5ce48b7f0f5835c5250bc21f861a1f63c6))

### [17.4.1](https://github.com/Sage/carbon/compare/v17.4.0...v17.4.1) (2020-04-29)


### Bug Fixes

* **input:** update autofill style ([a4c6cae](https://github.com/Sage/carbon/commit/a4c6caea4330620e9086e3555c07dcbd8d365072))

## [17.4.0](https://github.com/Sage/carbon/compare/v17.3.2...v17.4.0) (2020-04-28)


### Features

* **drawer:** create drawer component ([cee6f98](https://github.com/Sage/carbon/commit/cee6f98c4bfa5a513b4709f1b502c27ca0944e01))

### [17.3.2](https://github.com/Sage/carbon/compare/v17.3.1...v17.3.2) (2020-04-28)


### Bug Fixes

* **accordion:** add content resize animation ([10d59ef](https://github.com/Sage/carbon/commit/10d59ef36236eb2334587da143ad19f1c2e41181))
* **accordion:** lack of accordion resize when content size changes ([1f7267f](https://github.com/Sage/carbon/commit/1f7267f3c036331d32dafef35adf7decc5a4def6))

### [17.3.1](https://github.com/Sage/carbon/compare/v17.3.0...v17.3.1) (2020-04-28)


### Bug Fixes

* **date:** allow to open date picker by clicking on calendar icon ([1fc5251](https://github.com/Sage/carbon/commit/1fc52515fa932106a3d9614658350460f0528d3e))

## [17.3.0](https://github.com/Sage/carbon/compare/v17.2.3...v17.3.0) (2020-04-27)


### Features

* **flat-table:** add new component sort and table themes ([4e14426](https://github.com/Sage/carbon/commit/4e14426e2c42f6904c54b2c0038c6cad7115d1cd))

### [17.2.3](https://github.com/Sage/carbon/compare/v17.2.2...v17.2.3) (2020-04-22)


### Bug Fixes

* update version for cucumber preprocessor ([f8b0b21](https://github.com/Sage/carbon/commit/f8b0b217ab8aa15d2e1ed9068c7eeb25be1ac19e))

### [17.2.2](https://github.com/Sage/carbon/compare/v17.2.1...v17.2.2) (2020-04-21)


### Bug Fixes

* **row:** allow number prop type for columns, columnSpan, columnOffset ([f9657f7](https://github.com/Sage/carbon/commit/f9657f7384308ae31c235ba08f60bf8c5dee09ab))

### [17.2.1](https://github.com/Sage/carbon/compare/v17.2.0...v17.2.1) (2020-04-21)


### Bug Fixes

* **flat-table:** update hover color for flat table row and cell ([ba68e91](https://github.com/Sage/carbon/commit/ba68e91d9d2c5b4aea3f36188e492f4c04b9b6a0))

## [17.2.0](https://github.com/Sage/carbon/compare/v17.1.2...v17.2.0) (2020-04-21)


### Features

* **form:** create new form component ([eaa6f16](https://github.com/Sage/carbon/commit/eaa6f16238c68d800c05626c56423e69cf2f60bf))

### [17.1.2](https://github.com/Sage/carbon/compare/v17.1.1...v17.1.2) (2020-04-20)


### Bug Fixes

* **tabs:** padding and outline styling to match dls ([a5f03c4](https://github.com/Sage/carbon/commit/a5f03c401b071b8dd270d1dcea3533694ecf0049))

### [17.1.1](https://github.com/Sage/carbon/compare/v17.1.0...v17.1.1) (2020-04-20)


### Bug Fixes

* **action-popover:** remove display style attr and add width to menu btn ([cca36fe](https://github.com/Sage/carbon/commit/cca36feb0009540f361de8502f3b9f5fb32dc5f4))

## [17.1.0](https://github.com/Sage/carbon/compare/v17.0.0...v17.1.0) (2020-04-17)


### Features

* **numeral date:** create numeral date component ([12f12d3](https://github.com/Sage/carbon/commit/12f12d3a0ee81d6744e28d91a6d99c9c7a061d6e))

## [17.0.0](https://github.com/Sage/carbon/compare/v16.8.2...v17.0.0) (2020-04-17)


### ⚠ BREAKING CHANGES

* **deps-dev:** react-router is no longer a dependency and the `router.js` util,
including the startRouter function has been removed from the code base as it
relied on react-router v3. Consuming projects are now required to install their
own routing solution, in order for the `Button` and `Link` components to work as
previously when passing in a `to` prop, a routing link component must also be
passed in via renderProps

### Miscellaneous Chores

* **deps-dev:** move react router to dev dep and delete router util ([a7fc8a9](https://github.com/Sage/carbon/commit/a7fc8a9b864ea86309555d09a50b3725543cecb5))

### [16.8.2](https://github.com/Sage/carbon/compare/v16.8.1...v16.8.2) (2020-04-10)


### Bug Fixes

* **action-popover:** add top position when menu right aligned in safari ([f9f8774](https://github.com/Sage/carbon/commit/f9f8774276c101647b29c991ed389eafd68e88d9))

### [16.8.1](https://github.com/Sage/carbon/compare/v16.8.0...v16.8.1) (2020-04-07)


### Bug Fixes

* **select:** allow passing custom validation icon type prop to component ([a333235](https://github.com/Sage/carbon/commit/a3332359a5bc3e75ab427de52bfc41ec9f267c63))

## [16.8.0](https://github.com/Sage/carbon/compare/v16.7.0...v16.8.0) (2020-04-06)


### Features

* **action-popover:** add support for custom menu button override ([df3477b](https://github.com/Sage/carbon/commit/df3477b523e5c81e442b916e1bb768984a8dcd83))


### Bug Fixes

* **popover-menu:** add guard against null item refs ([1b316e8](https://github.com/Sage/carbon/commit/1b316e806ea9acd2480ec85d2b5bdfb04333f233))

## [16.7.0](https://github.com/Sage/carbon/compare/v16.6.0...v16.7.0) (2020-04-02)


### Features

* **radio-button-group:** add style override ([919d372](https://github.com/Sage/carbon/commit/919d372f6933c8d1b1a7de6dcce93f1b2993cf17))

## [16.6.0](https://github.com/Sage/carbon/compare/v16.5.2...v16.6.0) (2020-04-02)


### Features

* **select:** value added to customFilter option ([0048bc2](https://github.com/Sage/carbon/commit/0048bc2e04c024b2833e8fa41649d27900e4bd33)), closes [#2697](https://github.com/Sage/carbon/issues/2697)

### [16.5.2](https://github.com/Sage/carbon/compare/v16.5.1...v16.5.2) (2020-04-01)


### Bug Fixes

* **search:** close icon persists when the field is empty ([de5d217](https://github.com/Sage/carbon/commit/de5d217d70ef6b23dd0ccc8f1db78b16d7cecbe8))

### [16.5.1](https://github.com/Sage/carbon/compare/v16.5.0...v16.5.1) (2020-04-01)


### Bug Fixes

* **date:** allow passing custom validation icon type prop to component ([16f4c50](https://github.com/Sage/carbon/commit/16f4c50b5d37c34b52e1f4b8999db720f4c58792))

## [16.5.0](https://github.com/Sage/carbon/compare/v16.4.1...v16.5.0) (2020-03-31)


### Features

* **advanced-colour-picker:** create advanced color picker component ([af13999](https://github.com/Sage/carbon/commit/af13999aeaee358c7dcec5805f18a53241872189))


### Bug Fixes

* **modal:** return event for onclose callback ([714be37](https://github.com/Sage/carbon/commit/714be3798a187bd882649a413d7166842e7b8e98))
* **simple-color-picker:** use SVG for transparent color preview ([8941e03](https://github.com/Sage/carbon/commit/8941e03731fdab316abee8ce8603195499f4b78f))

### [16.4.1](https://github.com/Sage/carbon/compare/v16.4.0...v16.4.1) (2020-03-31)


### Bug Fixes

* **input:** add null check to input focus handler ([13095a9](https://github.com/Sage/carbon/commit/13095a90f4347ddf29e8b0f55aed18cf906070bf))

## [16.4.0](https://github.com/Sage/carbon/compare/v16.3.0...v16.4.0) (2020-03-31)


### Features

* **action-popover:** support for aligning menu to right of button ([ed42599](https://github.com/Sage/carbon/commit/ed42599a40ce971d253a990e0b63762c807137c5))

## [16.3.0](https://github.com/Sage/carbon/compare/v16.2.1...v16.3.0) (2020-03-30)


### Features

* **button:** add support for style override object ([894ac96](https://github.com/Sage/carbon/commit/894ac96af3148127f9b458a92ad163c82a34f057))

### [16.2.1](https://github.com/Sage/carbon/compare/v16.2.0...v16.2.1) (2020-03-27)


### Bug Fixes

* **icon-button:** hover background over focus outline ([4968edf](https://github.com/Sage/carbon/commit/4968edfef33a3b6b67675f5641d2bc115b4f89b0))

## [16.2.0](https://github.com/Sage/carbon/compare/v16.1.0...v16.2.0) (2020-03-27)


### Features

* **fieldset:** add address fieldset ([192deef](https://github.com/Sage/carbon/commit/192deef13f7b67d1e52a901afd2d9b8c1039efab))

## [16.1.0](https://github.com/Sage/carbon/compare/v16.0.0...v16.1.0) (2020-03-27)


### Features

* **button:** add destructive secondary buttons ([5e2346b](https://github.com/Sage/carbon/commit/5e2346b4b5c20aacc2e4d6aeb4a58390d1a38233))
* **button:** add destructive tertiary buttons ([3544a56](https://github.com/Sage/carbon/commit/3544a56d135b84fea94be5973ed0dbc10cfc2e09))

## [16.0.0](https://github.com/Sage/carbon/compare/v15.0.0...v16.0.0) (2020-03-26)


### ⚠ BREAKING CHANGES

* **button:** `<Button buttonType="destructive"/>` has been
removed in favour of `<Button buttonType="primary" destructive />`.

There is a codemod available to assist with this upgrade `npx
carbon-codemod button-destructive <target>`.

See https://github.com/Sage/carbon-codemod for more information.

### Miscellaneous Chores

* **button:** remove destructive button type ([c1ee90b](https://github.com/Sage/carbon/commit/c1ee90b747f906ac1d9dc06538c02b39ceb3dbe4))

## [15.0.0](https://github.com/Sage/carbon/compare/v14.11.0...v15.0.0) (2020-03-26)


### ⚠ BREAKING CHANGES

* **multi-action-button:** The Classic theme is no longer supported. To upgrade
please use the Mint or Aegean theme.
* **split-button:** The Classic theme is no longer supported. To upgrade
please use the Mint or Aegean theme.
* **button:** The Classic theme is no longer supported. To upgrade
please use the Mint or Aegean theme.

Fixes FE-2629

### Miscellaneous Chores

* **button:** drop classic support ([68ddad5](https://github.com/Sage/carbon/commit/68ddad51e887d20dd7f4c9e43728666730ed28e4))
* **multi-action-button:** drop classic support ([383a8bc](https://github.com/Sage/carbon/commit/383a8bc54beed64ffe7fc97ed60e304e18d44b14))
* **split-button:** drop classic support ([808d4bb](https://github.com/Sage/carbon/commit/808d4bbcc0216f39e360d73e3a73cc92e42ae72c))

## [14.11.0](https://github.com/Sage/carbon/compare/v14.10.0...v14.11.0) (2020-03-25)


### Features

* **select:** add transparent variant ([b60facb](https://github.com/Sage/carbon/commit/b60facb0fc667701940f83c452ce36aa9fb836d4))
* **simple-color-picker:** adds transparent color ([76c37c1](https://github.com/Sage/carbon/commit/76c37c107a22de56357333cebb3b9dd2a109b657))
* **textbox:** add style override functionality ([6f6fbee](https://github.com/Sage/carbon/commit/6f6fbeed36801255e8339904a17e4487b318ec84))

## [14.10.0](https://github.com/Sage/carbon/compare/v14.9.0...v14.10.0) (2020-03-25)


### Features

* **textbox:** add style override functionality ([b57b459](https://github.com/Sage/carbon/commit/b57b459c4f5e511dd9dc0eb40586755608568b47))

## [14.9.0](https://github.com/Sage/carbon/compare/v14.8.1...v14.9.0) (2020-03-25)


### Features

* **select:** add transparent variant ([2ffe8b9](https://github.com/Sage/carbon/commit/2ffe8b9271a27eed1bc95cf12aa5e554b1b6dd54))

### [14.8.1](https://github.com/Sage/carbon/compare/v14.8.0...v14.8.1) (2020-03-24)


### Bug Fixes

* **select:** resolved error when only one option child is set ([6cb9a06](https://github.com/Sage/carbon/commit/6cb9a06b9f83d1c245dd3218b83504be1159e65e)), closes [#2567](https://github.com/Sage/carbon/issues/2567)

## [14.8.0](https://github.com/Sage/carbon/compare/v14.7.0...v14.8.0) (2020-03-24)


### Features

* **badge:** add new component ([e1a9697](https://github.com/Sage/carbon/commit/e1a9697a0247bd8caa5c5012bf4db46229a75f66))
* **badge:** add new component ([3b0effe](https://github.com/Sage/carbon/commit/3b0effe30d32f2a069857396e993b33eadfc3fef))
* **badge:** add new component ([3caf804](https://github.com/Sage/carbon/commit/3caf8042c942e62e7afa2021f8ffe56d01300940))
* **badge:** add new component ([a9bd1cc](https://github.com/Sage/carbon/commit/a9bd1cc0a99a29bf05efa653ad13b6eec4cac6d9))
* **badge:** add new component ([4a35eaf](https://github.com/Sage/carbon/commit/4a35eafdaf222e61290e9995490938a7929e275c))
* **badge:** add new component ([e3f3fbf](https://github.com/Sage/carbon/commit/e3f3fbf6fd8088ae0a2655676200d239a58f9373))
* **badge:** add new component ([7c0275d](https://github.com/Sage/carbon/commit/7c0275def723964f08ce46246651361ccc17972f))
* **badge:** add new component ([9b23f32](https://github.com/Sage/carbon/commit/9b23f32c06c566d0a4190827dd84d0a9f8cbf8a3))
* **badge:** add new component ([c2961ed](https://github.com/Sage/carbon/commit/c2961ed440d6a2f9bf2b832a942497f70df9a2b9))

## [14.7.0](https://github.com/Sage/carbon/compare/v14.6.0...v14.7.0) (2020-03-24)


### Features

* **duelling-picklist:** create duelling-picklist component ([e122180](https://github.com/Sage/carbon/commit/e12218007d3f933fba760a18476ffab37a31f927))

## [14.6.0](https://github.com/Sage/carbon/compare/v14.5.1...v14.6.0) (2020-03-24)


### Features

* **action-popover:** add submenu support ([07ea29a](https://github.com/Sage/carbon/commit/07ea29ab24eecd3e7c6bd0792b49db0e2d7b1acf))

### [14.5.1](https://github.com/Sage/carbon/compare/v14.5.0...v14.5.1) (2020-03-23)


### Bug Fixes

* **pill:** close button styling ([e054884](https://github.com/Sage/carbon/commit/e054884dd0af65d65041901fce03fd8dcbfbe679))

## [14.5.0](https://github.com/Sage/carbon/compare/v14.4.0...v14.5.0) (2020-03-20)


### Features

* **icon:** add icons ([513966b](https://github.com/Sage/carbon/commit/513966bf9536dd52693d58f43317e7b20c39c110))

## [14.4.0](https://github.com/Sage/carbon/compare/v14.3.0...v14.4.0) (2020-03-20)


### Features

* add new BatchSelection component ([6a61955](https://github.com/Sage/carbon/commit/6a61955d7c5a669438814079e56f0966e22d6eac))

## [14.3.0](https://github.com/Sage/carbon/compare/v14.2.2...v14.3.0) (2020-03-18)


### Features

* **grid:** add responsive grid component ([62e76c5](https://github.com/Sage/carbon/commit/62e76c5c2c35fc28761d2b963cd30b2144e3e755))

### [14.2.2](https://github.com/Sage/carbon/compare/v14.2.1...v14.2.2) (2020-03-18)


### Bug Fixes

* **icon-button:** remove firefox focus-inner border ([c6b0601](https://github.com/Sage/carbon/commit/c6b0601b0b70c7df1bd70a1f05811312b71dea66))

### [14.2.1](https://github.com/Sage/carbon/compare/v14.2.0...v14.2.1) (2020-03-17)


### Bug Fixes

* **fonts:** add support for consumer adding font ([fedf494](https://github.com/Sage/carbon/commit/fedf4944063f784d823694b774e005ee55fa2c2a))

## [14.2.0](https://github.com/Sage/carbon/compare/v14.1.2...v14.2.0) (2020-03-17)


### Features

* **switch:** add i18n support ([cbf5fda](https://github.com/Sage/carbon/commit/cbf5fdac1527e0ca6d6e6b2a16af3f8eb608cfaa)), closes [#2722](https://github.com/Sage/carbon/issues/2722)

### [14.1.2](https://github.com/Sage/carbon/compare/v14.1.1...v14.1.2) (2020-03-17)


### Bug Fixes

* **alert:** use icon-button component for close ([f24352c](https://github.com/Sage/carbon/commit/f24352cf57e8c6189d4eba552421694864cc1d8e))

### [14.1.1](https://github.com/Sage/carbon/compare/v14.1.0...v14.1.1) (2020-03-16)


### Bug Fixes

* **sidebar:** close button styling ([58c1674](https://github.com/Sage/carbon/commit/58c16748814873f5923cdd093e839fd91aeacced))
* **sidebar:** fixed close icon alignment in classic story ([61aaf5d](https://github.com/Sage/carbon/commit/61aaf5d8787f850695cdabdff702ab289b5afd48))

## [14.1.0](https://github.com/Sage/carbon/compare/v14.0.2...v14.1.0) (2020-03-13)


### Features

* **simple-color-picker:** keyboard accessbility, up and down navigation ([351db41](https://github.com/Sage/carbon/commit/351db41f22611c937f7530ffd992be95829a22d3))

### [14.0.2](https://github.com/Sage/carbon/compare/v14.0.1...v14.0.2) (2020-03-13)


### Bug Fixes

* **multi-action-button:** change button text misalignment ([6013c0c](https://github.com/Sage/carbon/commit/6013c0cbd2b336d223c0e47d61a80982b4581802))

### [14.0.1](https://github.com/Sage/carbon/compare/v14.0.0...v14.0.1) (2020-03-12)


### Bug Fixes

* **toast:** close button styling ([a55eaa1](https://github.com/Sage/carbon/commit/a55eaa192415689247b537d8281dc78aa4fa3ac9))

## [14.0.0](https://github.com/Sage/carbon/compare/v13.12.0...v14.0.0) (2020-03-11)


### ⚠ BREAKING CHANGES

* The Lato font import has been removed from carbon
consuming applications are now responsible for including them, how to do so has been documented in README.md

### Miscellaneous Chores

* remove cdn font import and add local font for storybook ([1ea3565](https://github.com/Sage/carbon/commit/1ea3565bed715ba6f9801bf92973adda0d987f56))

## [13.12.0](https://github.com/Sage/carbon/compare/v13.11.0...v13.12.0) (2020-03-11)


### Features

* **button:** add destructive prop ([cef3676](https://github.com/Sage/carbon/commit/cef3676d754722ba171eaa1dc1f79e447b61b6d2))

## [13.11.0](https://github.com/Sage/carbon/compare/v13.10.0...v13.11.0) (2020-03-11)


### Features

* **popover-container:** add new component ([871b56d](https://github.com/Sage/carbon/commit/871b56d1c82890d39ae1c489316d1304708d41b4))

## [13.10.0](https://github.com/Sage/carbon/compare/v13.9.1...v13.10.0) (2020-03-11)


### Features

* **anchor-navigation:** create anchor-navigation component ([12d0d88](https://github.com/Sage/carbon/commit/12d0d8873d5243c132a04a85fc0c9ed2f9962326))

### [13.9.1](https://github.com/Sage/carbon/compare/v13.9.0...v13.9.1) (2020-03-10)


### Bug Fixes

* **dialog-full-screen:** close button styling ([13e31ef](https://github.com/Sage/carbon/commit/13e31ef4861645a5865cc757749152498b90c260))

## [13.9.0](https://github.com/Sage/carbon/compare/v13.8.0...v13.9.0) (2020-03-09)


### Features

* **radio-button:** add support for inline radio buttons/legend ([6af3ff6](https://github.com/Sage/carbon/commit/6af3ff609a5b646492e21abd22c4ff8c22478010))

## [13.8.0](https://github.com/Sage/carbon/compare/v13.7.1...v13.8.0) (2020-03-09)


### Features

* **draggable:** add new component ([c3acd71](https://github.com/Sage/carbon/commit/c3acd71d44ad5de09e4599e4ab0f935d0270907c))
* **draggable:** add propTypes support ([ce961c4](https://github.com/Sage/carbon/commit/ce961c42cd95bbcc74cffd3c063c88afd81479ad))
* **draggable:** back item to original position ([089fe50](https://github.com/Sage/carbon/commit/089fe50db10d282524516a75f167aae6db734bf6))
* **draggable:** callback run on correct drop ([4dc0818](https://github.com/Sage/carbon/commit/4dc0818c2effdf9569134c595399eee546bbc6a7))
* **draggable:** fix lint ([69ae840](https://github.com/Sage/carbon/commit/69ae840294901c8c8d7133fb7fe6633b07c74176))
* **draggable:** make props to be optional ([1cd9f64](https://github.com/Sage/carbon/commit/1cd9f648f089fb592420ae3d08bc8d30dd0d3077))
* **draggable:** rename property ([5469027](https://github.com/Sage/carbon/commit/5469027f4b119009313c8474f404bf62f0857ec6))

### [13.7.1](https://github.com/Sage/carbon/compare/v13.7.0...v13.7.1) (2020-03-09)


### Bug Fixes

* **dialog:** close button styling ([f156763](https://github.com/Sage/carbon/commit/f156763575f462d2b7908daf2060e274c8f636d9))

## [13.7.0](https://github.com/Sage/carbon/compare/v13.6.2...v13.7.0) (2020-03-05)


### Features

* **flat-table:** add clickable row functionality ([0e11e22](https://github.com/Sage/carbon/commit/0e11e2211c81c831ce52be1c7920b1aa1234d1f8))

### [13.6.2](https://github.com/Sage/carbon/compare/v13.6.1...v13.6.2) (2020-03-03)


### Bug Fixes

* **storybook:** enable theme selector on Windows ([ecfbb17](https://github.com/Sage/carbon/commit/ecfbb17229b1a8aa4753e1f8c187a9dde3c93d1a))

### [13.6.1](https://github.com/Sage/carbon/compare/v13.6.0...v13.6.1) (2020-03-02)


### Bug Fixes

* **checkbox:** fix incorrect key assignment in checkbox story ([e5566cf](https://github.com/Sage/carbon/commit/e5566cfc509589cf46c30f56909daefbce8f2515))
* **checkbox:** restore proper checkbox behaviour in validations story ([b49f633](https://github.com/Sage/carbon/commit/b49f633b9e30bb8a947b4010538ebbb4136b86ee))

## [13.6.0](https://github.com/Sage/carbon/compare/v13.5.1...v13.6.0) (2020-02-27)


### Features

* **textbox based components:** update readonly styling ([a1c7499](https://github.com/Sage/carbon/commit/a1c74993862c0f724504e6f87f7b4085dc9077ea))

### [13.5.1](https://github.com/Sage/carbon/compare/v13.5.0...v13.5.1) (2020-02-27)


### Performance Improvements

* **storybook:** solve action event serialization performance issues ([f9de61a](https://github.com/Sage/carbon/commit/f9de61aa5cc5741b84f018a241c438e4820885cb))

## [13.5.0](https://github.com/Sage/carbon/compare/v13.4.0...v13.5.0) (2020-02-26)


### Features

* **accordion:** create accordion component ([e494ceb](https://github.com/Sage/carbon/commit/e494cebd27314031d71b8803d6b99f81d2567501))

## [13.4.0](https://github.com/Sage/carbon/compare/v13.3.2...v13.4.0) (2020-02-24)


### Features

* **icon-button:** new component to be used in place of close icon ([53b2404](https://github.com/Sage/carbon/commit/53b2404b1bde6510958751dfefe9e69fa3971197))

### [13.3.2](https://github.com/Sage/carbon/compare/v13.3.1...v13.3.2) (2020-02-24)


### Bug Fixes

* **menu-item:** fixed style regression ([187b4df](https://github.com/Sage/carbon/commit/187b4df3e780423e9741dbb241ce6e630c84d10e))

### [13.3.1](https://github.com/Sage/carbon/compare/v13.3.0...v13.3.1) (2020-02-21)


### Bug Fixes

* **pager:** add singular/plural default translations for records ([ffaf35c](https://github.com/Sage/carbon/commit/ffaf35c1ebe630582b94626fea3cb7d6111723d5))
* **pager:** remove whitespace from translation template ([4e4c746](https://github.com/Sage/carbon/commit/4e4c7464f9258a656e0f55a6d05dbe3706a842b3))
* **pager:** use page size value for translation of page size ([c608a5b](https://github.com/Sage/carbon/commit/c608a5be451e4fa617c05d43657c333bdc807708))

## [13.3.0](https://github.com/Sage/carbon/compare/v13.2.2...v13.3.0) (2020-02-20)


### Features

* **search:** create search component ([2394a97](https://github.com/Sage/carbon/commit/2394a973fccbfb28ede86d84d6e1533ed42a5dfa))

### [13.2.2](https://github.com/Sage/carbon/compare/v13.2.1...v13.2.2) (2020-02-20)


### Bug Fixes

* **card:** add data role prop for automation ([0ba28d5](https://github.com/Sage/carbon/commit/0ba28d501235a27628e597caa129ef12d9f06b8c))

### [13.2.1](https://github.com/Sage/carbon/compare/v13.2.0...v13.2.1) (2020-02-19)


### Bug Fixes

* **form:** re-apply submit focus on invalid form submission ([66c5f08](https://github.com/Sage/carbon/commit/66c5f08348400d9fa5fd3a6a04dd13c2960210ba))

## [13.2.0](https://github.com/Sage/carbon/compare/v13.1.0...v13.2.0) (2020-02-17)


### Features

* add new Flat Table component ([f335bb1](https://github.com/Sage/carbon/commit/f335bb1c50995822020ea4775da5b97ebc935bfc))

## [13.1.0](https://github.com/Sage/carbon/compare/v13.0.2...v13.1.0) (2020-02-14)


### Features

* **pager:** added translation support for "Show" ([183d7bd](https://github.com/Sage/carbon/commit/183d7bd139e760178f7a07f679af2c444079762c))

### [13.0.2](https://github.com/Sage/carbon/compare/v13.0.1...v13.0.2) (2020-02-14)


### Bug Fixes

* updated browserslist depedency of babel/preset-env ([ccd5fb7](https://github.com/Sage/carbon/commit/ccd5fb71657783f10f4b187b3281d93f56b9478c))

### [13.0.1](https://github.com/Sage/carbon/compare/v13.0.0...v13.0.1) (2020-02-12)


### Bug Fixes

* **help:** allow to set different icon on help component ([487be1b](https://github.com/Sage/carbon/commit/487be1bed194f0810442ed42328474d487c2143b))

## [13.0.0](https://github.com/Sage/carbon/compare/v12.4.1...v13.0.0) (2020-02-12)


### ⚠ BREAKING CHANGES

* **modal:** The autoFocus prop on Dialog is no longer supported. To
migrate you should manually focus an element within the Dialog using
`ref.focus()` or use `autoFocus` on an Input.

### Features

* **modal:** add focus trap to Dialog and Sidebar ([8230399](https://github.com/Sage/carbon/commit/82303998b99714991a3164a7a51f7c7203b0d975))

### [12.4.2](https://github.com/Sage/carbon/compare/v12.4.1...v12.4.2) (2020-03-27)


### Bug Fixes

* **input:** add null check to input focus handler ([13095a9](https://github.com/Sage/carbon/commit/13095a90f4347ddf29e8b0f55aed18cf906070bf))

### [12.4.1](https://github.com/Sage/carbon/compare/v12.4.0...v12.4.1) (2020-02-11)


### Bug Fixes

* **card:** update card to render div instead of button ([88dfa52](https://github.com/Sage/carbon/commit/88dfa523d7141b506d3e3a146b0f60bccfc09382))

## [12.4.0](https://github.com/Sage/carbon/compare/v12.3.0...v12.4.0) (2020-02-07)


### Features

* **form:** add data-element attribute ([d872ebd](https://github.com/Sage/carbon/commit/d872ebd4455748847011598cecb6a6fc0eb103d0))

## [12.3.0](https://github.com/Sage/carbon/compare/v12.2.1...v12.3.0) (2020-02-07)


### Features

* **icon:** add icons ([0d8a4fc](https://github.com/Sage/carbon/commit/0d8a4fc147d5cf8995f5985a76f85c2370199f9b))

### [12.2.1](https://github.com/Sage/carbon/compare/v12.2.0...v12.2.1) (2020-02-04)


### Bug Fixes

* **checkbox:** restore checkmark visibility on uncontrolled component ([b38e98e](https://github.com/Sage/carbon/commit/b38e98e867d5be9486a4c5f7b7623991b3c54829))

## [12.2.0](https://github.com/Sage/carbon/compare/v12.1.2...v12.2.0) (2020-02-03)


### Features

* **textbox:** add click handler to textbox icon ([8600dbe](https://github.com/Sage/carbon/commit/8600dbec47f3cff086a08f09606181902d23a623))

### [12.1.2](https://github.com/Sage/carbon/compare/v12.1.1...v12.1.2) (2020-01-28)


### Bug Fixes

* errors displayed when default theme prop is set ([35b26de](https://github.com/Sage/carbon/commit/35b26deab26b49ad553f3cfaa2d632e7e454d1f1))
* resolve linting issues ([63ceef5](https://github.com/Sage/carbon/commit/63ceef58c6d85d2be4d2bf58f6ca2abe88a08851))

### [12.1.1](https://github.com/Sage/carbon/compare/v12.1.0...v12.1.1) (2020-01-27)


### Bug Fixes

* **checkable-input:** associate label with input ([49d5d4b](https://github.com/Sage/carbon/commit/49d5d4b0a21dd9ebf469c82971741efeb978b48d))

## [12.1.0](https://github.com/Sage/carbon/compare/v12.0.3...v12.1.0) (2020-01-23)


### Features

* **inline-inputs:** add gutter support ([0237ded](https://github.com/Sage/carbon/commit/0237ded89d0396699d07393f797eb03fa259afac))

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
