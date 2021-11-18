## [99.0.0](https://github.com/Sage/carbon/compare/v98.0.1...v99.0.0) (2021-11-15)


### ⚠ BREAKING CHANGES

* **detail:** Class methods will be removed
and Detail will no longer be extendable.

### Code Refactoring

* **detail:** refactor to a functional component ([788a6b9](https://github.com/Sage/carbon/commit/788a6b97df01f07228d3623f37a327f6ed476216))

### [98.0.1](https://github.com/Sage/carbon/compare/v98.0.0...v98.0.1) (2021-11-12)


### Bug Fixes

* **search:** correct tabbing order when searchButton true and no search value ([38e4bf0](https://github.com/Sage/carbon/commit/38e4bf0d8e9599d946b232c4d5ae370b33598e55)), closes [#4480](https://github.com/Sage/carbon/issues/4480)

## [98.0.0](https://github.com/Sage/carbon/compare/v97.0.0...v98.0.0) (2021-11-10)


### ⚠ BREAKING CHANGES

* **toast:** Toast is no longer a class component.
That means that it is not possible to extend it and its methods are now private

### Code Refactoring

* **toast:** refactor from class based to a functional component ([cc8ee89](https://github.com/Sage/carbon/commit/cc8ee893f3606b7b36cda75fe047238852970075))

## [97.0.0](https://github.com/Sage/carbon/compare/v96.1.0...v97.0.0) (2021-11-10)


### ⚠ BREAKING CHANGES

* **textarea:** Textarea is no longer a class component.
That means that it is not possible to extend it and its methods are now private

### Code Refactoring

* **textarea:** refactor from class based to a functional component ([2b91f34](https://github.com/Sage/carbon/commit/2b91f34637a20de056ebd82417151556b240929e))

## [96.1.0](https://github.com/Sage/carbon/compare/v96.0.0...v96.1.0) (2021-11-09)


### Features

* **multi-action-button:** add support for tertiary buttonType ([ee12f79](https://github.com/Sage/carbon/commit/ee12f79ab2efedc085f7821c0107522b3e471b5f))

## [96.0.0](https://github.com/Sage/carbon/compare/v95.1.3...v96.0.0) (2021-11-05)


### ⚠ BREAKING CHANGES

* **show-edit-pod:** ShowEditPod is no longer a class component.
That means that it is not possible to extend it and its methods are now private

### Code Refactoring

* **show-edit-pod:** refactor from class based to a functional component ([f8875d2](https://github.com/Sage/carbon/commit/f8875d29e70f4670dc38a526fec142a39726f1e2))

### [95.1.3](https://github.com/Sage/carbon/compare/v95.1.2...v95.1.3) (2021-11-05)


### Bug Fixes

* **filterable-select:** prevent re-renders from setting selectedValue to undefined ([cdf72fd](https://github.com/Sage/carbon/commit/cdf72fde8f24708163307188f945a95a7624d2b3))
* **multi-select:** prevent re-renders from setting selectedValue to undefined ([70c7ecc](https://github.com/Sage/carbon/commit/70c7eccbf78d77859065e8621ef405d905ccf68e)), closes [#4482](https://github.com/Sage/carbon/issues/4482)
* **simple-select:** prevent re-renders from setting selectedValue to undefined ([d5c0669](https://github.com/Sage/carbon/commit/d5c0669b369bf28fe836ddf0fee85dcfa05b3e4d))

### [95.1.2](https://github.com/Sage/carbon/compare/v95.1.1...v95.1.2) (2021-11-05)


### Bug Fixes

* **tabs:** enable validations when renderHiddenTabs set ([09874f5](https://github.com/Sage/carbon/commit/09874f566663ba296c0cf3300bb4ad69432e3f69)), closes [#4501](https://github.com/Sage/carbon/issues/4501)

### [95.1.1](https://github.com/Sage/carbon/compare/v95.1.0...v95.1.1) (2021-11-02)


### Bug Fixes

* **tabs:** remove extra grey border on warning and info ([bb0ffed](https://github.com/Sage/carbon/commit/bb0ffed36fddea5390b58be46776dc411847a24d)), closes [#4254](https://github.com/Sage/carbon/issues/4254)

## [95.1.0](https://github.com/Sage/carbon/compare/v95.0.2...v95.1.0) (2021-10-28)


### Features

* **button-toggle-group:** surface helpAriaLabel prop ([e92e6b8](https://github.com/Sage/carbon/commit/e92e6b8c5e71eb400eae5eb3dbc62cb1398cec9b))
* **checkbox:** surface helpAriaLabel prop ([cb3695a](https://github.com/Sage/carbon/commit/cb3695a7d9bd0f7cf6642d473c6f73aecaa15c80))
* **date:** surface helpAriaLabel prop ([f3d4923](https://github.com/Sage/carbon/commit/f3d492305a58a2133654384ac747c4d72481aeb9))
* **decimal:** surface helpAriaLabel prop ([4dcb2f6](https://github.com/Sage/carbon/commit/4dcb2f61cb1b021487eabfdea63b12f89f62599b))
* **grouped-character:** surface helpAriaLabel prop ([a4c543f](https://github.com/Sage/carbon/commit/a4c543f80051706f7bcad54fef5b9d16625f2622))
* **heading:** surface helpAriaLabel prop ([fe3cb1e](https://github.com/Sage/carbon/commit/fe3cb1e86915cdcf235f8ddd1960a2dc6f45ce7d))
* **help:** surface ariaLabel prop and set aria-hidden on Icon if no href passed ([e92dcc2](https://github.com/Sage/carbon/commit/e92dcc2ee67440b867f7f5f1ea88c48106f7ef6f)), closes [#4404](https://github.com/Sage/carbon/issues/4404)
* **numeral-date:** surface helpAriaLabel prop and integrat TooltipProvider ([5cd4acb](https://github.com/Sage/carbon/commit/5cd4acbbddd0e57cba77830918612e435fa9c070))
* **radio-button:** surface helpAriaLabel prop ([cda7876](https://github.com/Sage/carbon/commit/cda787633b169ec68d7a508f0e4f548ae323782c))
* **switch:** surface helpAriaLabel prop ([066d7a1](https://github.com/Sage/carbon/commit/066d7a1ffcebfefcfe5ae268a84b0a86b1537986))
* **textarea:** surface helpAriaLabel prop ([8fd953d](https://github.com/Sage/carbon/commit/8fd953d10120a3d3362bded3edb425043eec2753))
* **textbox:** surface helpAriaLabel prop ([61778e5](https://github.com/Sage/carbon/commit/61778e54d7a1543b9510562d466e37b6a34aef8f))


### Bug Fixes

* **icon:** add support for keyboard focus, gold outline, role and ariaLabel when has tooltip ([9801bee](https://github.com/Sage/carbon/commit/9801bee6b8f5bb7764a78939c5f616877c0e9d4d)), closes [#4428](https://github.com/Sage/carbon/issues/4428)

### [95.0.2](https://github.com/Sage/carbon/compare/v95.0.1...v95.0.2) (2021-10-27)


### Bug Fixes

* **focus-trap:** add null check to focus-trap ref ([7e4cf21](https://github.com/Sage/carbon/commit/7e4cf214000e784b84fb5fa7bd760d05c82c8b3b))

### [95.0.1](https://github.com/Sage/carbon/compare/v95.0.0...v95.0.1) (2021-10-27)


### Bug Fixes

* **tabs:** memoize `tabRef` array so it regenerate when children change ([eef4267](https://github.com/Sage/carbon/commit/eef4267a3075c4aac1601bbb40c1ed69b3beadee)), closes [#4498](https://github.com/Sage/carbon/issues/4498)
* **tabs:** set tab stop when no tab is selected to support keyboard navigation ([5b39c0c](https://github.com/Sage/carbon/commit/5b39c0c9471d49a18bcb9c3aa97ab0188d531479)), closes [#4478](https://github.com/Sage/carbon/issues/4478)

## [95.0.0](https://github.com/Sage/carbon/compare/v94.8.0...v95.0.0) (2021-10-27)


### ⚠ BREAKING CHANGES

* **icon:** bgTheme and iconColor props have been removed
from Icon. Please use bg and color props instead.

### Code Refactoring

* **icon:** remove bgTheme and iconColor props ([c2e6863](https://github.com/Sage/carbon/commit/c2e686390020ef1d62dc1c690593e73082b8f479))

## [94.8.0](https://github.com/Sage/carbon/compare/v94.7.1...v94.8.0) (2021-10-26)


### Features

* **checkable-input:** surface ariaLabelledBy prop and prevent setting labeId when no label is set ([37a4632](https://github.com/Sage/carbon/commit/37a4632272860e84ac7dc24dd3cde6d67d911980))
* **flat-table-checkbox:** surface ariaLabelledBy prop for accessibility when in a selectable table ([ab82739](https://github.com/Sage/carbon/commit/ab8273986a32c48d6f19d206fbe78a6f449b644d))

### [94.7.1](https://github.com/Sage/carbon/compare/v94.7.0...v94.7.1) (2021-10-26)


### Bug Fixes

* **design-tokens:** improve values of tokens using theme.space, add tokens containing opacity ([0a3289c](https://github.com/Sage/carbon/commit/0a3289c3aca47477acb1bab8b480e128f501f37a))

## [94.7.0](https://github.com/Sage/carbon/compare/v94.6.2...v94.7.0) (2021-10-22)


### Features

* **popover-container:** surface aria label props for buttons and container ([1c0f9db](https://github.com/Sage/carbon/commit/1c0f9db41749159be2adeda4863c433517e04b38)), closes [#4436](https://github.com/Sage/carbon/issues/4436)

### [94.6.2](https://github.com/Sage/carbon/compare/v94.6.1...v94.6.2) (2021-10-22)


### Bug Fixes

* **flat-table-row:** increase specificity of styles targeting chevron icon when row is expandable ([00e47dc](https://github.com/Sage/carbon/commit/00e47dc1f9f9090fdeb52f801258c8bd9fc7b38f)), closes [#4497](https://github.com/Sage/carbon/issues/4497)

### [94.6.1](https://github.com/Sage/carbon/compare/v94.6.0...v94.6.1) (2021-10-22)


### Bug Fixes

* **accordion:** ensure iconAlign prop works when buttonHeading prop is true ([1bcbd18](https://github.com/Sage/carbon/commit/1bcbd187845644715669aaed9337f6d9970246dd))

## [94.6.0](https://github.com/Sage/carbon/compare/v94.5.0...v94.6.0) (2021-10-21)


### Features

* **duelling-picklist:** update picklist spacings ([b3389e3](https://github.com/Sage/carbon/commit/b3389e3d6bafca88346cb02a09c90106e3497602))


### Bug Fixes

* **duelling-picklist:** correct padding on group ([f1e5958](https://github.com/Sage/carbon/commit/f1e5958b5c322e9458a058d3408c735cce8b6f52))

## [94.5.0](https://github.com/Sage/carbon/compare/v94.4.1...v94.5.0) (2021-10-21)


### Features

* **design-tokens:** added design tokens support ([269684e](https://github.com/Sage/carbon/commit/269684e7c4afd69a1030798b06bbb1f7b1b94190))


### Bug Fixes

* **desgin-tokens:** add possibility of switching off token provider in themeSelector ([9b7b24a](https://github.com/Sage/carbon/commit/9b7b24abe8f26eb1a86aeeacf7de371074857ed5))
* **design-tokens:** fix stories for global and scoped providers ([bfa17da](https://github.com/Sage/carbon/commit/bfa17da007e04adc6d1249c0ea97de2ffc3944f4))
* **design-tokens:** fix typo in parameters variable in theme selector ([41e1e0c](https://github.com/Sage/carbon/commit/41e1e0cee42042da934ca292eb243976e24afe18))

### [94.4.1](https://github.com/Sage/carbon/compare/v94.4.0...v94.4.1) (2021-10-20)


### Bug Fixes

* **button:** ensure values passed in via `px` prop are applied ([208eb65](https://github.com/Sage/carbon/commit/208eb65d5cb7936bb9047d5ee5e6cfd70509c18d))

## [94.4.0](https://github.com/Sage/carbon/compare/v94.3.0...v94.4.0) (2021-10-20)


### Features

* **switches:** adjust switches to current designs ([6c64089](https://github.com/Sage/carbon/commit/6c64089059909bda228532ed5f3486f5177af86e))

## [94.3.0](https://github.com/Sage/carbon/compare/v94.2.0...v94.3.0) (2021-10-19)


### Features

* **link:** spread any aria props onto the a or button element ([d8ce077](https://github.com/Sage/carbon/commit/d8ce07757d45046224405821cc01cc482ce48ac9)), closes [#4440](https://github.com/Sage/carbon/issues/4440)

## [94.2.0](https://github.com/Sage/carbon/compare/v94.1.3...v94.2.0) (2021-10-19)


### Features

* **flat-table:** expose minHeight prop and move footer to be direct sibling of table ([7239a0d](https://github.com/Sage/carbon/commit/7239a0de3ea808ffc0e8d21e1c5a9ff4c7e8c1a9)), closes [#4273](https://github.com/Sage/carbon/issues/4273)

### [94.1.3](https://github.com/Sage/carbon/compare/v94.1.2...v94.1.3) (2021-10-15)


### Bug Fixes

* **date:** add onClick handling ([cdb8829](https://github.com/Sage/carbon/commit/cdb8829ea37e8d8482c4a8db511e909f0d01ce8c)), closes [#4421](https://github.com/Sage/carbon/issues/4421)

### [94.1.2](https://github.com/Sage/carbon/compare/v94.1.1...v94.1.2) (2021-10-14)


### Bug Fixes

* **menu-fullscreen:** add listener to trigger focus trap on transitionend event ([c06216a](https://github.com/Sage/carbon/commit/c06216a488ee18d806469727555d8f426ca43d78)), closes [#4287](https://github.com/Sage/carbon/issues/4287)

### [94.1.1](https://github.com/Sage/carbon/compare/v94.1.0...v94.1.1) (2021-10-14)


### Bug Fixes

* **button:** add default margin 0 ([3d9854c](https://github.com/Sage/carbon/commit/3d9854cdcf6fc22e1d83ff32ef29f7423a46a87a))

## [94.1.0](https://github.com/Sage/carbon/compare/v94.0.3...v94.1.0) (2021-10-14)


### Features

* **dismissible-box:** add new component ([2b08253](https://github.com/Sage/carbon/commit/2b082539b5d7112122a2a42ee99c0c4b6d8d94b7))

### [94.0.3](https://github.com/Sage/carbon/compare/v94.0.2...v94.0.3) (2021-10-14)


### Bug Fixes

* **action-popover:** correct dom structure when rendering custom button ([3f47b85](https://github.com/Sage/carbon/commit/3f47b855e29a30f93ed82354b4d6e83d8fcfcff4)), closes [#4401](https://github.com/Sage/carbon/issues/4401)

### [94.0.2](https://github.com/Sage/carbon/compare/v94.0.1...v94.0.2) (2021-10-13)


### Bug Fixes

* **radio-button:** make field help and tooltip content readable for screen readers ([a796cd8](https://github.com/Sage/carbon/commit/a796cd82d20f5aa86a3a042fec6a4799d8292540))

### [94.0.1](https://github.com/Sage/carbon/compare/v94.0.0...v94.0.1) (2021-10-13)


### Bug Fixes

* **hidden-checkable-input:** make inputref prop optional in ts interface ([eeab991](https://github.com/Sage/carbon/commit/eeab991888fb02938662e1d5535c0debbc7454fd)), closes [#4450](https://github.com/Sage/carbon/issues/4450)

## [94.0.0](https://github.com/Sage/carbon/compare/v93.0.4...v94.0.0) (2021-10-13)


### ⚠ BREAKING CHANGES

* **drag-and-drop:** drag-and-drop has been removed from Carbon.
Please use the Draggable component instead
* **configurable-items:** ConfigurableItems has been removed from Carbon

### Code Refactoring

* **configurable-items:** deprecate configurable items and pattern ([c0c1ed5](https://github.com/Sage/carbon/commit/c0c1ed5de8d56752e5d2465d46983b74d4e126b0))
* **drag-and-drop:** deprecate drag-and-drop ([ba6a8b8](https://github.com/Sage/carbon/commit/ba6a8b846e100df6d5dc47e6d024254a0cc24543))

### [93.0.4](https://github.com/Sage/carbon/compare/v93.0.3...v93.0.4) (2021-10-12)


### Bug Fixes

* publish to npm ([feae4e3](https://github.com/Sage/carbon/commit/feae4e3e570dd6ae59a74ed9ef3bf6635877810c))

### [93.0.3](https://github.com/Sage/carbon/compare/v93.0.2...v93.0.3) (2021-10-11)


### Bug Fixes

* **dialog:** correct title prop type ([0ce39e1](https://github.com/Sage/carbon/commit/0ce39e1735d7cf9968f930cafb2f84a2a5137fa6)), closes [#4449](https://github.com/Sage/carbon/issues/4449)
* **dialog-full-screen:** correct title prop type ([50e1716](https://github.com/Sage/carbon/commit/50e17166d679523e9e5faf847c700f732c869a00))
* **heading:** correct title and subheader prop types ([d6c9f8a](https://github.com/Sage/carbon/commit/d6c9f8af25c4d67bf8b6f02c46ec79fa5cd5a608))
* **page:** correct title and children prop types ([6a511c1](https://github.com/Sage/carbon/commit/6a511c15f83c1b998d4a866d054bf4ea3e6ba006))
* **pages:** correct children prop type ([15cadcc](https://github.com/Sage/carbon/commit/15cadcc20c0b9903b2ed02c92c8625ac0d4a4871))
* **tabs:** correct children prop type ([9be9e66](https://github.com/Sage/carbon/commit/9be9e66f94bfbcab90c4cb677d00bd7757024e3b))

### [93.0.2](https://github.com/Sage/carbon/compare/v93.0.1...v93.0.2) (2021-10-07)


### Bug Fixes

* **duelling-picklist:** correct dom structure of picklist groups ([f73d26f](https://github.com/Sage/carbon/commit/f73d26fe4153a0acd8646be1e1b8bac4e57c10d5)), closes [#4340](https://github.com/Sage/carbon/issues/4340)

### [93.0.1](https://github.com/Sage/carbon/compare/v93.0.0...v93.0.1) (2021-10-07)


### Bug Fixes

* **accordion:** fix group documentation example ([31b9e27](https://github.com/Sage/carbon/commit/31b9e27fbef95bb36a1729e62a556069d95c9973))

## [93.0.0](https://github.com/Sage/carbon/compare/v92.0.0...v93.0.0) (2021-10-07)


### ⚠ BREAKING CHANGES

* **utils:** guid helper is now an internal util
and should not be used outside of Carbon
* **utils:** tags helper is now an internal util
and should not be used outside of Carbon
* **utils:** events helper is now an internal util
and should not be used outside of Carbon
* **utils:** filter-object-properties helper is now an internal util
and should not be used outside of Carbon
* **utils:** with-unique-id-props helper is now an internal util
and should not be used outside of Carbon
* **utils:** date helper is now an internal util
and should not be used outside of Carbon
* **utils:** extract-props helper is now an internal util
and should not be used outside of Carbon
* **utils:** immutable helper is now an internal util
and should not be used outside of Carbon
* **utils:** validations helper has been removed
* **utils:** serialize helper is now an internal util
and should not be used outside of Carbon
* **utils:** dnd helpers are now internal utils
and should not be used outside of Carbon
* **utils:** text helper has been removed
* **utils:** scrollable-parent helper has been changed
to be draggable-context internal util and should not be used outside of Carbon
* **utils:** to-array helper has been removed
* **utils:** poller helper has been removed
* **utils:** prop-types helper has been removed
* **utils:** chainFunctions helper has been removed
* **utils:** browser-type-check helper is now an internal util
and should not be used outside of Carbon
* **utils:** browser helper is now an internal util
and should not be used outside of Carbon
* **utils:** ether util is now an internal util
and should not be used outside of Carbon
* **utils:** base-registry util has been removed
* **utils:** logger util is now an internal util
and should not be used outside of Carbon
* **utils:** service util has been removed
* **utils:** should-component-update util has been removed

### Code Refactoring

* **utils:** change scrollable-parent helper to be internal ([b4b22df](https://github.com/Sage/carbon/commit/b4b22df6426eb7eab62b3decea8fac83b7d25ba1))
* **utils:** move browser helper to the internal folder ([68c49b4](https://github.com/Sage/carbon/commit/68c49b49c1c3e0095365cbd7b6002a5a25886d9d))
* **utils:** move browser-type-check helper to the internal folder ([30ce4fe](https://github.com/Sage/carbon/commit/30ce4fead7f79cd315ea918b2e0efd009b68dd1e))
* **utils:** move date helper to the internal folder ([53ed827](https://github.com/Sage/carbon/commit/53ed8272794df4adeabc851142530c4380c8f58f))
* **utils:** move dnd helpers to drag-and-drop internal folder ([266d307](https://github.com/Sage/carbon/commit/266d3075e8d8fe44cabc3cb98067516db073baff))
* **utils:** move ether utils to the internal folder ([6b0ed28](https://github.com/Sage/carbon/commit/6b0ed284e848d22156bf84ef33cd43e706b5b169))
* **utils:** move events helper to the internal folder ([d58f85c](https://github.com/Sage/carbon/commit/d58f85c9fbec1d8a9b1ba492ed784262c690cce0))
* **utils:** move extract-props helper to the internal folder ([f26b9a4](https://github.com/Sage/carbon/commit/f26b9a46f40695419894e819e9139233070b54ff))
* **utils:** move filter-object-properties helper to the internal folder ([f892094](https://github.com/Sage/carbon/commit/f892094d2b50f758f6fb5088a8816ee9590d5258))
* **utils:** move guid helper to the internal folder ([7ce9a97](https://github.com/Sage/carbon/commit/7ce9a97372f74a891847fd44c5c426d4c78da599))
* **utils:** move immutable helper to the internal folder ([90b86e0](https://github.com/Sage/carbon/commit/90b86e0e5715e22fb1b0c68179d103c674413afd))
* **utils:** move logger util to the internal folder ([52e83f2](https://github.com/Sage/carbon/commit/52e83f20e56c50c5b570a5374ffa71b0789e77d1))
* **utils:** move serialize helper to table-ajax component internal folder ([8a2e417](https://github.com/Sage/carbon/commit/8a2e41740a92386afc7bdf9c79e83855a0fa5ac3))
* **utils:** move tags helper to the internal folder ([d94195b](https://github.com/Sage/carbon/commit/d94195bb29b9465915e4ffb7efad753d49d9fab6))
* **utils:** move with-unique-id-props helper to the internal folder ([b1e13d3](https://github.com/Sage/carbon/commit/b1e13d3d800e395950d88ff01d1818d753c09117))
* **utils:** remove base-registry util ([aa77ebe](https://github.com/Sage/carbon/commit/aa77ebe06fa89e059c2788d6cf63a6b959d36d61))
* **utils:** remove chainFunctions helper ([907021d](https://github.com/Sage/carbon/commit/907021dc72b0b62ca6093611b8c362b472af1ab4))
* **utils:** remove poller helper ([757a68b](https://github.com/Sage/carbon/commit/757a68b39dd403db6090c1db56af512705ec465a))
* **utils:** remove prop-types helper ([42bd890](https://github.com/Sage/carbon/commit/42bd89085676f2e4d68c987b4adf501dd11b86a6))
* **utils:** remove service util ([d33590e](https://github.com/Sage/carbon/commit/d33590e6733b1ba0cc06a2db7f61ccb113486b55))
* **utils:** remove should-component-update util ([1e68f98](https://github.com/Sage/carbon/commit/1e68f98dca6ef85fbf0be14cb657e05a27f71cbd))
* **utils:** remove text helper ([e2cb375](https://github.com/Sage/carbon/commit/e2cb375cac335223cde3e3b37ece6ca4a3ca7a82))
* **utils:** remove to-array helper ([e6d6099](https://github.com/Sage/carbon/commit/e6d609975945f23fbfd2afc5fea3e4dd82844a17))
* **utils:** remove validations helper ([f03086a](https://github.com/Sage/carbon/commit/f03086aea20ad17f6964394f74fd2a3868203cd7))

## [92.0.0](https://github.com/Sage/carbon/compare/v91.2.1...v92.0.0) (2021-10-05)


### ⚠ BREAKING CHANGES

* **form:** Sticky footers on Form will no longer disappear on
scrolling to the bottom of the form.

The height prop on Form can be used to set the size of a Form
with a sticky footer, particularly within a Dialog

### Features

* **form:** add height prop ([3ca7369](https://github.com/Sage/carbon/commit/3ca736973cfb586a92401b25a9d34604879d293d))


### Bug Fixes

* **form:** rewrite sticky footer ([e07b956](https://github.com/Sage/carbon/commit/e07b95682d4221e4121fe3fdaff6e6da34781d29))

### [91.2.1](https://github.com/Sage/carbon/compare/v91.2.0...v91.2.1) (2021-10-04)


### Bug Fixes

* **icon:** add missing sage_coin to type definition ([7e68f70](https://github.com/Sage/carbon/commit/7e68f70a711773de8fca2ad1dcfd21a05fda3102))

## [91.2.0](https://github.com/Sage/carbon/compare/v91.1.1...v91.2.0) (2021-10-04)


### Features

* **storybook:** add locale switcher ([38ed6f5](https://github.com/Sage/carbon/commit/38ed6f5db2e83aa4bfbf2933799e7f4dc4c31498))

### [91.1.1](https://github.com/Sage/carbon/compare/v91.1.0...v91.1.1) (2021-10-01)


### Bug Fixes

* **pager:** resolve typing for pageSizeSelectionOptions to be an array of objects ([e92d9bb](https://github.com/Sage/carbon/commit/e92d9bb59b9bfcb7bb7fb644aff84ea76584ed4a))

## [91.1.0](https://github.com/Sage/carbon/compare/v91.0.2...v91.1.0) (2021-10-01)


### Features

* **simple-select:** add prop to specify the open direction of a select list ([cf2c928](https://github.com/Sage/carbon/commit/cf2c928cc123a5c8bb0ebae8fc62b274d56246b7))

### [91.0.2](https://github.com/Sage/carbon/compare/v91.0.1...v91.0.2) (2021-09-28)


### Bug Fixes

* **menu:** remove menubar and menuitem roles ([b2f6f0d](https://github.com/Sage/carbon/commit/b2f6f0dba1e089a2ccd9a0d1aa9daad941152410)), closes [#4394](https://github.com/Sage/carbon/issues/4394)

### [91.0.1](https://github.com/Sage/carbon/compare/v91.0.0...v91.0.1) (2021-09-27)


### Bug Fixes

* **i18n-provider:** fix type definition ([73b485f](https://github.com/Sage/carbon/commit/73b485f4d718d80387216cf94497fff4b7936a35))

## [91.0.0](https://github.com/Sage/carbon/compare/v90.0.2...v91.0.0) (2021-09-24)


### ⚠ BREAKING CHANGES

* **split-button:** SplitButton is now a functional component and cannot be extended

### Code Refactoring

* **split-button:** rewrite class component to functional ([c459149](https://github.com/Sage/carbon/commit/c45914901baf38eeeaa72f801664fe95da45c75c))

### [90.0.2](https://github.com/Sage/carbon/compare/v90.0.1...v90.0.2) (2021-09-24)


### Bug Fixes

* **simple-select:** change the test story format from mdx to js ([ef617d3](https://github.com/Sage/carbon/commit/ef617d366f41529b05d1766357fb8f222ebd4f4f))

### [90.0.1](https://github.com/Sage/carbon/compare/v90.0.0...v90.0.1) (2021-09-24)


### Bug Fixes

* **vertical-divider:** change tint type to number ([bbe5556](https://github.com/Sage/carbon/commit/bbe55562f0b664867934f56fb344d413c84a2621)), closes [#4422](https://github.com/Sage/carbon/issues/4422)

## [90.0.0](https://github.com/Sage/carbon/compare/v89.3.0...v90.0.0) (2021-09-24)


### ⚠ BREAKING CHANGES

* **inputs:** Props not declared in propTypes (including className) are no longer
being spread on the root element in following components:
ButtonToggleGroup, Checkbox, Date, Decimal,
GroupedCharacter, Number, RadioButton, Select, MultiSelect,
FilterableSelect, Switch, Textarea, Textbox.

Furthermore in all these components apart from the ButtonToggleGroup
all not declared props will be passed to the underlying HTML input
element

### Code Refactoring

* **inputs:** change the way props are spread internally ([1cc93ec](https://github.com/Sage/carbon/commit/1cc93ec3e81acf5f8c44834d327587daaca46ae5))

## [89.3.0](https://github.com/Sage/carbon/compare/v89.2.0...v89.3.0) (2021-09-23)


### Features

* **content:** change a string type of the title prop to a node type ([b096825](https://github.com/Sage/carbon/commit/b0968256b02e9cc588a0e0d32e627f0ea9b49b43))

## [89.2.0](https://github.com/Sage/carbon/compare/v89.1.0...v89.2.0) (2021-09-23)


### Features

* **i18n:** add types for the base locale file ([47964d5](https://github.com/Sage/carbon/commit/47964d52ce00e0f525c9a0877e01d9c0f97b409d))

## [89.1.0](https://github.com/Sage/carbon/compare/v89.0.0...v89.1.0) (2021-09-23)


### Features

* **tile-select:** add support for rendering accordion footer ([0dd1f32](https://github.com/Sage/carbon/commit/0dd1f326d19ab3f213df3eaf15781aef88677924))

## [89.0.0](https://github.com/Sage/carbon/compare/v88.0.0...v89.0.0) (2021-09-22)


### ⚠ BREAKING CHANGES

* **pod-manager:** deprecated pod-manager component has been removed
* **pod:** Pod is now a functional component and cannot be extended

### Code Refactoring

* **pod:** rewrite class component to functional ([fc65a0f](https://github.com/Sage/carbon/commit/fc65a0f37c77d7815a1cb5ce95d0153240dc5785))
* **pod-manager:** remove deprecated pod-manager component ([997d734](https://github.com/Sage/carbon/commit/997d7346aea263831bafcaae30136a2a7c5e5ef1))

## [88.0.0](https://github.com/Sage/carbon/compare/v87.5.0...v88.0.0) (2021-09-22)


### ⚠ BREAKING CHANGES

* **profile:** Profile is now a functional component and cannot be extended

### Code Refactoring

* **profile:** convert from class to functional component ([2a704f7](https://github.com/Sage/carbon/commit/2a704f715bd821b8daa9585237533d0d8e3293a4))

## [87.5.0](https://github.com/Sage/carbon/compare/v87.4.0...v87.5.0) (2021-09-21)


### Features

* **tile-select:** surface new additonalInformation prop ([fa21724](https://github.com/Sage/carbon/commit/fa217241427360d78d9248a434a16bdb09e7367f))

## [87.4.0](https://github.com/Sage/carbon/compare/v87.3.0...v87.4.0) (2021-09-20)


### Features

* **navigation-bar:** add sticky position ([1b298fe](https://github.com/Sage/carbon/commit/1b298fefe9dbcc696fa66a71c843a052a65cd258))

## [87.3.0](https://github.com/Sage/carbon/compare/v87.2.0...v87.3.0) (2021-09-20)


### Features

* **flat-table:** add drag and drop functionality to table rows ([20671e4](https://github.com/Sage/carbon/commit/20671e43a0a8c5861503f4cca3202aa9fd07af3c))

## [87.2.0](https://github.com/Sage/carbon/compare/v87.1.0...v87.2.0) (2021-09-17)


### Features

* **textbox:** add a character counter ([bffdf35](https://github.com/Sage/carbon/commit/bffdf3598a0ad86499fb3f6af8c7e1f2ba30c635))

## [87.1.0](https://github.com/Sage/carbon/compare/v87.0.1...v87.1.0) (2021-09-17)


### Features

* **menu-item:** add callbacks for submenu toggle ([2507335](https://github.com/Sage/carbon/commit/2507335f816e5b9f63677abb8ae01907262fcb77)), closes [#4303](https://github.com/Sage/carbon/issues/4303)

### [87.0.1](https://github.com/Sage/carbon/compare/v87.0.0...v87.0.1) (2021-09-16)


### Bug Fixes

* **textbox:** fix incorrect styling when required and in error state ([83794d8](https://github.com/Sage/carbon/commit/83794d8cd62175187ee0a9d86574ad8227fd7c90))

## [87.0.0](https://github.com/Sage/carbon/compare/v86.0.1...v87.0.0) (2021-09-15)


### ⚠ BREAKING CHANGES

* **form-summary:** `errors.messages.formSummary` key returns an array of strings instead of a string

### Code Refactoring

* **form-summary:** change the design of the validation message ([6dc74a9](https://github.com/Sage/carbon/commit/6dc74a9c4777e9131906fb5ba0b33e3e173dd07b))

### [86.0.1](https://github.com/Sage/carbon/compare/v86.0.0...v86.0.1) (2021-09-15)


### Bug Fixes

* **flat-table-head:** ensure table head row children are an array before running find function ([e0b42e8](https://github.com/Sage/carbon/commit/e0b42e805dd92212351dc036645dbe56ab0f0550)), closes [#4378](https://github.com/Sage/carbon/issues/4378)

## [86.0.0](https://github.com/Sage/carbon/compare/v85.0.0...v86.0.0) (2021-09-14)


### ⚠ BREAKING CHANGES

* **pages:** Pages is no more class component

### Code Refactoring

* **pages:** rewrite to be functional ([accc933](https://github.com/Sage/carbon/commit/accc9334e957df0f80198361c62ad4cc4f921af3))

## [85.0.0](https://github.com/Sage/carbon/compare/v84.5.0...v85.0.0) (2021-09-13)


### ⚠ BREAKING CHANGES

* **carousel:** Carousel is now a functional component and cannot be extended

### Code Refactoring

* **carousel:** change class component to functional ([3536d54](https://github.com/Sage/carbon/commit/3536d543d752a6ca4b7bc62d4ffe4377696bf59f))

## [84.5.0](https://github.com/Sage/carbon/compare/v84.4.0...v84.5.0) (2021-09-13)


### Features

* **loader-bar:** create loader-bar ([a5d5f7c](https://github.com/Sage/carbon/commit/a5d5f7c042814426a149e3787c81c9c82f2d4817))

## [84.4.0](https://github.com/Sage/carbon/compare/v84.3.0...v84.4.0) (2021-09-09)


### Features

* **link:** render an anchor element whenever a href prop is passed ([18e6471](https://github.com/Sage/carbon/commit/18e64719fd2f736e32c878b9b5611a630dac4fb6))

## [84.3.0](https://github.com/Sage/carbon/compare/v84.2.1...v84.3.0) (2021-09-09)


### Features

* **inline-inputs:** add labelWidth and inputWidth props ([d7412b2](https://github.com/Sage/carbon/commit/d7412b253ea784d7fbb2cd8ff83a7eff041943e2))


### Bug Fixes

* **inline-inputs:** center label position when in form ([cafc9e4](https://github.com/Sage/carbon/commit/cafc9e45eae860935056b4b733e6d886e6b73c76))

### [84.2.1](https://github.com/Sage/carbon/compare/v84.2.0...v84.2.1) (2021-09-08)


### Bug Fixes

* **pager:** update show select value when page size prop is changed ([41e4a5e](https://github.com/Sage/carbon/commit/41e4a5e5e6f8622d3ca09f5037907242c6d0bc50))

## [84.2.0](https://github.com/Sage/carbon/compare/v84.1.0...v84.2.0) (2021-09-07)


### Features

* **button-bar:** create button-bar component ([cf7aa18](https://github.com/Sage/carbon/commit/cf7aa18fff616fe1a7adc77dfc8b6ad29f2e4de6))

## [84.1.0](https://github.com/Sage/carbon/compare/v84.0.2...v84.1.0) (2021-09-03)


### Features

* **tile-select:** add support for rendering prefixAdornment ([16afad0](https://github.com/Sage/carbon/commit/16afad0dca0f2dd7a1b914082ad80e42f3683082))


### Bug Fixes

* **tile-select:** ensure title, subtitle and adornment wrap at smaller screen resolution ([c3af2cb](https://github.com/Sage/carbon/commit/c3af2cbdad4649b4a93171c1928af7b2e95e8f9d)), closes [#4219](https://github.com/Sage/carbon/issues/4219)

### [84.0.2](https://github.com/Sage/carbon/compare/v84.0.1...v84.0.2) (2021-09-03)


### Bug Fixes

* **sidebar:** add a type of children in interface, update the position and the size prop types ([56e6841](https://github.com/Sage/carbon/commit/56e6841828d013586f49d7f7022e496a68e58b14))

### [84.0.1](https://github.com/Sage/carbon/compare/v84.0.0...v84.0.1) (2021-09-02)


### Bug Fixes

* **tile:** address spelling mistake with horizontal in the options for orientation prop ([e03b41a](https://github.com/Sage/carbon/commit/e03b41ad9a49592ce56515fbc32b1fe51938aa57))

## [84.0.0](https://github.com/Sage/carbon/compare/v83.2.0...v84.0.0) (2021-09-02)


### ⚠ BREAKING CHANGES

* **help:** aria-label and value are no longer rendered based on children
There is a codemod available to assist with this upgrade:
npx carbon-codemod add-prop src carbon-react/lib/components/help aria-label <value>
See https://github.com/Sage/carbon-codemod for more information.

### Features

* **help:** change the children proptype from string to node ([dad2b7f](https://github.com/Sage/carbon/commit/dad2b7f3b44fe3a1de4efe13d78ed774a4fd31fa))
* **icon:** change the tooltip message proptype from string to node ([5b1a8e4](https://github.com/Sage/carbon/commit/5b1a8e42433dc1463fe84a59e0e5c8c8b3d7a6dd))


### Bug Fixes

* **link:** import the proper link component and the styled link ([b03de73](https://github.com/Sage/carbon/commit/b03de735769f7b8bad8b12b99087ee1d3c2016be))

## [83.2.0](https://github.com/Sage/carbon/compare/v83.1.0...v83.2.0) (2021-09-02)


### Features

* **definition-list:** add support for rendering component as single column ([61e03d5](https://github.com/Sage/carbon/commit/61e03d5286cacfe58685336734e72b09b7df8529))

## [83.1.0](https://github.com/Sage/carbon/compare/v83.0.3...v83.1.0) (2021-09-01)


### Features

* **button:** make icon only buttons squares ([dad293b](https://github.com/Sage/carbon/commit/dad293bf731289ce9b0635ddc4e4959e7e5cf3f3))

### [83.0.3](https://github.com/Sage/carbon/compare/v83.0.2...v83.0.3) (2021-08-31)


### Bug Fixes

* **toast:** stop blocking interactions with other elements ([84fd647](https://github.com/Sage/carbon/commit/84fd64756d245d06fa0b241bcafabfc85df0c223))

### [83.0.2](https://github.com/Sage/carbon/compare/v83.0.1...v83.0.2) (2021-08-30)


### Bug Fixes

* **select:** stop form submit when enter key is pressed with open list ([4351789](https://github.com/Sage/carbon/commit/4351789c9db826af5c235069e845b0c99971fe3a))

### [83.0.1](https://github.com/Sage/carbon/compare/v83.0.0...v83.0.1) (2021-08-30)


### Bug Fixes

* **pod:** add missing height prop type definition ([ec6d3ca](https://github.com/Sage/carbon/commit/ec6d3ca1128b79135d2f7fea70043a66ce86f402))

## [83.0.0](https://github.com/Sage/carbon/compare/v82.1.0...v83.0.0) (2021-08-30)


### ⚠ BREAKING CHANGES

* **pill:** all components that extend the pill component will need to be changed

### Code Refactoring

* **pill:** convert a class component to a function component ([e0302a4](https://github.com/Sage/carbon/commit/e0302a45da527d019b5836f6e78bb29fc04ee178))

## [82.1.0](https://github.com/Sage/carbon/compare/v82.0.1...v82.1.0) (2021-08-30)


### Features

* **icon:** add arrow_left_right_small ([eb8f078](https://github.com/Sage/carbon/commit/eb8f078469945d95f229ab759648a99d765a2f10))
* **icon:** add circle_with_dots ([c9047d1](https://github.com/Sage/carbon/commit/c9047d16a6848a54306e31c3229184a10c389600))
* **icon:** add pause ([63c6eaf](https://github.com/Sage/carbon/commit/63c6eafbed10e9bb6d1d1c8e63bb036fccb8a059))
* **icon:** add squares_nine ([0706c99](https://github.com/Sage/carbon/commit/0706c99abe3b4ea91ff8ad05c9d8bc205b68dfe6))

### [82.0.1](https://github.com/Sage/carbon/compare/v82.0.0...v82.0.1) (2021-08-27)


### Bug Fixes

* **filterable-select:** list not closed on click outside in Safari ([29b49df](https://github.com/Sage/carbon/commit/29b49df58606f56866b72c66a1699ba9d7b7e898))

## [82.0.0](https://github.com/Sage/carbon/compare/v81.3.0...v82.0.0) (2021-08-24)


### ⚠ BREAKING CHANGES

* **link:** remove get icon, tabIndex and componentProps functions

### Code Refactoring

* **link:** convert a class component to a function component ([44c56e6](https://github.com/Sage/carbon/commit/44c56e6bb6f877c5b2e3ce9165f1fa3fc01a7a90))

## [81.3.0](https://github.com/Sage/carbon/compare/v81.2.2...v81.3.0) (2021-08-23)


### Features

* **checkbox, checkbox-group:** add tooltipPosition prop to the interface ([b000e45](https://github.com/Sage/carbon/commit/b000e4553f9432b5e1db8cef9faf2655b5daf252))
* **date:** add tooltipPosition prop to interface ([97c41c0](https://github.com/Sage/carbon/commit/97c41c0796159063e671707ecc40027ce9d1a181))
* **date-range:** add tooltipPosition prop to interface ([68def53](https://github.com/Sage/carbon/commit/68def5369fd0d91d31bd05389be6d11aecbc38fc))
* **decimal:** add tooltipPosition prop to interface ([3322ec3](https://github.com/Sage/carbon/commit/3322ec317a5a1fcc1676a50355eb5fd6183e99ae))
* **filterable-select:** add tooltipPosition prop to interface ([327e96b](https://github.com/Sage/carbon/commit/327e96b7c641f10899ce2f0d20420a98e652a0e5))
* **icon:** component consumes TooltipContext to allow overriding toolitip position ([a7e0841](https://github.com/Sage/carbon/commit/a7e084111a2bcbdf38ff2cb2577da276210e112d))
* **multi-select:** add tooltipPosition prop to interface ([68f1d91](https://github.com/Sage/carbon/commit/68f1d9190d9b1fc9c52424db53a66c848705c2f3))
* **numeral-date:** add tooltipPosition prop to interface ([bf5e35d](https://github.com/Sage/carbon/commit/bf5e35d65ad7ab9adbdc86dedf14f18ac503566f))
* **radio-button, radio-button-group:** add tooltipPosition prop to interface ([7aa0ce1](https://github.com/Sage/carbon/commit/7aa0ce1f75974f6a3a4868b10c158a70b68fcb57))
* **simple-select:** add tooltipPosition prop to interface ([a7f3e9a](https://github.com/Sage/carbon/commit/a7f3e9a212770b5115c8893ac7689f58b81f5168))
* **switch:** add tooltipPosition prop to interface ([57e994e](https://github.com/Sage/carbon/commit/57e994ed4cbff10bd983362f7f9032b06d45f37f))
* **textarea:** add tooltipPosition prop to interface ([016466d](https://github.com/Sage/carbon/commit/016466dc19ab5e5b122139836c1566a1a7754019))
* **textbox:** integrate TooltipProvider and surface tooltipPosition prop ([c05dd40](https://github.com/Sage/carbon/commit/c05dd40c4bbde571e1ae32e496fac16f59d02441))
* **tooltip-provider:** add context and provider component ([957f14a](https://github.com/Sage/carbon/commit/957f14af0c246b919d9791684a656eba7be53e73))

### [81.2.2](https://github.com/Sage/carbon/compare/v81.2.1...v81.2.2) (2021-08-20)


### Bug Fixes

* **select:** scroll option into view when using keyboard navigation ([d09ef73](https://github.com/Sage/carbon/commit/d09ef739f730039f6105273f75b16a40ad753f78)), closes [#4270](https://github.com/Sage/carbon/issues/4270)

### [81.2.1](https://github.com/Sage/carbon/compare/v81.2.0...v81.2.1) (2021-08-19)


### Bug Fixes

* **focus-trap:** add mutation observer ([562fd12](https://github.com/Sage/carbon/commit/562fd12379df01d52a32b24bc979fa03a919e190)), closes [#4255](https://github.com/Sage/carbon/issues/4255)

## [81.2.0](https://github.com/Sage/carbon/compare/v81.1.1...v81.2.0) (2021-08-18)


### Features

* **toolbar:** add support for overriding translations in TextEditor Toolbar ([483a43f](https://github.com/Sage/carbon/commit/483a43fd4b2a8515299560512fa3fc4d9552c9b1)), closes [#4121](https://github.com/Sage/carbon/issues/4121)

### [81.1.1](https://github.com/Sage/carbon/compare/v81.1.0...v81.1.1) (2021-08-18)


### Bug Fixes

* **date-picker:** month could not be changed in datepicker ([053bb88](https://github.com/Sage/carbon/commit/053bb88286d37a56c59e6640b3b2cfe74cc8540f))

## [81.1.0](https://github.com/Sage/carbon/compare/v81.0.5...v81.1.0) (2021-08-17)


### Features

* **sidebar:** implement ref forwarding ([da9fbd1](https://github.com/Sage/carbon/commit/da9fbd1129b3324b70147ac755da077ba2f05b46))


### Bug Fixes

* **sidebar:** incorrect typescript class export ([9a1b9c8](https://github.com/Sage/carbon/commit/9a1b9c843725871f32897d59c8c4e649838a9ff8))
* **sidebar:** sidebar context not exported in typescript ([1e026e4](https://github.com/Sage/carbon/commit/1e026e47c1d6f82dfe221e07e8c2ff4f3b5d3e50))

### [81.0.5](https://github.com/Sage/carbon/compare/v81.0.4...v81.0.5) (2021-08-06)


### Bug Fixes

* **link:** add additional ARIA if no children ([1d8a598](https://github.com/Sage/carbon/commit/1d8a5986b4f3a6d2175c9f0dddc3c2cafdd09072))
* **menu:** add aria-role to fix accessibility violations ([8e562a0](https://github.com/Sage/carbon/commit/8e562a086223617764815aa2e454c9d0f12f3f5f))
* **menu-full-screen:** add missing ARIA ([020b7d2](https://github.com/Sage/carbon/commit/020b7d291560938fdc878392b5ba1a24fe0ee6da))
* **menu-item:** add ariaLabel to submenu ([e1c1765](https://github.com/Sage/carbon/commit/e1c1765af5293f86e1ed8422baed296942ce2f1e))

### [81.0.4](https://github.com/Sage/carbon/compare/v81.0.3...v81.0.4) (2021-08-05)


### Bug Fixes

* **flat-table:** ensure correct z-index is applied to flat-table-header ([0aeb143](https://github.com/Sage/carbon/commit/0aeb1435935e06b59b1f9086945174e9673c8637)), closes [#4226](https://github.com/Sage/carbon/issues/4226)
* **flat-table-header:** add padding-right specifically for Firefox ([d85e134](https://github.com/Sage/carbon/commit/d85e1342d3c26ed794f87fdb4541b783ef4c4986))
* **flat-table-row:** apply border-left if preceding row has a row header ([04af1c5](https://github.com/Sage/carbon/commit/04af1c53c32d44f1bf0e95791b8b276926b47389))

### [81.0.3](https://github.com/Sage/carbon/compare/v81.0.2...v81.0.3) (2021-08-05)


### Bug Fixes

* **flat-table-row:** remove hover state for rows within drawer sidebar and no onclick ([222f5fb](https://github.com/Sage/carbon/commit/222f5fb7c28c0ccf8de9cecf85c4dea4806119f8)), closes [#4276](https://github.com/Sage/carbon/issues/4276)

### [81.0.2](https://github.com/Sage/carbon/compare/v81.0.1...v81.0.2) (2021-08-05)


### Bug Fixes

* **card:** incorrect props on a static card ([1c069b8](https://github.com/Sage/carbon/commit/1c069b860a1657872c1547847a3ba83df1e06434))

### [81.0.1](https://github.com/Sage/carbon/compare/v81.0.0...v81.0.1) (2021-08-04)


### Bug Fixes

* **search:** incorrect margin when used in Form ([f0a0241](https://github.com/Sage/carbon/commit/f0a0241f5d3b6a44bbfec3b5480e91a1fcf46a32))

## [81.0.0](https://github.com/Sage/carbon/compare/v80.1.0...v81.0.0) (2021-08-04)


### ⚠ BREAKING CHANGES

* **pod:** description prop removed,
functionality could be replicated by rendering a description as Pod child
there is a codemod available to assist with this change:
(https://github.com/Sage/carbon-codemod/tree/master/transforms/move-pod-description-to-content)
* **pod:** collapse functionality removed,
Accordion Component could be used to replicate it
There is a codemod available to assist with this change:
(https://github.com/Sage/carbon-codemod/tree/master/
transforms/replace-collapsible-pod-with-accordion)

### Code Refactoring

* **pod:** remove collapse functionality ([4babacb](https://github.com/Sage/carbon/commit/4babacb441f1d131221749ba68c7b9384750af29))
* **pod:** remove description prop ([46f2480](https://github.com/Sage/carbon/commit/46f248021e7b79bcfff6d397a6ecac22055cf06d))

## [80.1.0](https://github.com/Sage/carbon/compare/v80.0.0...v80.1.0) (2021-08-02)


### Features

* **pod:** added softDelete, onDelete and onUndo functionalities ([76b23ef](https://github.com/Sage/carbon/commit/76b23ef5964300876f85e00a71056bdd1987e57f))
* **show-edit-pod:** added softDelete, onDelete and onUndo functionalities ([df467f9](https://github.com/Sage/carbon/commit/df467f93bb7c1775eb1ba8107ec5e6a986012eb4))

## [80.0.0](https://github.com/Sage/carbon/compare/v79.1.1...v80.0.0) (2021-07-30)


### ⚠ BREAKING CHANGES

* **i18n:** Translations are providing via a locale file (https://github.com/Sage/carbon/blob/master/rfcs/text/i18n.md).
`validationMessage` method of validations helper has been removed.
`formatDateToCurrentLocale`, `withinRange`, `weekdaysMinified`, `formatValue` and `isValidDate` methods of date helper have been removed.

### Code Refactoring

* **i18n:** remove i18n-js ([2307677](https://github.com/Sage/carbon/commit/2307677498808506e3a8852dbf2a482a443fb3b5))

### [79.1.1](https://github.com/Sage/carbon/compare/v79.1.0...v79.1.1) (2021-07-26)


### Bug Fixes

* **tile-select:** disabled prop is not working correctly ([b74e3ca](https://github.com/Sage/carbon/commit/b74e3caf72853f05863b248db2bdd8203ce564cb))

## [79.1.0](https://github.com/Sage/carbon/compare/v79.0.1...v79.1.0) (2021-07-26)


### Features

* **multi-select:** add pill color override functionality ([93e5e3e](https://github.com/Sage/carbon/commit/93e5e3e95a3da680d472e80ca6d13382e18feb6d))

### [79.0.1](https://github.com/Sage/carbon/compare/v79.0.0...v79.0.1) (2021-07-23)


### Bug Fixes

* **sidebar:** fix header not respecting container width ([de13810](https://github.com/Sage/carbon/commit/de13810885f244731dd4e9b32a22dd8ca6724ec2)), closes [#4240](https://github.com/Sage/carbon/issues/4240)

## [79.0.0](https://github.com/Sage/carbon/compare/v78.0.0...v79.0.0) (2021-07-23)


### ⚠ BREAKING CHANGES

* **options-helper:** OptionsHelper has been removed. All references will stop work.
Types are exported from their own files.

All affected files are listed below:
- checkbox
- date
- decimal
- form-field
- input-presentation
- input-icon
- label
- numeral-date
- radio-button
- switch
- textarea
- textbox
- accordion
- action-popover-item
- alert
- story-constants
- batch-selection
- button
- button-toggle
- card
- confirm
- detail
- dialog
- flat-table
- form
- help
- icon
- inline-inputs
- link
- loader
- message
- message-content
- multi-action-button
- menu
- pod
- tile
- popover-container
- portrait
- profile
- row
- select-textbox
- show-edit-pod
- sidebar
- split-button
- step-sequence
- table
- tabs-header
- toast
- tooltip
- validation-cion
- vertical-divider
- image
- action-popover
- accordion
- input-definition
- styled-system-interfaces
- options-helper

### Bug Fixes

* remove jest-styled-components ([33582ca](https://github.com/Sage/carbon/commit/33582ca2042fcef23e74d71b31ab924d04ae5a62))


### Code Refactoring

* **options-helper:** remove util ([84ce69f](https://github.com/Sage/carbon/commit/84ce69f48d09df294086f1d4ec231e00dd1bba33))

## [78.0.0](https://github.com/Sage/carbon/compare/v77.14.3...v78.0.0) (2021-07-22)


### ⚠ BREAKING CHANGES

* **simple-color-picker:** SimpleColorPicker has moved to src/components/simple-color-picker
* **radio-button:** RadioButton has moved to src/components/radio-button
* **decimal:** Decimal has new import path - carbon-react/lib/components/decimal
There is a codemod available to assist with this upgrade:
npx carbon-codemod move-experimental-components <target>
See https://github.com/Sage/carbon-codemod for more information.
* **form-field:** FormField has moved to src/__internal__/form-field
* **input:** Input has moved to src/__internal__/input/
* **validation-icon:** ValidationIcon has moved to src/__internal__/
* **label:** Label is now an internal component
* **date-range:** `DateRange` has been moved to src/components/date-range. There is a codemod
available to assist with this upgrade
(https://github.com/Sage/carbon-codemod/tree/master/transforms/move-experimental-components)
* **date:** Date has been moved to src/components/date. There is a codemod available to assist
with this upgrade
(https://github.com/Sage/carbon-codemod/tree/master/transforms/move-experimental-components)
* **switch:** Switch has moved to src/components/switch
* **checkbox:** Checkbox and CheckboxGroup have moved
to src/components/checkbox
* **numeral-date:** NumeralDate has moved to src/components/numeral-date
* **grouped-character:** GroupedCharacter has new import path -
carbon-react/lib/components/grouped-character
There is a codemod available to assist with this upgrade:
npx carbon-codemod move-experimental-components <target>
See https://github.com/Sage/carbon-codemod for more information.
* **search:** Search has new import path - carbon-react/lib/components/search
* **textarea:** Textarea has moved to src/components/textarea
* **number:** Number has new import path - carbon-react/lib/components/number
There is a codemod available to assist with this upgrade:
npx carbon-codemod move-experimental-components <target>
See https://github.com/Sage/carbon-codemod for more information.
* **field-help:** FieldHelp has moved to the internal folder
* **fieldset:** Fieldset has moved to src/components/fieldset
* **textbox:** New component path src/components/textbox
* **input-icon-toggle:** New component path src/__internal__/input-icon-toggle

### Features

* **input-icon-toggle:** add onblur and onfocus handlers ([8dcbdcd](https://github.com/Sage/carbon/commit/8dcbdcd75e08c477a1daded69da87a76c3de71d4))
* **validation-icon:** add onblur and onfocus handlers ([32c0c50](https://github.com/Sage/carbon/commit/32c0c50eda739322ec3f269e9ed211a274494eeb))


### Bug Fixes

* **switch:** fix console error in sizes story ([035ca1b](https://github.com/Sage/carbon/commit/035ca1be212bbe10a838132e827aeb2b3c996782))
* **switch-slider:** pass correct props down to loader ([b2f8bce](https://github.com/Sage/carbon/commit/b2f8bcee846dec43c806139b44c42ad02dae2961))


### Code Refactoring

* **checkbox:** move from experimental to components ([03ca633](https://github.com/Sage/carbon/commit/03ca633dcc15639ac951d2e6d36bd37546691341))
* **date:** move from experimental into main components directory ([cc87589](https://github.com/Sage/carbon/commit/cc87589fc5bd8db6c181fa23f753df830384d01c))
* **date-range:** move component out of experimental into main components directory ([933761e](https://github.com/Sage/carbon/commit/933761efd1c156a49fb35d6e5e918ff63a46cf21))
* **decimal:** move component from experimental ([ea1fbe9](https://github.com/Sage/carbon/commit/ea1fbe97f3e75ceab68ebbab94a1b1998095af39))
* **field-help:** move to internal folder ([af60bf8](https://github.com/Sage/carbon/commit/af60bf8d5f0c12e5a48739c37bed6606203400e8))
* **fieldset:** move fieldset from experimental to components ([72aa35c](https://github.com/Sage/carbon/commit/72aa35c06f59ff85a3a0a8f2145497c05f73445b))
* **form-field:** move from experimental to internal ([2165bed](https://github.com/Sage/carbon/commit/2165bed7cdbca62bfe253b79ce440adcc4cc305a))
* **grouped-character:** move component from experimental ([8d66245](https://github.com/Sage/carbon/commit/8d6624504d1aca19cca9b8ca48196dde7dff8438))
* **input:** move from experimental to internal ([4b36d02](https://github.com/Sage/carbon/commit/4b36d02132f2c08ac0d225bdd6328d3ebe80a8cf))
* **input-icon-toggle:** make experimental input-icon-toggle component internal ([dc64b1c](https://github.com/Sage/carbon/commit/dc64b1c4240f5a9b7afe949cdca2f29ddef27f28))
* **label:** make experimental label component an internal one ([02b2dcd](https://github.com/Sage/carbon/commit/02b2dcd865903f521930c026ba7d860136e97619))
* **number:** move component from experimental to components ([25e9405](https://github.com/Sage/carbon/commit/25e94056cfe3db259c8c14c3ab8f41ccda626439))
* **numeral-date:** move out of external folder ([c35df12](https://github.com/Sage/carbon/commit/c35df12ae8d25db31fbb57123d50dce59f8aed29))
* **radio-button:** move from experimental to components ([bc80509](https://github.com/Sage/carbon/commit/bc80509fdfb70ccda46bd8c0a32fcc1cd4878d3c))
* **search:** make experimental search component a regular one ([6f66963](https://github.com/Sage/carbon/commit/6f66963da54dfc347ef5da891e2b672edc441d3f))
* **simple-color-picker:** move from experimental to components ([40261dd](https://github.com/Sage/carbon/commit/40261dd5178691aa848e455ee4a3c6b6f5f52a24))
* **switch:** move from experimental to components ([994e59c](https://github.com/Sage/carbon/commit/994e59c3d0874c041c43a0080e550884fb4eef4c))
* **textarea:** move from experimental to components ([f09f77f](https://github.com/Sage/carbon/commit/f09f77fd8d62f21f64853cfaae1c8f47aec749fc))
* **textbox:** make experimental textbox component a regular one ([7012713](https://github.com/Sage/carbon/commit/701271352c4205c7459fd0e6a7bec98ca759b450))
* **validation-icon:** move to internal folder ([d4032c7](https://github.com/Sage/carbon/commit/d4032c7454845ded424219257c27c84001f6be92))

### [77.14.3](https://github.com/Sage/carbon/compare/v77.14.2...v77.14.3) (2021-07-22)


### Bug Fixes

* **dependency:** move cypress-real-events to dev dependency ([f93d2b2](https://github.com/Sage/carbon/commit/f93d2b20350608fa9cddfff3dc0422c4d1126c77))

### [77.14.2](https://github.com/Sage/carbon/compare/v77.14.1...v77.14.2) (2021-07-22)


### Bug Fixes

* **textbox:** added missing labeAlign propType definition ([8dff28b](https://github.com/Sage/carbon/commit/8dff28b51820f2e52452d9d8adf6bbf0210ea8b1))

### [77.14.1](https://github.com/Sage/carbon/compare/v77.14.0...v77.14.1) (2021-07-21)


### Bug Fixes

* **checkable-input:** fix invalid aria formats ([4db6af4](https://github.com/Sage/carbon/commit/4db6af4a265e34821dae89eb56471408f9a4d9ea))
* **flat-table:** add aria-label to various stories ([613786b](https://github.com/Sage/carbon/commit/613786b2945b4f4827a46c388cbf0ef781088236))
* **icon-button:** ensure buttons have discernible text ([70ce422](https://github.com/Sage/carbon/commit/70ce4220e57b72da9b6f4fecf105c0ccfb5c9cc1))

## [77.14.0](https://github.com/Sage/carbon/compare/v77.13.3...v77.14.0) (2021-07-21)


### Features

* **menu-full-screen:** add new component to achieve fullscreen menu view ([55d42a2](https://github.com/Sage/carbon/commit/55d42a28ca1a21349b8ac5158624586d8e0f6bc5))

### [77.13.3](https://github.com/Sage/carbon/compare/v77.13.2...v77.13.3) (2021-07-20)


### Bug Fixes

* **tabs:** remove default margins and paddings ([d301b3a](https://github.com/Sage/carbon/commit/d301b3a7e87d20c3f26a1dfe6fe0534e74afba7a))

### [77.13.2](https://github.com/Sage/carbon/compare/v77.13.1...v77.13.2) (2021-07-16)


### Bug Fixes

* **search:** correct onClick prop ts type ([e5b3b7b](https://github.com/Sage/carbon/commit/e5b3b7b8c3124d2ba4da233378de53fb11cc4ae0)), closes [#4185](https://github.com/Sage/carbon/issues/4185)

### [77.13.1](https://github.com/Sage/carbon/compare/v77.13.0...v77.13.1) (2021-07-16)


### Bug Fixes

* **simple-color-picker:** set cursor to not-allowed when component is disabled ([790c8e2](https://github.com/Sage/carbon/commit/790c8e23b3f133377d0d6297eb4431b858348fc8))

## [77.13.0](https://github.com/Sage/carbon/compare/v77.12.2...v77.13.0) (2021-07-16)


### Features

* **link-preview:** add new component to support displaying link previews ([4348aaf](https://github.com/Sage/carbon/commit/4348aaf65e095dce3d0393449d579286d9bab931))
* **note:** add support for rendering link previews ([5519c30](https://github.com/Sage/carbon/commit/5519c3045cf3f81bc18f4e426e19c3d01a021201))
* **text-editor:** add support for rendering editor link previews ([a436ea5](https://github.com/Sage/carbon/commit/a436ea5b2ee05e4d54afa2a930815aedf4673e84))


### Bug Fixes

* **toolbar:** add missing focus trigger when right key press and last button focused ([5d713fd](https://github.com/Sage/carbon/commit/5d713fda086d0e40d619e1a955f9849ddff7397a))

### [77.12.2](https://github.com/Sage/carbon/compare/v77.12.1...v77.12.2) (2021-07-15)


### Bug Fixes

* **tile-select:** prevent focus outline when tile select is disabled ([e6c9a17](https://github.com/Sage/carbon/commit/e6c9a174401e6162d6d44273ca0e1af398e11256)), closes [#4227](https://github.com/Sage/carbon/issues/4227)

### [77.12.1](https://github.com/Sage/carbon/compare/v77.12.0...v77.12.1) (2021-07-14)


### Bug Fixes

* **sidebar:** support for Form with stickyFooter ([164aebb](https://github.com/Sage/carbon/commit/164aebbbe63d00bfffbd11d6e90a1e6f3692787c))

## [77.12.0](https://github.com/Sage/carbon/compare/v77.11.2...v77.12.0) (2021-07-14)


### Features

* **filterable-select:** add onFilterChange prop ([9ecb067](https://github.com/Sage/carbon/commit/9ecb067c4ea1f37e6b44e8830b7c77ca6108d1e0))
* **multi-select:** add onFilterChange prop ([8058dab](https://github.com/Sage/carbon/commit/8058dabe83609b437eccea2852a141d5e4618057))


### Bug Fixes

* **filterable-select:** text value cleared when option list changes ([8190fe0](https://github.com/Sage/carbon/commit/8190fe0eba28468d5eb8e55ec9634f1265a708f0))
* **filterable-select:** text value cleared when select is closed ([0fe05fc](https://github.com/Sage/carbon/commit/0fe05fcfb6e43ce22682c9f91a93d480b7388849))
* **multi-select:** text value cleared when select is closed ([d65759a](https://github.com/Sage/carbon/commit/d65759ae3929dd61a29e449dbab2ac2e9e1fe738))

### [77.11.2](https://github.com/Sage/carbon/compare/v77.11.1...v77.11.2) (2021-07-13)


### Bug Fixes

* **flat-table-row:** reduce z-index value when onclick passed to row ([a7d1a10](https://github.com/Sage/carbon/commit/a7d1a105f2a254e83d0e8a3456292965d5cdcbfd))

### [77.11.1](https://github.com/Sage/carbon/compare/v77.11.0...v77.11.1) (2021-07-13)


### Bug Fixes

* **radio-button, checkable-input:** fix invalid values in ARIA attributes ([284b578](https://github.com/Sage/carbon/commit/284b578619907016791452bfee4850dfaa454fd1))

## [77.11.0](https://github.com/Sage/carbon/compare/v77.10.1...v77.11.0) (2021-07-12)


### Features

* **button:** add target and rel props ([e12e9da](https://github.com/Sage/carbon/commit/e12e9daa4a7b63941d577299324c71f64fd1788e)), closes [#4231](https://github.com/Sage/carbon/issues/4231)

### [77.10.1](https://github.com/Sage/carbon/compare/v77.10.0...v77.10.1) (2021-07-12)


### Bug Fixes

* **input:** remove background on input when required ([f4d3642](https://github.com/Sage/carbon/commit/f4d36422c696c43f5aab1fa834dcbe9223c4014c))

## [77.10.0](https://github.com/Sage/carbon/compare/v77.9.0...v77.10.0) (2021-07-12)


### Features

* **carbon-provider:** add carbon-provider component (contains default theme and global style) ([04d3ec2](https://github.com/Sage/carbon/commit/04d3ec20038c3c53dd43550d6868efbcc8c5268f))

## [77.9.0](https://github.com/Sage/carbon/compare/v77.8.1...v77.9.0) (2021-07-09)


### Features

* **typography:** add support for white-space styling and truncation ([bb9316f](https://github.com/Sage/carbon/commit/bb9316fec25010833e7eea9b45cbe1c675a25c04)), closes [#4122](https://github.com/Sage/carbon/issues/4122)

### [77.8.1](https://github.com/Sage/carbon/compare/v77.8.0...v77.8.1) (2021-07-09)


### Bug Fixes

* **menu:** focus search using arrow keys ([d590812](https://github.com/Sage/carbon/commit/d590812972185e4302a7c0f6f4b3f04a4654251a))

## [77.8.0](https://github.com/Sage/carbon/compare/v77.7.4...v77.8.0) (2021-07-09)


### Features

* **flat-table:** add new extra-large size ([49ffb8f](https://github.com/Sage/carbon/commit/49ffb8f68ad13a3a53ec826a3386efd40c83bf4a))
* **icon:** add extraSmall option to bgSize prop ([c5d1ed5](https://github.com/Sage/carbon/commit/c5d1ed5ac6c0bd81e6c6d1a885039c109f242770))

### [77.7.4](https://github.com/Sage/carbon/compare/v77.7.3...v77.7.4) (2021-07-08)


### Bug Fixes

* **button-toggle:** fix hover styling on disabled state ([9133223](https://github.com/Sage/carbon/commit/9133223df176e9c6ee1cd7f12e5003493a752664))

### [77.7.3](https://github.com/Sage/carbon/compare/v77.7.2...v77.7.3) (2021-07-08)


### Bug Fixes

* **flat-table:** fix incorrect row outline in safari ([343a179](https://github.com/Sage/carbon/commit/343a1790e1ac616bcf0c2e0d09d3a0ef1964f40e))

### [77.7.2](https://github.com/Sage/carbon/compare/v77.7.1...v77.7.2) (2021-07-08)


### Bug Fixes

* **numeral-date:** update size prop type to have correct oneOf syntax ([be912c4](https://github.com/Sage/carbon/commit/be912c409873d985755c86363b5d6f3daa86f45d))

### [77.7.1](https://github.com/Sage/carbon/compare/v77.7.0...v77.7.1) (2021-07-08)


### Bug Fixes

* **flat-table:** scrolling content in table header ([6de6e67](https://github.com/Sage/carbon/commit/6de6e67857a7c97d1da87b59efdff0d99353b850))

## [77.7.0](https://github.com/Sage/carbon/compare/v77.6.4...v77.7.0) (2021-07-07)


### Features

* **button-toggle:** enhance button toggle visuals ([98d32c6](https://github.com/Sage/carbon/commit/98d32c69ca79ff20e4933b8f4626a5616f62c2c5))

### [77.6.4](https://github.com/Sage/carbon/compare/v77.6.3...v77.6.4) (2021-07-07)


### Bug Fixes

* **note:** ensure date aligns when no edited status ([f3c6dbe](https://github.com/Sage/carbon/commit/f3c6dbef6aa5b1e09478610e28a8e96b4ed14683))

### [77.6.3](https://github.com/Sage/carbon/compare/v77.6.2...v77.6.3) (2021-07-07)


### Bug Fixes

* **note:** removes required constraint from name prop type ([f1ec59c](https://github.com/Sage/carbon/commit/f1ec59c1c4a2b79d2c42266d61fbd15456cd7879))

### [77.6.2](https://github.com/Sage/carbon/compare/v77.6.1...v77.6.2) (2021-07-07)


### Bug Fixes

* **flat-table-row:** add support for setting tabindex on subrows with onclick handler passed ([aebcfc6](https://github.com/Sage/carbon/commit/aebcfc643eeada4518999d5c2cae8835b76809f6)), closes [#4214](https://github.com/Sage/carbon/issues/4214)

### [77.6.1](https://github.com/Sage/carbon/compare/v77.6.0...v77.6.1) (2021-07-06)


### Bug Fixes

* **date:** provide proper focus outline color ([0591951](https://github.com/Sage/carbon/commit/0591951da80a4b797f91e18d6f49d09c9b1033df))

## [77.6.0](https://github.com/Sage/carbon/compare/v77.5.0...v77.6.0) (2021-07-06)


### Features

* **tabs:** add tabsHeaderWidth prop ([b76b8a7](https://github.com/Sage/carbon/commit/b76b8a746ec1c0233ce21c62f93ebb12676468a6)), closes [#4024](https://github.com/Sage/carbon/issues/4024)

## [77.5.0](https://github.com/Sage/carbon/compare/v77.4.0...v77.5.0) (2021-07-06)


### Features

* **switch:** change hover behaviour ([fcf2f31](https://github.com/Sage/carbon/commit/fcf2f31f77c111a10f9de2805e5211dea0752e05))

## [77.4.0](https://github.com/Sage/carbon/compare/v77.3.5...v77.4.0) (2021-07-05)


### Features

* **pod:** add height prop support ([2ed2535](https://github.com/Sage/carbon/commit/2ed25352d14f2d4cc4c972b6bde49ee19f2be007))

### [77.3.5](https://github.com/Sage/carbon/compare/v77.3.4...v77.3.5) (2021-07-01)


### Bug Fixes

* **fieldset:** fix incorrect html structure in internal fieldset ([7e23e48](https://github.com/Sage/carbon/commit/7e23e4814f83114995d30371c96640bce30667d2))

### [77.3.4](https://github.com/Sage/carbon/compare/v77.3.3...v77.3.4) (2021-06-30)


### Bug Fixes

* **filterable-select:** remove call to set open state of select list on textbox blur ([ae1d406](https://github.com/Sage/carbon/commit/ae1d406c724ef2da9f46c4275997fb8981cb2839))
* **multi-select:** remove call to set open state of select list on textbox blur ([07f6b46](https://github.com/Sage/carbon/commit/07f6b4632281a180c7441817f262ce56bac2b6e7))
* **simple-select:** remove call to set open state of select list on textbox blur ([c814c78](https://github.com/Sage/carbon/commit/c814c7834f296798b76d37190b5918b7e728da8d))
* **tab-title:** remove call to stoppropagation onclick of tab title ([7a19c7a](https://github.com/Sage/carbon/commit/7a19c7a81e899e934494ab424379bb3558cbd277))

### [77.3.3](https://github.com/Sage/carbon/compare/v77.3.2...v77.3.3) (2021-06-29)


### Bug Fixes

* **button-toggle-group:** allow empty and false children ([5621624](https://github.com/Sage/carbon/commit/56216243f2bc30e583b24733bda3e821022e078a))

### [77.3.2](https://github.com/Sage/carbon/compare/v77.3.1...v77.3.2) (2021-06-29)


### Bug Fixes

* **flat-table-row-header:** fix pl and px props not being applied ([58a8291](https://github.com/Sage/carbon/commit/58a82910f9fa5b3243baed2df39ca57c1c3c99c4))

### [77.3.1](https://github.com/Sage/carbon/compare/v77.3.0...v77.3.1) (2021-06-29)


### Bug Fixes

* **flat-table:** incorrect bottom border color in transparent headers ([8ec5262](https://github.com/Sage/carbon/commit/8ec52626f1176e510101eebd8643d721a6de2d73))

## [77.3.0](https://github.com/Sage/carbon/compare/v77.2.2...v77.3.0) (2021-06-29)


### Features

* **action-popover:** add horizontalAlignment prop ([9b827d8](https://github.com/Sage/carbon/commit/9b827d85a03802a623b4afc63f9c8720314e7a01))

### [77.2.2](https://github.com/Sage/carbon/compare/v77.2.1...v77.2.2) (2021-06-24)


### Bug Fixes

* **flat-table:** fix styled-system pl support ([c74748f](https://github.com/Sage/carbon/commit/c74748fa748d9d4aa8615f45c3909bc172dc743c)), closes [#4145](https://github.com/Sage/carbon/issues/4145)

### [77.2.1](https://github.com/Sage/carbon/compare/v77.2.0...v77.2.1) (2021-06-23)


### Bug Fixes

* **menu-item:** stop hover css applying to span ([f336f4f](https://github.com/Sage/carbon/commit/f336f4fcb13e61453841214c829fa5c730b403f7)), closes [#4178](https://github.com/Sage/carbon/issues/4178)

## [77.2.0](https://github.com/Sage/carbon/compare/v77.1.4...v77.2.0) (2021-06-22)


### Features

* **flat-table:** add alternative header background color ([88271cd](https://github.com/Sage/carbon/commit/88271cdf32a2e9c6d1fb6ecb8abe4d7bdd04db04))
* **flat-table:** add horizontal border color control ([a18d043](https://github.com/Sage/carbon/commit/a18d043e725e807a9668c4388e0dacd680490492))
* **flat-table:** add horizontal border size control ([d131634](https://github.com/Sage/carbon/commit/d131634900b75196f6e9d16596badfbd25112abe))
* **flat-table:** add row background color prop ([c275359](https://github.com/Sage/carbon/commit/c275359c9afbba720353dd74b4487e09168405f0))
* **flat-table:** add toColor util to bgColor prop ([db9e495](https://github.com/Sage/carbon/commit/db9e4959d1045a4692c488be8fcedd518b010d23))
* **flat-table:** add vertical border color control ([0a25e76](https://github.com/Sage/carbon/commit/0a25e765849b2d7ee9bcd004c6d927bb8ba34c7b))
* **flat-table:** add vertical border size control ([d10a217](https://github.com/Sage/carbon/commit/d10a2171ca845e40d6682f6696d4c8abe18855c6))


### Bug Fixes

* **flat-table:** incorrect border color in multiline headers ([bf93744](https://github.com/Sage/carbon/commit/bf93744cc832caa3cec5deb4cc8c3fea3ae9d2ae))

### [77.1.4](https://github.com/Sage/carbon/compare/v77.1.3...v77.1.4) (2021-06-22)


### Bug Fixes

* **search:** update onkeydown and onclick type definitions to not use synthetic event ([2082fac](https://github.com/Sage/carbon/commit/2082fac6b5360aad6d2a762dace113af59ffd2ee))
* **simple-color-picker, simple-color:** update onkeydown and onmousedown to not use synthetic event ([e20752c](https://github.com/Sage/carbon/commit/e20752c46c31c6dc80707d380c4126fca7d0f967))

### [77.1.3](https://github.com/Sage/carbon/compare/v77.1.2...v77.1.3) (2021-06-21)


### Bug Fixes

* **card:** extend styled system margin props in ts interface ([d44372a](https://github.com/Sage/carbon/commit/d44372aafdc410041ae27bcd84fa4996a0c3f064))

### [77.1.2](https://github.com/Sage/carbon/compare/v77.1.1...v77.1.2) (2021-06-21)


### Bug Fixes

* **loader:** destructure props and only spread rest props on root element ([aeb92f6](https://github.com/Sage/carbon/commit/aeb92f64f79a7d75e8779320ffb383b08f9ac2f9))

### [77.1.1](https://github.com/Sage/carbon/compare/v77.1.0...v77.1.1) (2021-06-21)


### Bug Fixes

* **pod:** update incorrect type definition from padding to size ([52f2246](https://github.com/Sage/carbon/commit/52f2246a8ba5d99ce757647e0be3e9cf4bbbf013))

## [77.1.0](https://github.com/Sage/carbon/compare/v77.0.1...v77.1.0) (2021-06-18)


### Features

* **confirm:** more flexible button usage ([f76a088](https://github.com/Sage/carbon/commit/f76a088c126bafab4881a1f39346e685e1e95f21))

### [77.0.1](https://github.com/Sage/carbon/compare/v77.0.0...v77.0.1) (2021-06-17)


### Bug Fixes

* **select-list:** add data role to internal loader component ([c9bc71a](https://github.com/Sage/carbon/commit/c9bc71af3cbd8f86d30df0857f341a61f4acf9d8))

## [77.0.0](https://github.com/Sage/carbon/compare/v76.5.6...v77.0.0) (2021-06-16)


### ⚠ BREAKING CHANGES

* **decimal:** The decimal component no longer uses `i18n-js` for decimal formatting,
you should use the `locale` prop instead.
* **decimal:** `formatDecimal` no longer supports the `round` option first introduced in v73.0.0

closes FE-3500
closes FE-4148

### Features

* **decimal:** add locale support ([7cec047](https://github.com/Sage/carbon/commit/7cec0471db24e5b0d3c6150be6ea71038e14ecae)), closes [#3559](https://github.com/Sage/carbon/issues/3559)

### [76.5.6](https://github.com/Sage/carbon/compare/v76.5.5...v76.5.6) (2021-06-14)


### Bug Fixes

* **accordion:** fix unit test coverage ([00e8e26](https://github.com/Sage/carbon/commit/00e8e26a29f18d2b5048cb7d943ba578e9b5e8dc))
* **accordion:** resize accordion when children resize ([f27ebc7](https://github.com/Sage/carbon/commit/f27ebc76f9f525ac6ba596f7abe9ccd048fba7fa))

### [76.5.5](https://github.com/Sage/carbon/compare/v76.5.4...v76.5.5) (2021-06-14)


### Bug Fixes

* **search:** remove the onClick prop from the input ([b767581](https://github.com/Sage/carbon/commit/b7675817c320770c8dc2785770106cf0bebfcf7a))

### [76.5.4](https://github.com/Sage/carbon/compare/v76.5.3...v76.5.4) (2021-06-11)


### Bug Fixes

* **icon:** implement color values from theme correctly ([9a60fb9](https://github.com/Sage/carbon/commit/9a60fb9f8f80f028872cfef9fbca86c87f29f5b8))

### [76.5.3](https://github.com/Sage/carbon/compare/v76.5.2...v76.5.3) (2021-06-11)


### Bug Fixes

* **radio-button:** allow ref forwarding to allow access to the underlying input ([e241985](https://github.com/Sage/carbon/commit/e2419850832c7be7337e5156c5716cbfe199c199))

### [76.5.2](https://github.com/Sage/carbon/compare/v76.5.1...v76.5.2) (2021-06-10)


### Bug Fixes

* **note:** add decorator to content to ensure correct html applied ([8a31825](https://github.com/Sage/carbon/commit/8a31825b2e85229a111699cc8964235a874bc995)), closes [#4137](https://github.com/Sage/carbon/issues/4137)

### [76.5.1](https://github.com/Sage/carbon/compare/v76.5.0...v76.5.1) (2021-06-09)


### Bug Fixes

* **button:** update forwardref prop type to allow function or object ([158b413](https://github.com/Sage/carbon/commit/158b413ee20fe57972a9d3e2d5392126cc65e5de))
* **row:** add support for none gutter value ([fc4df58](https://github.com/Sage/carbon/commit/fc4df58cac73cceef54fafb59afaed5e577ea026))

## [76.5.0](https://github.com/Sage/carbon/compare/v76.4.0...v76.5.0) (2021-06-09)


### Features

* **numeral-date:** add size prop ([582c512](https://github.com/Sage/carbon/commit/582c51284f23563b4007fec65e3722f5406c156e))

## [76.4.0](https://github.com/Sage/carbon/compare/v76.3.2...v76.4.0) (2021-06-08)


### Features

* **anchor-navigation:** add stickynavigation prop structure warning ([0e3b4be](https://github.com/Sage/carbon/commit/0e3b4be459a8b8e2b7219305e685fdd101c15383))

### [76.3.2](https://github.com/Sage/carbon/compare/v76.3.1...v76.3.2) (2021-06-08)


### Bug Fixes

* **icon:** hover only for interactive icons ([a9cd54f](https://github.com/Sage/carbon/commit/a9cd54fe57bc975e01d28960f7e4f82c7b73ea75))

### [76.3.1](https://github.com/Sage/carbon/compare/v76.3.0...v76.3.1) (2021-06-08)


### Bug Fixes

* **step-sequence-item:** update theme colours for completed steps ([a05449f](https://github.com/Sage/carbon/commit/a05449f072b35a38847e0a2eced4a38da98eab52)), closes [#4117](https://github.com/Sage/carbon/issues/4117)

## [76.3.0](https://github.com/Sage/carbon/compare/v76.2.0...v76.3.0) (2021-06-08)


### Features

* **button-toggle-group:** restrict children to button-toggle only ([c1a51b0](https://github.com/Sage/carbon/commit/c1a51b0aeab65baae0edce89286c25ea6e7ec466))

## [76.2.0](https://github.com/Sage/carbon/compare/v76.1.5...v76.2.0) (2021-06-07)


### Features

* **icon:** 4 new icons, undo, sage coin and currency envelopes ([a29083b](https://github.com/Sage/carbon/commit/a29083b378e0ce80ac2e75d108c10881a298c6ea))

### [76.1.5](https://github.com/Sage/carbon/compare/v76.1.4...v76.1.5) (2021-06-07)


### Bug Fixes

* **definition-list:** fix conditional rendering logic ([20aa302](https://github.com/Sage/carbon/commit/20aa3024a506b6c64d56f9e08a8fb906e8a804ab)), closes [#4013](https://github.com/Sage/carbon/issues/4013)

### [76.1.4](https://github.com/Sage/carbon/compare/v76.1.3...v76.1.4) (2021-06-04)


### Bug Fixes

* **accordion:** fix incorrect content height ([3a2b425](https://github.com/Sage/carbon/commit/3a2b425d67af59cea45de7f8037de5549b655d50))

### [76.1.3](https://github.com/Sage/carbon/compare/v76.1.2...v76.1.3) (2021-06-02)


### Bug Fixes

* **link:** change wrapper from div to span ([0aa3a99](https://github.com/Sage/carbon/commit/0aa3a99c89c92260c433d576364552380a40aee5))

### [76.1.2](https://github.com/Sage/carbon/compare/v76.1.1...v76.1.2) (2021-06-01)


### Bug Fixes

* **tooltip:** fix arrow misalignment in left positioned tooltip ([b317b02](https://github.com/Sage/carbon/commit/b317b029bdcf2c15d263c9cd53f45c2119baac12))

### [76.1.1](https://github.com/Sage/carbon/compare/v76.1.0...v76.1.1) (2021-06-01)


### Bug Fixes

* incorrect typescript onFocus and onBlur definitions ([4008096](https://github.com/Sage/carbon/commit/40080961bff7627d440b9af02b10bafb3e1eba02))

## [76.1.0](https://github.com/Sage/carbon/compare/v76.0.1...v76.1.0) (2021-06-01)


### Features

* **flat-table-checkbox:** surface onclick prop and remove internal onclick from  composed checkbox ([8408258](https://github.com/Sage/carbon/commit/84082583f4fbcb6297784a7b751c29e57a1ab72d))

### [76.0.1](https://github.com/Sage/carbon/compare/v76.0.0...v76.0.1) (2021-05-31)


### Bug Fixes

* **step-sequence:** fix incorrect item alignment ([0b9ad66](https://github.com/Sage/carbon/commit/0b9ad661a76ac0c2fea1ca8f4e1435f17bfb87a0))

## [76.0.0](https://github.com/Sage/carbon/compare/v75.2.6...v76.0.0) (2021-05-28)


### ⚠ BREAKING CHANGES

* **checkbox:** stop padding support for the checkbox component
* **navigation-bar:** Navigation Bar no longer extends Box
Fixes FE-3560
* **textbox:** Textbox no longer supports styled-system padding props
* **multi-action-button:** Removed several `get` functions as part of the refactor which could have been
accessed in a consuming application
* **flat-table:** FlatTable uses margin. FlatTableCell FlatTableHeader FlatTableRowHeader use padding
* **tile:** `pixelWidth` prop has been removed
* **show-edit-pod:** `padding` prop on ShowEditPod component has been renamed to `size`.
To help with migration use `rename-prop` codemod:
https://github.com/Sage/carbon-codemod/tree/master/transforms/rename-prop
* **pod:** `padding` prop on Pod component has been renamed to `size`.
To help with migration use `rename-prop` codemod:
https://github.com/Sage/carbon-codemod/tree/master/transforms/rename-prop
* **form-summary:** FormSummary has been moved to __internal__ folder, to fix issues you will
have to update your imports
* **scrollable-block:** ScrollableBlock no longer extends Box
* **menu-item:** MenuItem no longer extends Box
* **menu:** Menu component no longer extends Box
* **hr:** Use margin only. Padding has been removed.
* **tile-footer:** `margin` props no longer supported in `TileFooter`

### Features

* **form:** add padding and margin with styled-system ([c3e0837](https://github.com/Sage/carbon/commit/c3e0837a4b1a0eba8651491670ebea554b87bd37))
* **multi-action-button:** surface styled system margin props ([869f714](https://github.com/Sage/carbon/commit/869f714f3ae6dcde99446a017855a6a1ef05a214))
* **pod:** add styled-system margin prop support ([9b4dc77](https://github.com/Sage/carbon/commit/9b4dc77227ae6e4dd2daf4c00ca3e40014a206ca))
* **show-edit-pod:** add styled-system margin prop support ([3e0c531](https://github.com/Sage/carbon/commit/3e0c531cc9bb57baa8f8046721a607dc6de7d56c))
* **textbox:** update styled-system props ([1dee3e8](https://github.com/Sage/carbon/commit/1dee3e8a203ffbd40c27984ec049257dcf6329b3))
* **tile:** add support for styled system width ([3d09671](https://github.com/Sage/carbon/commit/3d09671bf130b1dffc97c83e09dbd57c7054b41a))


### Bug Fixes

* **navigation-bar:** allow padding props to override media query styles ([29ba9f3](https://github.com/Sage/carbon/commit/29ba9f3264d9140e4c4fc6d60f90976b7111f575))


### Miscellaneous Chores

* **form-summary:** move files to __internal__ folder ([960f2c6](https://github.com/Sage/carbon/commit/960f2c62afb7ca3a806dca24cdade1799dae6b58))


### Code Refactoring

* **checkbox:** update styled system implementation ([59fbf2b](https://github.com/Sage/carbon/commit/59fbf2bf50d97711138563d4cbc84cd43a6f957d))
* **flat-table:** update styled system implementation ([140a287](https://github.com/Sage/carbon/commit/140a2874dee6bb05c2e21ff0c6e91c6bdf6729ff))
* **hr:** update styled system implementation ([9549bc3](https://github.com/Sage/carbon/commit/9549bc32a8cfa9da0155c7f2d3eabbce6b667355))
* **menu:** replace box extension with flexbox and layout props ([f6294fd](https://github.com/Sage/carbon/commit/f6294fdf534999cf99734dc1d806c710a5edefb8))
* **menu-item:** replace box extension with flexbox and layout props ([c61d4a0](https://github.com/Sage/carbon/commit/c61d4a0fc4d6ed719f6149428b98c127c84fee50))
* **multi-action-button:** convert to functional component ([177d66e](https://github.com/Sage/carbon/commit/177d66ea1bb860a02a23f53c9d5fdc03a1511012))
* **navigation-bar:** replace box extension with flexbox and padding props ([94327c5](https://github.com/Sage/carbon/commit/94327c5952b5325c945a9411ac9ee0ea8b41b51b))
* **scrollable-block:** replace box extension with composition ([5f07251](https://github.com/Sage/carbon/commit/5f072516a1914f1ee990dab11893f5f9d6680672))
* **tile-footer:** remove support for styled system margin props ([025697a](https://github.com/Sage/carbon/commit/025697a7398b03f5c8e385816f8c8ebb2186adfb))

### [75.2.6](https://github.com/Sage/carbon/compare/v75.2.5...v75.2.6) (2021-05-28)


### Bug Fixes

* **tile-select:** incorrect ts type definitions ([c40625c](https://github.com/Sage/carbon/commit/c40625c03ca49e20fd368e258e90ffab99bbcf8a))

### [75.2.5](https://github.com/Sage/carbon/compare/v75.2.4...v75.2.5) (2021-05-28)


### Bug Fixes

* **simple-color-picker:** add guard to prevent calling onBlur when undefined ([58d954f](https://github.com/Sage/carbon/commit/58d954f8890a38991716f95b0b938f583db48129)), closes [#4062](https://github.com/Sage/carbon/issues/4062)

### [75.2.4](https://github.com/Sage/carbon/compare/v75.2.3...v75.2.4) (2021-05-28)


### Bug Fixes

* **decimal:** fix not working inputs in stories ([dde6934](https://github.com/Sage/carbon/commit/dde6934f713a29836e7563aee0ec06341e0c64f8))

### [75.2.3](https://github.com/Sage/carbon/compare/v75.2.2...v75.2.3) (2021-05-27)


### Bug Fixes

* **tab:** make customLayout prop optional in TS definition ([a97721b](https://github.com/Sage/carbon/commit/a97721bf84b2dcd97c465661a18f41e89c8bccc1)), closes [#4025](https://github.com/Sage/carbon/issues/4025)
* **tabs:** add missing colon to tab-title styles ([9541462](https://github.com/Sage/carbon/commit/9541462b2c90c62e75851fcf52a3cac3a46cd0f1)), closes [#4048](https://github.com/Sage/carbon/issues/4048)

### [75.2.2](https://github.com/Sage/carbon/compare/v75.2.1...v75.2.2) (2021-05-27)


### Bug Fixes

* **search:** update vertical alignment of the close input icon ([e53cd6b](https://github.com/Sage/carbon/commit/e53cd6b5616363ebeb0d1c5b5939c2b999c32c9e))

### [75.2.1](https://github.com/Sage/carbon/compare/v75.2.0...v75.2.1) (2021-05-27)


### Bug Fixes

* **date-range:** fix incorrect date picker positioning ([6fb85c6](https://github.com/Sage/carbon/commit/6fb85c6b0a565b58223698535092422ec7dcde21))

## [75.2.0](https://github.com/Sage/carbon/compare/v75.1.0...v75.2.0) (2021-05-27)


### Features

* **portrait:** adds prop to specify fallback icon ([3b78281](https://github.com/Sage/carbon/commit/3b782818bc9db6de3813bb4ef4345e48ac96f42d))

## [75.1.0](https://github.com/Sage/carbon/compare/v75.0.1...v75.1.0) (2021-05-27)


### Features

* **duelling-picklist:** add context to support focusing elements after an item or group moves ([984d42b](https://github.com/Sage/carbon/commit/984d42b087bd4f04f8652b625a08067f28ffc117))


### Bug Fixes

* **duelling-picklist:** add error if children do not have 2 picklist ([1ccb1ab](https://github.com/Sage/carbon/commit/1ccb1abb1793ef58472e5f95a657c5802ac62b4b))

### [75.0.1](https://github.com/Sage/carbon/compare/v75.0.0...v75.0.1) (2021-05-27)


### Bug Fixes

* **date-range:** fix react-testing-library errors ([1102017](https://github.com/Sage/carbon/commit/11020174cdbc341219d55486458335908f60ea4c))

## [75.0.0](https://github.com/Sage/carbon/compare/v74.5.1...v75.0.0) (2021-05-27)


### ⚠ BREAKING CHANGES

* **tabs:** Internal support for updating window location has been removed from the `Tabs`
component, the `setLocation` prop has also been removed as it serves no purpose beyond serving as a
guard for this functionality. Consumers who wish to have this functionality should utilise the
`onTabChange` and `selectedTabId` props with whatever `history` implementation they want to.

### Features

* **tabs:** remove internal support for history and url manipulation ([bd76906](https://github.com/Sage/carbon/commit/bd7690686d17911a8417f927f9797ed4a5231d50)), closes [#3520](https://github.com/Sage/carbon/issues/3520)

### [74.5.1](https://github.com/Sage/carbon/compare/v74.5.0...v74.5.1) (2021-05-21)


### Bug Fixes

* **sidebar:** make close button css more specific ([bb7adaf](https://github.com/Sage/carbon/commit/bb7adaf721a4b457328ae6757962fe9ed5766b64)), closes [#3943](https://github.com/Sage/carbon/issues/3943)

## [74.5.0](https://github.com/Sage/carbon/compare/v74.4.0...v74.5.0) (2021-05-21)


### Features

* **drawer:** add sticky footer option ([42de058](https://github.com/Sage/carbon/commit/42de058c7438c090b2af3f900aba5a6efdb95fe5))
* **drawer:** add sticky header option ([6ffd744](https://github.com/Sage/carbon/commit/6ffd7449ace605b20233f3c8c246f4a777414904))
* **sticky-footer:** add new internal sticky footer component ([b3383a7](https://github.com/Sage/carbon/commit/b3383a706f44b7e253149a9613e94aef95f52943))

## [74.4.0](https://github.com/Sage/carbon/compare/v74.3.1...v74.4.0) (2021-05-21)


### Features

* **grouped-character:** add styled-system margin support ([04c5055](https://github.com/Sage/carbon/commit/04c50556bf03120e284459ae11a808a37442627f))

### [74.3.1](https://github.com/Sage/carbon/compare/v74.3.0...v74.3.1) (2021-05-19)


### Bug Fixes

* **checkable-inputs:** fix name prop forwarding ([0c98eab](https://github.com/Sage/carbon/commit/0c98eab2091bd656b5a393cbf1b3694c3a7dd503))

## [74.3.0](https://github.com/Sage/carbon/compare/v74.2.0...v74.3.0) (2021-05-19)


### Features

* **accordion-group:** allow empty children ([d925be9](https://github.com/Sage/carbon/commit/d925be9d1080e03b17174361e661fe06cabda0d6))
* **draggable-container:** allow empty children ([6803776](https://github.com/Sage/carbon/commit/6803776c38f4aef73bf6f05c786327cae0647f4a))
* **grid:** allow empty children ([c0ad597](https://github.com/Sage/carbon/commit/c0ad5978fd0efc55064b27667c97446ff5e43782))
* **simple-color-picker:** allow empty children ([58da22c](https://github.com/Sage/carbon/commit/58da22c4d64975e89e5b8eac80eb4b55513ae277))

## [74.2.0](https://github.com/Sage/carbon/compare/v74.1.2...v74.2.0) (2021-05-19)


### Features

* **decimal:** add styled-system margin props ([77dcd95](https://github.com/Sage/carbon/commit/77dcd95b7877b558d63fc5811a547c57fa01d3be))

### [74.1.2](https://github.com/Sage/carbon/compare/v74.1.1...v74.1.2) (2021-05-18)


### Bug Fixes

* **pill:** fix text wrap if there are multiple words ([a9333ff](https://github.com/Sage/carbon/commit/a9333fffb7040a84ccabec6e524c1845085561ed))

### [74.1.1](https://github.com/Sage/carbon/compare/v74.1.0...v74.1.1) (2021-05-14)


### Bug Fixes

* **date-range:** fix incorrect gaps between date fields ([70507ba](https://github.com/Sage/carbon/commit/70507ba053215e541f32ed9918709ab63643e110))

## [74.1.0](https://github.com/Sage/carbon/compare/v74.0.0...v74.1.0) (2021-05-14)


### Features

* **icon:** 7 new icons, carets directions and larger size ([beb20ec](https://github.com/Sage/carbon/commit/beb20ec3a1cc8b464c6624a3fb0502a38485e6ad))

## [74.0.0](https://github.com/Sage/carbon/compare/v73.6.1...v74.0.0) (2021-05-14)


### ⚠ BREAKING CHANGES

* **button:** Fixes FE-2759
* **action-popover:** Fixes FE-2757
* **anchor-navigation:** Fixes FE-2758
* **accordion:** Fixes FE-2756
* **textbox:** Fixes FE-2755
* **radio-button-group:** Fixes FE-2754
* **label:** Fixes FE-2753
* **input:** Fixes FE-2752
* **fieldset:** Fixes FE-2750
* **form-field:** Fixes FE-2751

### Code Refactoring

* **accordion:** remove style override props ([cd59de6](https://github.com/Sage/carbon/commit/cd59de6c2a01752470f07d0b67700878eef62159))
* **action-popover:** remove style override props ([b373382](https://github.com/Sage/carbon/commit/b37338274758ea00cbbc6f48c3bf7af8069ac03e))
* **anchor-navigation:** remove style override props ([1d4aeb2](https://github.com/Sage/carbon/commit/1d4aeb2e49ebf828e5b4ae7d5bfce4a48e5deb22))
* **button:** remove style override props ([b7cb8e2](https://github.com/Sage/carbon/commit/b7cb8e26af944cb979b7b9c3e2211be084beec5c))
* **fieldset:** remove style override props ([cedd350](https://github.com/Sage/carbon/commit/cedd35047f55b558c5149990a4433696677e1e27))
* **form-field:** remove style override props ([3bcc36e](https://github.com/Sage/carbon/commit/3bcc36e80239e040fc1dd5822eea9fe02c2b2c40))
* **input:** remove style override props ([00c222b](https://github.com/Sage/carbon/commit/00c222bb00c603f5d2b77b44efb9871c5eda164c))
* **label:** remove style override props ([6397187](https://github.com/Sage/carbon/commit/6397187f9ac2f1882e19ae3316fbac2eda636d8f))
* **radio-button-group:** remove style override props ([5ba73b6](https://github.com/Sage/carbon/commit/5ba73b6d48bee44fc6bd8e25735d0632eb37ab41))
* **textbox:** remove style override props ([38c827b](https://github.com/Sage/carbon/commit/38c827bfdd347c7979dc12642c639469df27c9c0))

### [73.6.1](https://github.com/Sage/carbon/compare/v73.6.0...v73.6.1) (2021-05-13)


### Bug Fixes

* **portrait:** fix portrait tooltip error ([3631635](https://github.com/Sage/carbon/commit/3631635463e7e2000c90294ed27a4ca4aed38bc0))

## [73.6.0](https://github.com/Sage/carbon/compare/v73.5.0...v73.6.0) (2021-05-13)


### Features

* **menu-item:** add max width prop for truncation ([d9e58da](https://github.com/Sage/carbon/commit/d9e58da0cf0f3877d62d248c532592b28a62c3ff))

## [73.5.0](https://github.com/Sage/carbon/compare/v73.4.0...v73.5.0) (2021-05-13)


### Features

* **textarea:** add styled-system margin prop support ([d5825a5](https://github.com/Sage/carbon/commit/d5825a5cecbd1edcecc152a4d8a9f645c506eeaf))

## [73.4.0](https://github.com/Sage/carbon/compare/v73.3.0...v73.4.0) (2021-05-13)


### Features

* **date:** add styled-system margin support ([9ab0c56](https://github.com/Sage/carbon/commit/9ab0c569e0f838362546be8880e7373dd1a4fa3e))

## [73.3.0](https://github.com/Sage/carbon/compare/v73.2.0...v73.3.0) (2021-05-13)


### Features

* **dialog,dialog-full-screen:** add help prop ([79b5d41](https://github.com/Sage/carbon/commit/79b5d412ebf6d5bd59cb42a9a02c2367abd44aca))


### Bug Fixes

* **dialog:** title wrapping ([e259aed](https://github.com/Sage/carbon/commit/e259aedf4ce8716a41c04c8ecfabfa23929f507c))

## [73.2.0](https://github.com/Sage/carbon/compare/v73.1.0...v73.2.0) (2021-05-12)


### Features

* **button-toggle-group:** add styled-system props ([510a643](https://github.com/Sage/carbon/commit/510a64392403d0e4fa6706465478bcd3bbde21ac))

## [73.1.0](https://github.com/Sage/carbon/compare/v73.0.0...v73.1.0) (2021-05-12)


### Features

* **simple-color-picker:** add styled system margin ([27862c5](https://github.com/Sage/carbon/commit/27862c50d55135c2dd824ce73d27b4fa83752611))

## [73.0.0](https://github.com/Sage/carbon/compare/v72.0.0...v73.0.0) (2021-05-11)


### ⚠ BREAKING CHANGES

* **decimal:** Precision prop can no longer be changed on the fly. Your app will need to refresh in order for the user to see the new precision value.

### Code Refactoring

* **decimal:** allow the user to input any value ([1a2307a](https://github.com/Sage/carbon/commit/1a2307a0046384fe79566338341a10f723e403cc))

## [72.0.0](https://github.com/Sage/carbon/compare/v71.4.2...v72.0.0) (2021-05-11)


### ⚠ BREAKING CHANGES

* all TypeScript projects have to add @types/styled-system
and @types/styled-components as dev dependencies

### Features

* **validation-icon:** add ts type definitions ([15a9f81](https://github.com/Sage/carbon/commit/15a9f81a18b90581b9fa8a7f025db5dd44a652a1))
* add global style type definition file ([169a3f5](https://github.com/Sage/carbon/commit/169a3f5f414425c5c2aebad1eca7fbb96f0f9f60))
* add type definitions to mockmatchmedia util ([205a000](https://github.com/Sage/carbon/commit/205a0004de8ec1481f3fd44f8c00d1f3f373d834))
* **action-toolbar:** add ts type definitions ([0050574](https://github.com/Sage/carbon/commit/0050574c374dfef0072407b9a0cbac031729d55e))
* **alert:** add ts type definitions ([c35be8e](https://github.com/Sage/carbon/commit/c35be8e1f27f3fed095f8cff948330e2d69e2bed))
* **app-wrapper:** add ts type definitions ([dbbcc30](https://github.com/Sage/carbon/commit/dbbcc30dbe8ccc4eb0d5f80d1b906caa50f59b50)), closes [#3696](https://github.com/Sage/carbon/issues/3696)
* **button-toggle:** add ts type definitions ([f289949](https://github.com/Sage/carbon/commit/f2899498c17c274626bb4855e888615994a904cc))
* **button-toggle-group:** add ts type definitions ([1ca5da7](https://github.com/Sage/carbon/commit/1ca5da7e10ef7fb216fb403fef15d06ede5588f5))
* **card:** add ts type definitions ([fc6129b](https://github.com/Sage/carbon/commit/fc6129bdf671cb339522a948e282ee022da2e1fb))
* **carousel:** add ts type definitions ([7c5490a](https://github.com/Sage/carbon/commit/7c5490a9d8a51966fda8fd83fe6f26122f51c640))
* **checkable-input:** add type definitions ([16421e3](https://github.com/Sage/carbon/commit/16421e3e527a12c9700870a21efcc329573b18d9))
* **configurable-items:** add ts type definitions ([890aaa5](https://github.com/Sage/carbon/commit/890aaa55b7de487c86f1febb63c89dc663eaa340))
* **detail:** add ts type definitions ([ffc91d6](https://github.com/Sage/carbon/commit/ffc91d69da23cf57343025bb8d8e7f459ef1b09b))
* **dialog:** add ts type definitions ([e8b7192](https://github.com/Sage/carbon/commit/e8b7192188c91dc6fdd09bafb50408562dea0b7c))
* **dialog-full-screen:** add ts type definitions ([37ffe53](https://github.com/Sage/carbon/commit/37ffe53b2129d930f37a6a3fef87ee6c50dac56a)), closes [#3697](https://github.com/Sage/carbon/issues/3697)
* **duelling-picklist:** add picklist-group ts type definitions ([a08ca70](https://github.com/Sage/carbon/commit/a08ca704254a4547d5ae86dd8972d88af5df073f))
* **form-field:** add type definitions ([f6ba4f9](https://github.com/Sage/carbon/commit/f6ba4f97e876aa8678d358c9d8f56b76da35c910))
* **heading:** add ts type definitions ([9598cc3](https://github.com/Sage/carbon/commit/9598cc3409bbd844c11514408d28d4fe1e64ea1e)), closes [#3699](https://github.com/Sage/carbon/issues/3699)
* **icon-button:** add ts type definitions ([1c18a99](https://github.com/Sage/carbon/commit/1c18a99760804b4d33c35fb5090a08c18f4a2d0c))
* **inline-inpouts:** add ts type definitions ([bbd8fef](https://github.com/Sage/carbon/commit/bbd8fefa3941dd9565b515f1a0faabfce46de615))
* **loader:** add ts type definitions ([c5e0ada](https://github.com/Sage/carbon/commit/c5e0ada95883a97f4dfe0270a028c0a68d7fc8b6)), closes [#3700](https://github.com/Sage/carbon/issues/3700)
* **menu:** add scrollableblock type definitions ([348f91e](https://github.com/Sage/carbon/commit/348f91ee27752666368216479d877dd842556344))
* **message:** add ts type definitions ([12cdd01](https://github.com/Sage/carbon/commit/12cdd01b863cc6130855caec460f4805181bf723)), closes [#3701](https://github.com/Sage/carbon/issues/3701)
* **modal:** add ts type definitions ([108bec4](https://github.com/Sage/carbon/commit/108bec46f7f5161b3e9accb676af5487a1131d6d))
* **mount-in-app:** add ts type definitions ([2b4aacd](https://github.com/Sage/carbon/commit/2b4aacd57e6e77308f7b9bd0e913055c46754304))
* **multi-action-button:** add ts type definitions ([2598a7f](https://github.com/Sage/carbon/commit/2598a7f9d741edd9607390209540fc893a837fea))
* **pages:** add ts type definitions ([2a3f736](https://github.com/Sage/carbon/commit/2a3f736567ea3c0c40599f773e8d9b7c20c60904))
* **portal:** add ts type definitions ([c769de8](https://github.com/Sage/carbon/commit/c769de817a848d6d5f2166c349df45e4f32b71be))
* **preview:** add ts type definitions ([b653c65](https://github.com/Sage/carbon/commit/b653c653517f5bea94052481bafcd08be132d72b))
* **profile:** add ts type definitions ([74baa19](https://github.com/Sage/carbon/commit/74baa190894172a36c2a5b020475000872f1377d))
* **settings-row:** add ts type definitions ([85822c9](https://github.com/Sage/carbon/commit/85822c9321d18dc777c78731f0be1ce6bfd15ffd))
* **show-edit-pod:** add ts type definitions ([7bd13b2](https://github.com/Sage/carbon/commit/7bd13b2b7871bbf1f6133c725368e1483a6ef642))
* **sidebar:** add ts type definitions ([cc69fc1](https://github.com/Sage/carbon/commit/cc69fc14fc0f8ffd4f4dc0b1df1beb7952ce3688)), closes [#3702](https://github.com/Sage/carbon/issues/3702)
* **simple-select:** add select-textbox type definitions ([a100cc9](https://github.com/Sage/carbon/commit/a100cc9c36cc6da32348d5cc891d3924861fda36))
* **split-button:** add ts type definitions ([0598f16](https://github.com/Sage/carbon/commit/0598f16f541452afa70c7de459ab22cc410a740c))
* **step-sequence:** add ts type definitions ([29c40b2](https://github.com/Sage/carbon/commit/29c40b230235fa720188871bbe697fd9bf943400))
* add ts type definitions to theme config files ([b62b21a](https://github.com/Sage/carbon/commit/b62b21af624919aa0cd2b0d327b7f3d6bf9fff21)), closes [#3705](https://github.com/Sage/carbon/issues/3705)


### Bug Fixes

* **accordion:** incorrect ts type definitions ([fec618f](https://github.com/Sage/carbon/commit/fec618fc854d71e09c8fc907023fae7bbbf2f795))
* **action-popover:** incorrect ts type definitions ([7f520c2](https://github.com/Sage/carbon/commit/7f520c287bf01ca835a35563c17ed33f77e1cf5b))
* **advanced-color-picker:** incorrect ts type definitions ([4fbe849](https://github.com/Sage/carbon/commit/4fbe8492893f481f3b8f923ff0ef7535262a313c))
* **anchor-navigation:** incorrect ts type definitions ([fc68fdd](https://github.com/Sage/carbon/commit/fc68fdd619c9a7bdd767dcad485d8b15ad30eae0))
* **badge:** incorrect ts type definitions ([b3cdc6e](https://github.com/Sage/carbon/commit/b3cdc6e46eb12b1258f6737b1a3e686f5cd4292f))
* **batch-selection:** ts type definitions not properly exported ([7b59608](https://github.com/Sage/carbon/commit/7b59608f4858048d01c07b4b65ca87b07e73a36a))
* **box:** ts type definitions not properly exported ([b0dc5e6](https://github.com/Sage/carbon/commit/b0dc5e61b3482f3fd3c0d7e4d9ba26c3a58f05dd)), closes [#3733](https://github.com/Sage/carbon/issues/3733)
* **button:** incorrect ts margin type definitions ([1fa2e36](https://github.com/Sage/carbon/commit/1fa2e36952ccce4b53baebad73f9fe3ee21c520a)), closes [#3727](https://github.com/Sage/carbon/issues/3727)
* **checkbox-group:** incorrect children type in typescript ([cc480c5](https://github.com/Sage/carbon/commit/cc480c509b6daf95522ea5855502df0c54dca8cc))
* **confirm:** type definitions not exported ([befd66e](https://github.com/Sage/carbon/commit/befd66e8f817d4a29a991aecadffac7a8d007e2b)), closes [#3710](https://github.com/Sage/carbon/issues/3710) [#3809](https://github.com/Sage/carbon/issues/3809)
* **draggable:** incorrect ts type definitions ([e855976](https://github.com/Sage/carbon/commit/e85597664ac2ab74a22214f3d9ee58c3967da363))
* **drawer:** incorrect ts type definitions ([6e4ab56](https://github.com/Sage/carbon/commit/6e4ab56ced4e24f955a48b5c81f8c34b1f95aa6a)), closes [#3694](https://github.com/Sage/carbon/issues/3694)
* **flat-table:** missing ts type definitions ([088183e](https://github.com/Sage/carbon/commit/088183e3020514a76148ae3f3d213d08ffba4038))
* **form:** type definitions not properly exported ([01c07ed](https://github.com/Sage/carbon/commit/01c07ed8aea5d51fd1577c3a466d551ace99c6ef)), closes [#3690](https://github.com/Sage/carbon/issues/3690)
* **hr:** type definitions not properly exported ([9dce2b9](https://github.com/Sage/carbon/commit/9dce2b941c249794a7c560dab8aa881caabd0204)), closes [#3691](https://github.com/Sage/carbon/issues/3691)
* **link:** internallink export missing in type definitions ([37002c1](https://github.com/Sage/carbon/commit/37002c1574f84f5cc4346f53e370c8561cfa3f55))
* **number:** incorrect import of textbox type definitions ([984f9db](https://github.com/Sage/carbon/commit/984f9db4558d10f1ee6ab5272e11480f0fa28749))
* **pill:** ts type definitions not properly exported ([379efd3](https://github.com/Sage/carbon/commit/379efd366d31d0b629456dc4e69f32e1671978d1)), closes [#3708](https://github.com/Sage/carbon/issues/3708)
* **popover-container:** type definitions not properly exported ([c127258](https://github.com/Sage/carbon/commit/c12725811dcebf92a89531ead0eede14f060f7c9)), closes [#3707](https://github.com/Sage/carbon/issues/3707)
* **radio-button:** type definitions not properly exported ([3873c81](https://github.com/Sage/carbon/commit/3873c81822a72b9d6a2d01f199e12adcac6826cc))
* **simple-select:** optionrow and optiongroupheader type definitions not exported ([8143417](https://github.com/Sage/carbon/commit/8143417a391c1383e99e5d86829d764031adb507))
* **tabs:** ts props other than children should be optional ([df5a6b8](https://github.com/Sage/carbon/commit/df5a6b86ac195ff755797a88a7b55e71f983bbcf)), closes [#3568](https://github.com/Sage/carbon/issues/3568)
* **tile-select:** ts type prop should not be required ([3e7343b](https://github.com/Sage/carbon/commit/3e7343b6c1c646f72d843f41dd886c6f6dcf5a3d))
* **toast:** type definitions not properly exported ([a9b3dfe](https://github.com/Sage/carbon/commit/a9b3dfee3fe874e405bc63f2437d0f6e292ea77b)), closes [#3712](https://github.com/Sage/carbon/issues/3712)
* **typography:** incorrect prop name in type definitions ([afcebf4](https://github.com/Sage/carbon/commit/afcebf420cce2da574ad0c7450a69b60a127bec0))
* incorrect typescript exports ([cd60012](https://github.com/Sage/carbon/commit/cd600127eefe5a1aab205664193eafb21da0ebd3))


### Miscellaneous Chores

* add styled-system and styled-components types dependencies ([fc8e62d](https://github.com/Sage/carbon/commit/fc8e62d3857723cf5985319b23c245c21598751b))

### [71.4.2](https://github.com/Sage/carbon/compare/v71.4.1...v71.4.2) (2021-05-10)


### Bug Fixes

* **dialog-full-screen:** fix content ref forwarding ([7d0cdc0](https://github.com/Sage/carbon/commit/7d0cdc0295f6a6f01c14d7c47af3db1061fc41e1))

### [71.4.1](https://github.com/Sage/carbon/compare/v71.4.0...v71.4.1) (2021-05-07)


### Bug Fixes

* **flat-table:** allow multiple header rows to be sticky ([e70dfa9](https://github.com/Sage/carbon/commit/e70dfa98deeb283cf0410d0b3fa9a27547384ede)), closes [#3728](https://github.com/Sage/carbon/issues/3728)
* **flat-table:** allow row headers to be sticky within flat-table-head ([84dfa9b](https://github.com/Sage/carbon/commit/84dfa9b03e6545ca82161dfafc5cb5a437dd0e13))

## [71.4.0](https://github.com/Sage/carbon/compare/v71.3.0...v71.4.0) (2021-05-07)


### Features

* **switch:** add styled system margin ([ca01fee](https://github.com/Sage/carbon/commit/ca01fee166410f63d5e576fd2202f4c4f108c4d5))

## [71.3.0](https://github.com/Sage/carbon/compare/v71.2.1...v71.3.0) (2021-05-06)


### Features

* **draggable:** add styled-system props support ([9a2ca2b](https://github.com/Sage/carbon/commit/9a2ca2baa006935e1c67b450a01dd7e5a064bd3c))

### [71.2.1](https://github.com/Sage/carbon/compare/v71.2.0...v71.2.1) (2021-05-06)


### Bug Fixes

* **search:** fix outline appearing onClick around the X icon ([6f8fb38](https://github.com/Sage/carbon/commit/6f8fb38cc50091ab482e10e1ad63c9d822ddb905)), closes [#3857](https://github.com/Sage/carbon/issues/3857)

## [71.2.0](https://github.com/Sage/carbon/compare/v71.1.0...v71.2.0) (2021-05-06)


### Features

* **image:** create new component to support rendering images ([c77e4b1](https://github.com/Sage/carbon/commit/c77e4b18d17fcfff03257c4179d0ffc60eaca425))

## [71.1.0](https://github.com/Sage/carbon/compare/v71.0.0...v71.1.0) (2021-05-04)


### Features

* **detail:** add styled-system margin support ([5ccbf34](https://github.com/Sage/carbon/commit/5ccbf349855a065ea3ce845a457e3540a6651a14))

## [71.0.0](https://github.com/Sage/carbon/compare/v70.9.0...v71.0.0) (2021-05-04)


### ⚠ BREAKING CHANGES

* **menu-item:** Removed keyboardOverride prop from MenuItem

### Code Refactoring

* **menu-item:** remove keyboard override option ([6531b2f](https://github.com/Sage/carbon/commit/6531b2fcf8bc57ea87679af6f652c0e6d860c51d))

## [70.9.0](https://github.com/Sage/carbon/compare/v70.8.0...v70.9.0) (2021-04-30)


### Features

* **content:** add margin props ([d95b9c5](https://github.com/Sage/carbon/commit/d95b9c52f1357d16d294b6d8ef269b0e257cc8c3))

## [70.8.0](https://github.com/Sage/carbon/compare/v70.7.0...v70.8.0) (2021-04-30)


### Features

* **heading:** add styled-system margin support ([86b54e1](https://github.com/Sage/carbon/commit/86b54e17054e5769444199f4b3b255704699deca))

## [70.7.0](https://github.com/Sage/carbon/compare/v70.6.0...v70.7.0) (2021-04-29)


### Features

* **accordion-group:** add styled-system margin support ([782d2d6](https://github.com/Sage/carbon/commit/782d2d6e6bf93d6d68ee93e04de2644b32c67718))

## [70.6.0](https://github.com/Sage/carbon/compare/v70.5.1...v70.6.0) (2021-04-29)


### Features

* **dialog-full-screen:** add auto focus functionality ([0c36bbb](https://github.com/Sage/carbon/commit/0c36bbb20a178ed11107e79dfe895e4a8123d788))

### [70.5.1](https://github.com/Sage/carbon/compare/v70.5.0...v70.5.1) (2021-04-29)


### Bug Fixes

* **filterable-select:** call onChange when value is deleted or not matched ([6c18561](https://github.com/Sage/carbon/commit/6c18561d8e4881fc4c54c8445e81588a3696c1d0))

## [70.5.0](https://github.com/Sage/carbon/compare/v70.4.1...v70.5.0) (2021-04-29)


### Features

* **help:** add support for styled-system margin interface ([025d8b1](https://github.com/Sage/carbon/commit/025d8b14bd75422485d2bb1748ac2eca765d87cd))
* **icon:** add support for styled-system margin interface ([31e4089](https://github.com/Sage/carbon/commit/31e40892b681dd6e5f752eb13df97cd593223947))
* **validation-icon:** add support for styled-system margin interface ([f3cf951](https://github.com/Sage/carbon/commit/f3cf951d15a18264b7196f3ff97dc843746405e9))

### [70.4.1](https://github.com/Sage/carbon/compare/v70.4.0...v70.4.1) (2021-04-29)


### Bug Fixes

* **select:** fix not resizing list during window resize ([f173917](https://github.com/Sage/carbon/commit/f173917b6cdf3a8ca6c88f716a8d5d515bddea1f))

## [70.4.0](https://github.com/Sage/carbon/compare/v70.3.0...v70.4.0) (2021-04-28)


### Features

* **action-popover:** add styled-system margin support ([5816ef7](https://github.com/Sage/carbon/commit/5816ef7594bafd6a712971548a4dd6c9d601b939))

## [70.3.0](https://github.com/Sage/carbon/compare/v70.2.0...v70.3.0) (2021-04-28)


### Features

* add tooltip and onClick to Portrait component - FE-3502 ([73a0075](https://github.com/Sage/carbon/commit/73a0075c59bd7692739491f6029a10c387fdd44b)), closes [#3554](https://github.com/Sage/carbon/issues/3554)

## [70.2.0](https://github.com/Sage/carbon/compare/v70.1.1...v70.2.0) (2021-04-28)


### Features

* **card:** add styled-system margin support ([e902aa2](https://github.com/Sage/carbon/commit/e902aa239ed4e2aa6941d185cb9d591e1abe8074))

### [70.1.1](https://github.com/Sage/carbon/compare/v70.1.0...v70.1.1) (2021-04-28)


### Bug Fixes

* **definition-list:** fix dl focused elements outline cut by "overflow: hidden" ([f7ca1d3](https://github.com/Sage/carbon/commit/f7ca1d3e3ef4f202a9598e44431a7c6f763f1684))

## [70.1.0](https://github.com/Sage/carbon/compare/v70.0.1...v70.1.0) (2021-04-28)


### Features

* **duelling-picklist:** add support for styled-system margin interface ([8a373be](https://github.com/Sage/carbon/commit/8a373be175c0f45cd868694afe79e01c302a7ed7))

### [70.0.1](https://github.com/Sage/carbon/compare/v70.0.0...v70.0.1) (2021-04-27)


### Bug Fixes

* **flat-table-row-header:** add zIndex to styles ([2026816](https://github.com/Sage/carbon/commit/20268167cb7c6df456ee5efda62a7f16d297a10b)), closes [#3909](https://github.com/Sage/carbon/issues/3909)

## [70.0.0](https://github.com/Sage/carbon/compare/v69.1.1...v70.0.0) (2021-04-26)


### ⚠ BREAKING CHANGES

* DialogFullScreen, Dialog, Alert and Confirm components
no longer support enabling background UI interactions or disabling focus trap
Dialog, Alert and Confirm height prop behaviour has changed

### Code Refactoring

* refactor modal based components ([59c65da](https://github.com/Sage/carbon/commit/59c65da42ac78f6b20c38364390f45b63de9310d))

### [69.1.1](https://github.com/Sage/carbon/compare/v69.1.0...v69.1.1) (2021-04-26)


### Bug Fixes

* **select-list:** fix bottom of focus border is cut off by the select-list ([b944350](https://github.com/Sage/carbon/commit/b944350ce2af7d2a1c5494d84bb2bccf631abf17))

## [69.1.0](https://github.com/Sage/carbon/compare/v69.0.0...v69.1.0) (2021-04-23)


### Features

* **tile-select:** add new footer prop ([baa4442](https://github.com/Sage/carbon/commit/baa4442ffef9a50e39b9f686909aa94c04fb9128))
* **tile-select:** expand prop types for title, subtitle and description to node ([7563e4e](https://github.com/Sage/carbon/commit/7563e4ebc797cb0301307a3bee372f60d51e0ed9))

## [69.0.0](https://github.com/Sage/carbon/compare/v68.25.3...v69.0.0) (2021-04-22)


### ⚠ BREAKING CHANGES

* **babel:** polyfills for IE11 will no longer be included in our build.
We polyfill the latest 2 versions of Chrome, Firefox, Edge and Safari

### Miscellaneous Chores

* **babel:** update config ([5cac737](https://github.com/Sage/carbon/commit/5cac737abbf0549374b78043964b1173424bf6a3))

### [68.25.3](https://github.com/Sage/carbon/compare/v68.25.2...v68.25.3) (2021-04-22)


### Bug Fixes

* **flat-table-row:** add support for controlling expanded rows externally ([721f975](https://github.com/Sage/carbon/commit/721f9751f6687bcdd04dd66160e9d157eb649e45)), closes [#3875](https://github.com/Sage/carbon/issues/3875)

### [68.25.2](https://github.com/Sage/carbon/compare/v68.25.1...v68.25.2) (2021-04-20)


### Bug Fixes

* **flat-table:** ensure all th elements are sticky when sticky head prop is set ([82dd6c9](https://github.com/Sage/carbon/commit/82dd6c985ea73016ca52a500faa0b46690aad63a)), closes [#3876](https://github.com/Sage/carbon/issues/3876)

### [68.25.1](https://github.com/Sage/carbon/compare/v68.25.0...v68.25.1) (2021-04-19)


### Bug Fixes

* **flat-table:** fix an alignment gap between the colapse icon and the text ([c8d90e5](https://github.com/Sage/carbon/commit/c8d90e56804b4e55870f0721b2013e5e5f48438f))

## [68.25.0](https://github.com/Sage/carbon/compare/v68.24.0...v68.25.0) (2021-04-16)


### Features

* **grid-container:** use prop-types from styled-system ([ca91366](https://github.com/Sage/carbon/commit/ca913661ebacc3cd1f87e258ab984b1ca13ef109))

## [68.24.0](https://github.com/Sage/carbon/compare/v68.23.0...v68.24.0) (2021-04-16)


### Features

* **portrait:** add styled-system margin ([e3de07d](https://github.com/Sage/carbon/commit/e3de07d33031d890e37cf01062c79b233ca0631d))

## [68.23.0](https://github.com/Sage/carbon/compare/v68.22.1...v68.23.0) (2021-04-16)


### Features

* **preview:** add styled system margin props to Preview ([83e0ba3](https://github.com/Sage/carbon/commit/83e0ba3f39e01df1f689493885dd5635554c9560))

### [68.22.1](https://github.com/Sage/carbon/compare/v68.22.0...v68.22.1) (2021-04-15)


### Reverts

* "docs: add info about chromatic for major branch" ([de23064](https://github.com/Sage/carbon/commit/de23064b09cd2b762ddf6346be3fa220f16ab72c))

## [68.22.0](https://github.com/Sage/carbon/compare/v68.21.0...v68.22.0) (2021-04-15)


### Features

* **step-sequence:** add styled system margin props to StepSequence ([8415302](https://github.com/Sage/carbon/commit/84153020d27f9ae28c1dba4f0a49ce5015696c9a))

## [68.21.0](https://github.com/Sage/carbon/compare/v68.20.1...v68.21.0) (2021-04-15)


### Features

* **settings-row:** add support for styled system margin props ([88276d6](https://github.com/Sage/carbon/commit/88276d607ae108ac64d86dc1fb27585d56203593))

### [68.20.1](https://github.com/Sage/carbon/compare/v68.20.0...v68.20.1) (2021-04-15)


### Bug Fixes

* **day-picker:** fix bottom of focus border is cut off by the date picker ([700822a](https://github.com/Sage/carbon/commit/700822a498325551e1d3dbc9c0b770625b485212))

## [68.20.0](https://github.com/Sage/carbon/compare/v68.19.0...v68.20.0) (2021-04-14)


### Features

* **popover-container:** surface styled system padding props ([a99d967](https://github.com/Sage/carbon/commit/a99d9679e2a13f789976f3c7bcd02bd411301ca5))

## [68.19.0](https://github.com/Sage/carbon/compare/v68.18.0...v68.19.0) (2021-04-14)


### Features

* **tile-select, tile-select-group:** surface styled system margin props ([0326f1a](https://github.com/Sage/carbon/commit/0326f1a8c7617206d3524f2ef80d093677802529))

## [68.18.0](https://github.com/Sage/carbon/compare/v68.17.0...v68.18.0) (2021-04-14)


### Features

* **message:** add styled-system margin props ([26e793e](https://github.com/Sage/carbon/commit/26e793e3eefe092f2cf539f5597355e7a716cc8c))

## [68.17.0](https://github.com/Sage/carbon/compare/v68.16.0...v68.17.0) (2021-04-13)


### Features

* **flat-table-cell, flat-table-row-header:** add width prop to table cell and new truncate styling ([86b42b8](https://github.com/Sage/carbon/commit/86b42b8166c68cb1d8818c02b31e3b79f2e4ca52))


### Bug Fixes

* **flat-table-cell, flat-table-header:** raise specificity of spacing styles ([8bd10ce](https://github.com/Sage/carbon/commit/8bd10cea837de190791aee32ea4e9be433008f4a)), closes [#3846](https://github.com/Sage/carbon/issues/3846)

## [68.16.0](https://github.com/Sage/carbon/compare/v68.15.0...v68.16.0) (2021-04-13)


### Features

* **split-button:** surface styled system margin props ([5495b2d](https://github.com/Sage/carbon/commit/5495b2df06322c2c4fc366278cc1e8fcccd32f36))


### Bug Fixes

* **split-button:** prevent padding props being spread into main button ([7bd7ade](https://github.com/Sage/carbon/commit/7bd7ade4943238e24e323ad4c664a0f4a57c9e83))

## [68.15.0](https://github.com/Sage/carbon/compare/v68.14.0...v68.15.0) (2021-04-12)


### Features

* **textbox:** change labelHelp type to ReactNode ([fbd15e6](https://github.com/Sage/carbon/commit/fbd15e62ad242d96787729224aae6fbde22c098d)), closes [#3434](https://github.com/Sage/carbon/issues/3434)

## [68.14.0](https://github.com/Sage/carbon/compare/v68.13.0...v68.14.0) (2021-04-12)


### Features

* **profile:** add styled-system margin props ([a891678](https://github.com/Sage/carbon/commit/a89167874bac998162406be61035a2f4775b6121))

## [68.13.0](https://github.com/Sage/carbon/compare/v68.12.0...v68.13.0) (2021-04-12)


### Features

* **note:** add styled-system margin props ([dca47cd](https://github.com/Sage/carbon/commit/dca47cd45aed8e75bb0ebd253ae218f6b68b0e35))

## [68.12.0](https://github.com/Sage/carbon/compare/v68.11.0...v68.12.0) (2021-04-12)


### Features

* **text-editor:** surface styled system margin props ([9825c61](https://github.com/Sage/carbon/commit/9825c617e53284001113a1db9fbad4e855b59438))

## [68.11.0](https://github.com/Sage/carbon/compare/v68.10.0...v68.11.0) (2021-04-09)


### Features

* **tabs, tab:** surface styled system margin interface in tabs and padding interface in tab ([5e125af](https://github.com/Sage/carbon/commit/5e125af229a54e826076e6928e5e59a0058d5ecb))

## [68.10.0](https://github.com/Sage/carbon/compare/v68.9.2...v68.10.0) (2021-04-09)


### Features

* **loader:** add styled-system ([28f4656](https://github.com/Sage/carbon/commit/28f4656c4017bbd9e2977ea83b7683446e365117))

### [68.9.2](https://github.com/Sage/carbon/compare/v68.9.1...v68.9.2) (2021-04-08)


### Bug Fixes

* **flat-table:** fix gap between table content and sticky footer ([c547f4e](https://github.com/Sage/carbon/commit/c547f4efdd035bb2dd0013b94c21bb38df8237c7)), closes [#3850](https://github.com/Sage/carbon/issues/3850)

### [68.9.1](https://github.com/Sage/carbon/compare/v68.9.0...v68.9.1) (2021-04-08)


### Bug Fixes

* **filterable-select:** check event has a data element attribute before checking the value ([39db098](https://github.com/Sage/carbon/commit/39db09875b242632a1624e8540706988eac4bce0)), closes [#3754](https://github.com/Sage/carbon/issues/3754)

## [68.9.0](https://github.com/Sage/carbon/compare/v68.8.3...v68.9.0) (2021-04-06)


### Features

* **icon-button:** add styled-system ([45d4a72](https://github.com/Sage/carbon/commit/45d4a72589877f6d4d5edb00808a923f1c6799b9))

### [68.8.3](https://github.com/Sage/carbon/compare/v68.8.2...v68.8.3) (2021-04-01)


### Bug Fixes

* **simple-select:** remove with: auto for transparent ([045ae94](https://github.com/Sage/carbon/commit/045ae942a5f68a861b702af9aa18a6ec20d0596a))
* **simple-select:** update icon position ([4636ba2](https://github.com/Sage/carbon/commit/4636ba24047070976f125677c4c921114f1ded7b))

### [68.8.2](https://github.com/Sage/carbon/compare/v68.8.1...v68.8.2) (2021-04-01)


### Bug Fixes

* **search:** stop event propagation for characters and numbers ([6754cdf](https://github.com/Sage/carbon/commit/6754cdfc1817c9223ad2952923939e74bbef374e)), closes [#3830](https://github.com/Sage/carbon/issues/3830)

### [68.8.1](https://github.com/Sage/carbon/compare/v68.8.0...v68.8.1) (2021-04-01)


### Bug Fixes

* **flat-table-row:** add border left to the th element directly after a row header ([fa4e02a](https://github.com/Sage/carbon/commit/fa4e02a81acaa875fe7bb40042edfecf14404462)), closes [#3564](https://github.com/Sage/carbon/issues/3564)
* **flat-table-row:** ensure any cells preceding row headers are also positioned sticky ([b27ff64](https://github.com/Sage/carbon/commit/b27ff64d428390853d3f0a04d9f2283e831a49bd)), closes [#3721](https://github.com/Sage/carbon/issues/3721)

## [68.8.0](https://github.com/Sage/carbon/compare/v68.7.0...v68.8.0) (2021-04-01)


### Features

* **validation-icon:** surface ml and mr props to adjust icon spacing ([334ba8f](https://github.com/Sage/carbon/commit/334ba8fb0850eb7d35701af41a27f1268fba5fc8))

## [68.7.0](https://github.com/Sage/carbon/compare/v68.6.1...v68.7.0) (2021-03-31)


### Features

* **drawer:** allows to use custom height ([5e9bfa5](https://github.com/Sage/carbon/commit/5e9bfa512bbba01b00bc17ab12134b5089021f47))

### [68.6.1](https://github.com/Sage/carbon/compare/v68.6.0...v68.6.1) (2021-03-31)


### Bug Fixes

* **pager:** update pager after enter key is pressed ([f254d5d](https://github.com/Sage/carbon/commit/f254d5d4387dd2037abe16ec9f77948d35074749))

## [68.6.0](https://github.com/Sage/carbon/compare/v68.5.2...v68.6.0) (2021-03-30)


### Features

* **duelling-picklist:** add grouping option ([73f1a67](https://github.com/Sage/carbon/commit/73f1a67a1fe498985be7008d1001acc8d2db2371))
* **picklist-item:** add locked option ([114c86e](https://github.com/Sage/carbon/commit/114c86e955dcdf0f2996695fb7e7fd536cf611cd))

### [68.5.2](https://github.com/Sage/carbon/compare/v68.5.1...v68.5.2) (2021-03-26)


### Bug Fixes

* **tab-title:** fix styling issues with border and selected state ([69512c0](https://github.com/Sage/carbon/commit/69512c068676ee24ee5e1220ee9a3d7d1f30a8d1)), closes [#3773](https://github.com/Sage/carbon/issues/3773)
* **tabs-header:** allow tabs to be scrollable when position is left and they overflow parent ([ffa4ebf](https://github.com/Sage/carbon/commit/ffa4ebf0674bfc3b791c6ad5527ac8acba94e568)), closes [#3352](https://github.com/Sage/carbon/issues/3352)

### [68.5.1](https://github.com/Sage/carbon/compare/v68.5.0...v68.5.1) (2021-03-25)


### Bug Fixes

* **flat-table-row:** allow null children ([9d14614](https://github.com/Sage/carbon/commit/9d14614d69267f4f902a984abc982cd79d99e992)), closes [#3790](https://github.com/Sage/carbon/issues/3790)

## [68.5.0](https://github.com/Sage/carbon/compare/v68.4.1...v68.5.0) (2021-03-24)


### Features

* **date-picker:** auto position pop up ([809f314](https://github.com/Sage/carbon/commit/809f314713a9378badfd48c2a2b21965d76def4a))

### [68.4.1](https://github.com/Sage/carbon/compare/v68.4.0...v68.4.1) (2021-03-22)


### Bug Fixes

* **card:** render component with string as the children ([43dc93d](https://github.com/Sage/carbon/commit/43dc93da6184fdce26965ac733b7cd87efb9c2a9)), closes [#2617](https://github.com/Sage/carbon/issues/2617)

## [68.4.0](https://github.com/Sage/carbon/compare/v68.3.3...v68.4.0) (2021-03-17)


### Features

* **link:** add rel prop ([b502bec](https://github.com/Sage/carbon/commit/b502bec098757f04d35b52400a0dc9ea479b8594))

### [68.3.3](https://github.com/Sage/carbon/compare/v68.3.2...v68.3.3) (2021-03-16)


### Bug Fixes

* **pod:** fix footer text colour when pod is hovered ([d6dbe7b](https://github.com/Sage/carbon/commit/d6dbe7b88b55b05def91a1935e883768423359bc)), closes [#3584](https://github.com/Sage/carbon/issues/3584)

### [68.3.2](https://github.com/Sage/carbon/compare/v68.3.1...v68.3.2) (2021-03-16)


### Bug Fixes

* **radio-button-group, checkbox-group:** disable group behaviour when validation is not on label ([463b116](https://github.com/Sage/carbon/commit/463b116a11cf35a2cf901fd9fc3abed5fc03555e))

### [68.3.1](https://github.com/Sage/carbon/compare/v68.3.0...v68.3.1) (2021-03-15)


### Bug Fixes

* **menu:** fix search styles ([ce4405e](https://github.com/Sage/carbon/commit/ce4405ea5d8abbff2d032d756f0fdbb35b2835de)), closes [#3591](https://github.com/Sage/carbon/issues/3591)
* **menu:** fix search styles ([0efe3dd](https://github.com/Sage/carbon/commit/0efe3dd07e82a9002c57985886a8e887e008b56d)), closes [#3591](https://github.com/Sage/carbon/issues/3591)

## [68.3.0](https://github.com/Sage/carbon/compare/v68.2.0...v68.3.0) (2021-03-12)


### Features

* **link:** add isSkipLink prop ([cfefb6f](https://github.com/Sage/carbon/commit/cfefb6fd584e9aefb1abc4cdf4de84ed867bbe8a))

## [68.2.0](https://github.com/Sage/carbon/compare/v68.1.1...v68.2.0) (2021-03-12)


### Features

* **button-toggle-group:** add support for overriding tooltip flip behaviour ([79d5f23](https://github.com/Sage/carbon/commit/79d5f239069fa771543802deb5a9a1b2f58ab6be))
* **fieldset:** add tooltip flip override to validation icon rendered on labels ([2abfbd4](https://github.com/Sage/carbon/commit/2abfbd44528274f8363f1ee1c684f40fc76947e3))
* **help:** add support for tooltip flip placement overrides ([2c01499](https://github.com/Sage/carbon/commit/2c014998f6166556d5e937ee8d5c3c4a37ae5267))
* **icon:** add support for tooltip flip placement overrides ([47dc424](https://github.com/Sage/carbon/commit/47dc4244acdae1b53ca4ad4857803d51ab831bd9))
* **label:** add tooltip flip override to validation icon when rendered ([2b88b25](https://github.com/Sage/carbon/commit/2b88b25242f5862584ff03b6aaa832537b8267ec))
* **simple-color-picker:** add tooltip flip overrides to validation icon ([224d99d](https://github.com/Sage/carbon/commit/224d99d8747c03a5e558118a11a07771fb4e9257))
* **switch:** add tooltip flip override to validation icon rendered on input ([ba6b73a](https://github.com/Sage/carbon/commit/ba6b73a074648f0558536962352b629b7727e2d8))
* **tooltip:** add support for overriding default flip placements ([73a35d6](https://github.com/Sage/carbon/commit/73a35d61a360d8680e7703472cf5abe6f194acfd))
* **validation-icon:** add support for tooltip flip placement overrides ([0471c5b](https://github.com/Sage/carbon/commit/0471c5b612a37f42045e6f7237559ee81b28f5ae))

### [68.1.1](https://github.com/Sage/carbon/compare/v68.1.0...v68.1.1) (2021-03-11)


### Bug Fixes

* **select:** fix incorrect textbox behaviour on safari ([6077c18](https://github.com/Sage/carbon/commit/6077c186ede063693ea44fd04a33c3684a906d42))

## [68.1.0](https://github.com/Sage/carbon/compare/v68.0.2...v68.1.0) (2021-03-11)


### Features

* **action-popover-item:** support for download button ([0dcdb65](https://github.com/Sage/carbon/commit/0dcdb654473e007d8a89787d99b9034f358c3350))

### [68.0.2](https://github.com/Sage/carbon/compare/v68.0.1...v68.0.2) (2021-03-11)


### Bug Fixes

* **button:** add border radius to button styles ([3142e17](https://github.com/Sage/carbon/commit/3142e170fb9182c67d3749b1b36d667a49fab30a)), closes [#3630](https://github.com/Sage/carbon/issues/3630)

### [68.0.1](https://github.com/Sage/carbon/compare/v68.0.0...v68.0.1) (2021-03-09)


### Bug Fixes

* **select:** fix onblur fired on option mousedown event ([664350e](https://github.com/Sage/carbon/commit/664350e2825a96e250c3261620634abbc429dd6a))

## [68.0.0](https://github.com/Sage/carbon/compare/v67.0.0...v68.0.0) (2021-03-09)


### ⚠ BREAKING CHANGES

* **icon:** Icon component fontSize prop `medium` value equivalent is now named `large`.
To update your code use `replace-prop-value` codemod:
https://github.com/Sage/carbon-codemod/tree/master/transforms/replace-prop-value

### Features

* **icon:** add additional fontSize and bgSize prop values ([3b58601](https://github.com/Sage/carbon/commit/3b586014ba86cdcb4797655e1d42ceea27fd6e3d))

## [67.0.0](https://github.com/Sage/carbon/compare/v66.19.2...v67.0.0) (2021-03-08)


### ⚠ BREAKING CHANGES

* **sidebar:** SidebarHeader is now internal component, use header prop

### Features

* **sidebar:** add styled system to sidebar ([48a38d4](https://github.com/Sage/carbon/commit/48a38d4e67cd73e1324c29eddfe3865ec8dc58f8)), closes [#3221](https://github.com/Sage/carbon/issues/3221)

### [66.19.2](https://github.com/Sage/carbon/compare/v66.19.1...v66.19.2) (2021-03-05)


### Bug Fixes

* **focus-trap:** update trap to use ref from content container ([e59b5f4](https://github.com/Sage/carbon/commit/e59b5f4dcf14ed41227e9b1ee91f04e30687c1b4)), closes [#3770](https://github.com/Sage/carbon/issues/3770)

### [66.19.1](https://github.com/Sage/carbon/compare/v66.19.0...v66.19.1) (2021-03-04)


### Bug Fixes

* fix dropdown alignment in split and multi action buttons ([a6caf26](https://github.com/Sage/carbon/commit/a6caf26be1d19104c7ba3e76cdcb0c8568e5d19f))

## [66.19.0](https://github.com/Sage/carbon/compare/v66.18.1...v66.19.0) (2021-03-04)


### Features

* **select:** add multi column functionality ([736a109](https://github.com/Sage/carbon/commit/736a109ee2546f1d6f6e502aecb432aa0968e3b3))

### [66.18.1](https://github.com/Sage/carbon/compare/v66.18.0...v66.18.1) (2021-03-02)


### Bug Fixes

* **tabs:** fix border gap ([7546b26](https://github.com/Sage/carbon/commit/7546b261d29ddbba3632a049252f9b80bf0ffb03))
* **tabs:** fix incorrect large tab alignment ([bcc3101](https://github.com/Sage/carbon/commit/bcc3101be6bfad9c979871fc59738c9e9e6f25be))

## [66.18.0](https://github.com/Sage/carbon/compare/v66.17.0...v66.18.0) (2021-02-26)


### Features

* **storybook:** update storybook to v6 ([4912c66](https://github.com/Sage/carbon/commit/4912c66a1daf40ff601045ebc006c150f7526d2a))

## [66.17.0](https://github.com/Sage/carbon/compare/v66.16.0...v66.17.0) (2021-02-26)


### Features

* **toast:** center toast by default ([d78128f](https://github.com/Sage/carbon/commit/d78128fa703df2cead27a32cfe0590327508c26e))

## [66.16.0](https://github.com/Sage/carbon/compare/v66.15.0...v66.16.0) (2021-02-26)


### Features

* **styled-system:** add width util ([90dea96](https://github.com/Sage/carbon/commit/90dea96465be44dc026c1250f98e306bb7bd07ca))

## [66.15.0](https://github.com/Sage/carbon/compare/v66.14.0...v66.15.0) (2021-02-25)


### Features

* **confim:** add new props ([504b60f](https://github.com/Sage/carbon/commit/504b60f162156f5e3434331a75b08fa2ea7bbfe8))

## [66.14.0](https://github.com/Sage/carbon/compare/v66.13.3...v66.14.0) (2021-02-25)


### Features

* **card:** add styled-system padding props ([6cc3cd6](https://github.com/Sage/carbon/commit/6cc3cd69d619f9531a6421a82dd5ff4c59b2bc8a)), closes [#3519](https://github.com/Sage/carbon/issues/3519)

### [66.13.3](https://github.com/Sage/carbon/compare/v66.13.2...v66.13.3) (2021-02-25)


### Bug Fixes

* **heading:** remove as prop from heading title wrapper ([a1a6a90](https://github.com/Sage/carbon/commit/a1a6a90a37a735cdbd91d53c4a8a32e27f554425))

### [66.13.2](https://github.com/Sage/carbon/compare/v66.13.1...v66.13.2) (2021-02-25)


### Bug Fixes

* **dl:** support for conditional rendering ([00c7101](https://github.com/Sage/carbon/commit/00c7101ecf29423b591e1fd4eaedf169f7f545a1))

### [66.13.1](https://github.com/Sage/carbon/compare/v66.13.0...v66.13.1) (2021-02-24)


### Bug Fixes

* **numeral-date:** prevent error being thrown when default date format is used ([3f9c535](https://github.com/Sage/carbon/commit/3f9c535210d194d39e41fcb96b17399e34b49e82)), closes [#3264](https://github.com/Sage/carbon/issues/3264)

## [66.13.0](https://github.com/Sage/carbon/compare/v66.12.4...v66.13.0) (2021-02-24)


### Features

* **tile-select:** add props to  override action button and render sibling adornment ([8f84c27](https://github.com/Sage/carbon/commit/8f84c27306f674b1f13e602d5e9a95700ca32f2d))

### [66.12.4](https://github.com/Sage/carbon/compare/v66.12.3...v66.12.4) (2021-02-24)


### Bug Fixes

* **text-editor:** update import path ([d851b72](https://github.com/Sage/carbon/commit/d851b7228828df9330e387710fbbd0ceaf950c57))

### [66.12.3](https://github.com/Sage/carbon/compare/v66.12.2...v66.12.3) (2021-02-23)


### Bug Fixes

* **date-input:** incorrect year in datepicker when date is not valid ([608164e](https://github.com/Sage/carbon/commit/608164e27c92fc2577da530073ec6910bc3c9f21))

### [66.12.2](https://github.com/Sage/carbon/compare/v66.12.1...v66.12.2) (2021-02-23)


### Bug Fixes

* **dialog:** correct calculation to apply fixed bottom ([e1e5fd5](https://github.com/Sage/carbon/commit/e1e5fd536ff229461ff9b716c7c17ba46db009ab)), closes [#3257](https://github.com/Sage/carbon/issues/3257)

### [66.12.1](https://github.com/Sage/carbon/compare/v66.12.0...v66.12.1) (2021-02-22)


### Bug Fixes

* **select:** incorrect typescript children types ([b436fea](https://github.com/Sage/carbon/commit/b436feadad57d92a5b6ae640b88ae33dc9ba9f99))

## [66.12.0](https://github.com/Sage/carbon/compare/v66.11.1...v66.12.0) (2021-02-22)


### Features

* **radio-button:** allow use of all styled system margin props ([4698606](https://github.com/Sage/carbon/commit/46986061d1bddef119d95c2d60eb83e0d9f1e1d5))

### [66.11.1](https://github.com/Sage/carbon/compare/v66.11.0...v66.11.1) (2021-02-21)


### Bug Fixes

* **date-range:** allow empty values for start and end dates ([01eb5bc](https://github.com/Sage/carbon/commit/01eb5bc1cb58fb4a084fc2b9e85009960621d20c)), closes [#3501](https://github.com/Sage/carbon/issues/3501)

## [66.11.0](https://github.com/Sage/carbon/compare/v66.10.2...v66.11.0) (2021-02-19)


### Features

* **flat-table:** add expandable rows option ([9701362](https://github.com/Sage/carbon/commit/9701362ba12e1a4e26881981848d1cb500473c92))

### [66.10.2](https://github.com/Sage/carbon/compare/v66.10.1...v66.10.2) (2021-02-19)


### Bug Fixes

* **date:** set format based on translation ([024f338](https://github.com/Sage/carbon/commit/024f338ce7c1df99589ab9154c8aaf8c0071fdb0))

### [66.10.1](https://github.com/Sage/carbon/compare/v66.10.0...v66.10.1) (2021-02-19)


### Bug Fixes

* **focus-trap:** handle radio button focus ([ce3cc9b](https://github.com/Sage/carbon/commit/ce3cc9bfd0f456a663380af5f6cdcd035cb4e930)), closes [#3623](https://github.com/Sage/carbon/issues/3623)

## [66.10.0](https://github.com/Sage/carbon/compare/v66.9.0...v66.10.0) (2021-02-19)


### Features

* **tab:** allows Tab to be a link ([96e1597](https://github.com/Sage/carbon/commit/96e1597faeb3912f811729ae972b0d50eb6a4e6d))

## [66.9.0](https://github.com/Sage/carbon/compare/v66.8.0...v66.9.0) (2021-02-18)


### Features

* **select:** add popperjs positioning mechanism ([9bd1a74](https://github.com/Sage/carbon/commit/9bd1a74962903c0b3c8f9c2455227701e210afec))


### Bug Fixes

* **multi-select:** fix closing multi-select when deleting pills ([80c95de](https://github.com/Sage/carbon/commit/80c95defa941128402a159c97cb19e8bf5d9f53a))

## [66.8.0](https://github.com/Sage/carbon/compare/v66.7.0...v66.8.0) (2021-02-18)


### Features

* **text-editor:** add rows prop to support custom min  height ([966d405](https://github.com/Sage/carbon/commit/966d405be3e4b9aff3b28d01633a2108b7996c63)), closes [#3632](https://github.com/Sage/carbon/issues/3632)

## [66.7.0](https://github.com/Sage/carbon/compare/v66.6.1...v66.7.0) (2021-02-18)


### Features

* **help:** add support for tooltip background and font color overrides ([c169979](https://github.com/Sage/carbon/commit/c16997917ce6184ec67d31eb0510bf90e723a0a2))
* **icon:** add support for tooltip background and font color overrides ([d4f5db9](https://github.com/Sage/carbon/commit/d4f5db934c27ea44b688f35a169ddb79c461e9be))
* **tooltip:** add support for background and font color overrides ([f607f77](https://github.com/Sage/carbon/commit/f607f77c973c71c79198b20d3609c68782f5da24))


### Bug Fixes

* **tooltip:** ensure long text strings wrap instead of overflow ([de44e2b](https://github.com/Sage/carbon/commit/de44e2b34bc3ce8f347b71fe552edc1ed2f9d981))

### [66.6.1](https://github.com/Sage/carbon/compare/v66.6.0...v66.6.1) (2021-02-17)


### Bug Fixes

* **date:** change onBlur event parameters ([16d186d](https://github.com/Sage/carbon/commit/16d186d09794863c7d042fa8b3c7ae20262b0bf7)), closes [#3132](https://github.com/Sage/carbon/issues/3132)

## [66.6.0](https://github.com/Sage/carbon/compare/v66.5.0...v66.6.0) (2021-02-17)


### Features

* **heading:** add pills container ([4464a20](https://github.com/Sage/carbon/commit/4464a202253641623966bbe15bcc11f573a85d6c))

## [66.5.0](https://github.com/Sage/carbon/compare/v66.4.1...v66.5.0) (2021-02-17)


### Features

* **button:** icon only button ([cd03584](https://github.com/Sage/carbon/commit/cd035845a772b7fb6331809c845f5b1facb56337)), closes [#3236](https://github.com/Sage/carbon/issues/3236)

### [66.4.1](https://github.com/Sage/carbon/compare/v66.4.0...v66.4.1) (2021-02-17)


### Bug Fixes

* **flat-table-row:** remove border bottom colour overrides ([9e0b424](https://github.com/Sage/carbon/commit/9e0b424657f20e1948a0598896beaf07fd055aa7)), closes [#3522](https://github.com/Sage/carbon/issues/3522)

## [66.4.0](https://github.com/Sage/carbon/compare/v66.3.0...v66.4.0) (2021-02-16)


### Features

* **pager:** add props to conditional render elements and smart render buttons ([90be09b](https://github.com/Sage/carbon/commit/90be09b3c6a77a81748f737ea8529cf64a908137)), closes [#3425](https://github.com/Sage/carbon/issues/3425)

## [66.3.0](https://github.com/Sage/carbon/compare/v66.2.3...v66.3.0) (2021-02-16)


### Features

* **select:** add cypress test ([556dd08](https://github.com/Sage/carbon/commit/556dd088dc060f3b51b4e95f47b15fff67d70842))


### Bug Fixes

* **filterable-select:** display value cleared on click when in a modal ([a45932f](https://github.com/Sage/carbon/commit/a45932f3883694146e62e97ea020541c71163827))
* **filterable-select:** predefined text value not displayed when options loaded asynchronously ([8a14890](https://github.com/Sage/carbon/commit/8a1489096e4eb938c048c37225c7396c3568c6fd)), closes [#3431](https://github.com/Sage/carbon/issues/3431)
* **filterable-select:** value not cleared when filter does not match any option ([b6599d3](https://github.com/Sage/carbon/commit/b6599d35383b90676572cbcd9ee125ca1fe0e8dd))
* **filterable-select:** value not cleared when filter is deleted ([af4495d](https://github.com/Sage/carbon/commit/af4495dc5b53f4665cff9807f4cab87c0a475eda))
* **select:** display value cleared on click when in a modal ([c40f7d8](https://github.com/Sage/carbon/commit/c40f7d8eb641899e797e98dca1da505a5b597016)), closes [#3557](https://github.com/Sage/carbon/issues/3557)

### [66.2.3](https://github.com/Sage/carbon/compare/v66.2.2...v66.2.3) (2021-02-15)


### Bug Fixes

* **switch:** make value prop optional ([48c8962](https://github.com/Sage/carbon/commit/48c8962355288f6883d8f55226a35c3a9dee7818)), closes [#3265](https://github.com/Sage/carbon/issues/3265)

### [66.2.2](https://github.com/Sage/carbon/compare/v66.2.1...v66.2.2) (2021-02-12)


### Bug Fixes

* **tile:** add box sizing to container to ensure it respects  parent width ([6abeccb](https://github.com/Sage/carbon/commit/6abeccbeea02bd777237449fd2ecb43efb48c7f9)), closes [#3458](https://github.com/Sage/carbon/issues/3458)

### [66.2.1](https://github.com/Sage/carbon/compare/v66.2.0...v66.2.1) (2021-02-12)


### Bug Fixes

* **content:** add support for passing data tags to root of component ([64c4543](https://github.com/Sage/carbon/commit/64c454343f869e1c637e6c39941154846abcf7d7)), closes [#3661](https://github.com/Sage/carbon/issues/3661)

## [66.2.0](https://github.com/Sage/carbon/compare/v66.1.0...v66.2.0) (2021-02-12)


### Features

* **multi-select:** add isLoading prop ([1924d68](https://github.com/Sage/carbon/commit/1924d68993d96fdc3ee3b85278150457b04f726e))

## [66.1.0](https://github.com/Sage/carbon/compare/v66.0.3...v66.1.0) (2021-02-12)


### Features

* **pager:** add alternate variant styling ([d750304](https://github.com/Sage/carbon/commit/d750304f5b983c5dbc608c10b878289147307078))

### [66.0.3](https://github.com/Sage/carbon/compare/v66.0.2...v66.0.3) (2021-02-11)


### Bug Fixes

* **toast:** add z-index to toast portal ([2f8215c](https://github.com/Sage/carbon/commit/2f8215c5c5ba00fafbf1a6dc45511ad4425dbab0)), closes [#3640](https://github.com/Sage/carbon/issues/3640) [#3627](https://github.com/Sage/carbon/issues/3627)

### [66.0.2](https://github.com/Sage/carbon/compare/v66.0.1...v66.0.2) (2021-02-11)


### Bug Fixes

* **grid-container:** children proptype definition ([5342d4e](https://github.com/Sage/carbon/commit/5342d4e737e6dbfb3c774b54096887fad678d1cd)), closes [#3272](https://github.com/Sage/carbon/issues/3272)

### [66.0.1](https://github.com/Sage/carbon/compare/v66.0.0...v66.0.1) (2021-02-10)


### Bug Fixes

* exclude specified knobs for DateInput ([6dbc378](https://github.com/Sage/carbon/commit/6dbc378511cb147f7332dcd33d13ec4826273122))

## [66.0.0](https://github.com/Sage/carbon/compare/v65.2.0...v66.0.0) (2021-02-09)


### ⚠ BREAKING CHANGES

* The global css has been removed you should
change `import "carbon-react/lib/utils/css";` to be `import GlobalStyle
from 'carbon-react/lib/style/global-style';` and render `<GlobalStyle
/>` as part of your root component.

### Miscellaneous Chores

* remove global scss ([1a28578](https://github.com/Sage/carbon/commit/1a285788da2a1465d43a41160be7e5ebff201639))

## [65.2.0](https://github.com/Sage/carbon/compare/v65.1.0...v65.2.0) (2021-02-09)


### Features

* **pill:** add styled system props to Pill - FE-3563 ([796da16](https://github.com/Sage/carbon/commit/796da165b3640daa2b01647f75d4e7866e083b5c))

## [65.1.0](https://github.com/Sage/carbon/compare/v65.0.0...v65.1.0) (2021-02-09)


### Features

* **icon:** 6 new icons, chevrons, expand and square dot, new glyphs for euro, pound and services ([837eb74](https://github.com/Sage/carbon/commit/837eb742bcdebdf0b1774cc732a30ac6a97d8124))

## [65.0.0](https://github.com/Sage/carbon/compare/v64.0.0...v65.0.0) (2021-02-08)


### ⚠ BREAKING CHANGES

* **select:** Setting padding is no longer possible through styled-system props.
Please use only margin styled system props

### Features

* **filterable-select:** add margin styled-system props ([865b38f](https://github.com/Sage/carbon/commit/865b38fb708b00087276cb7ddf9b874ea6dc9dde))
* **multi-select:** add margin styled-system props ([0d9812e](https://github.com/Sage/carbon/commit/0d9812ee03fc5f3680694f726644e96f0c2b641a))
* **select:** add margin styled system props ([44ede21](https://github.com/Sage/carbon/commit/44ede2126a4e538227e1db7afc3890756e1726b3))


### Bug Fixes

* **search:** change placeholder color ([0165eeb](https://github.com/Sage/carbon/commit/0165eebac22dfbbb599dda683ef44e6129a6c2cf))
* **select:** change placeholder color ([e27136d](https://github.com/Sage/carbon/commit/e27136d0f165417029efcf19298d026731ac7bd9))

## [64.0.0](https://github.com/Sage/carbon/compare/v63.4.1...v64.0.0) (2021-02-05)


### ⚠ BREAKING CHANGES

* **menu-item:** remove routerLink and to props from MenuItem.
See the documentation at https://carbon.sage.com/?path=/docs/documentation-usage-with-routing--page
for how to implement this functionality
* **link:** remove routerLink and to props from Link.
See the documentation at https://carbon.sage.com/?path=/docs/documentation-usage-with-routing--page
for how to implement this functionality.
Also the onClick prop will no longer render the link as a button element
* **button:** remove renderRouterLink, href and to props from Button.
See the documentation at https://carbon.sage.com/?path=/docs/documentation-usage-with-routing--page
for how to implement this functionality

### Code Refactoring

* **button:** remove router link props ([b37d3fd](https://github.com/Sage/carbon/commit/b37d3fd200a194e0b7ceca37d594983e37f7d3fb))
* **link:** remove router link props ([50931cf](https://github.com/Sage/carbon/commit/50931cf270ce34e4ef58d34d6ddd2b0df087aea9))
* **menu-item:** remove router link props ([4198eff](https://github.com/Sage/carbon/commit/4198eff14f595fe63732f0691103df6ae3bc2e57))

### [63.4.1](https://github.com/Sage/carbon/compare/v63.4.0...v63.4.1) (2021-02-05)


### Bug Fixes

* **fieldset:** support spacing between fieldset in form ([33d4126](https://github.com/Sage/carbon/commit/33d41264fd1ccec69e7d93d2ad4a593945b67305))

## [63.4.0](https://github.com/Sage/carbon/compare/v63.3.1...v63.4.0) (2021-02-04)


### Features

* **box:** add overflowwrap prop to support breaking content that overflows ([915bf5e](https://github.com/Sage/carbon/commit/915bf5ec00aefb5bbf684a1ef043dd3201b0933f))

### [63.3.1](https://github.com/Sage/carbon/compare/v63.3.0...v63.3.1) (2021-02-03)


### Bug Fixes

* **menu, search:** update zIndex ([e136f60](https://github.com/Sage/carbon/commit/e136f60dfe8da0579045c600c256f652fd29dcac))

## [63.3.0](https://github.com/Sage/carbon/compare/v63.2.0...v63.3.0) (2021-02-02)


### Features

* **button:** add noWrap prop ([ab675ad](https://github.com/Sage/carbon/commit/ab675ad812f7139b8c205d607ff7ecdca067237e)), closes [#3503](https://github.com/Sage/carbon/issues/3503)

## [63.2.0](https://github.com/Sage/carbon/compare/v63.1.0...v63.2.0) (2021-02-02)


### Features

* **filterable-select:** add open on focus functionality ([a249a23](https://github.com/Sage/carbon/commit/a249a23eb799c8503d6b66fd98dfa6ce6e92d592))

## [63.1.0](https://github.com/Sage/carbon/compare/v63.0.2...v63.1.0) (2021-02-01)


### Features

* **toast:** allow custom max width for the toast ([f582d3a](https://github.com/Sage/carbon/commit/f582d3ab4f103c748c847bbd07fe808ec0bf7d6c))

### [63.0.2](https://github.com/Sage/carbon/compare/v63.0.1...v63.0.2) (2021-02-01)


### Bug Fixes

* **message:** add aria label for close button ([7f0fa70](https://github.com/Sage/carbon/commit/7f0fa705f0c9bd1818ead98727e7dde003770e73)), closes [#3406](https://github.com/Sage/carbon/issues/3406)

### [63.0.1](https://github.com/Sage/carbon/compare/v63.0.0...v63.0.1) (2021-02-01)


### Bug Fixes

* **dialog:** fix sticky footer transition ([f6d1360](https://github.com/Sage/carbon/commit/f6d13605de157f1f6a76cda6d193b72bb192c490)), closes [#3563](https://github.com/Sage/carbon/issues/3563)

## [63.0.0](https://github.com/Sage/carbon/compare/v62.0.1...v63.0.0) (2021-02-01)


### ⚠ BREAKING CHANGES

* **focus-trap:** the focus trap util function has been removed

### Bug Fixes

* **focus-trap:** add focus trap component and remove util function ([cde1081](https://github.com/Sage/carbon/commit/cde1081c14c38eb782ea68437f90b385bdaea914))

### [62.0.1](https://github.com/Sage/carbon/compare/v62.0.0...v62.0.1) (2021-02-01)


### Bug Fixes

* **pager:** fix incorrect behaviour when page count is zero ([1ecff03](https://github.com/Sage/carbon/commit/1ecff0388a7d33f79e2c01f6884b2b0eedf8854f))

## [62.0.0](https://github.com/Sage/carbon/compare/v61.1.0...v62.0.0) (2021-01-28)


### ⚠ BREAKING CHANGES

* **tooltip:** The `TooltipDecorator` has been removed, and the interface for `Tooltip` has been
updated

### Features

* **tooltip:** add tippyjs wrapper and remove decorator ([8114ae2](https://github.com/Sage/carbon/commit/8114ae2390d41b173c02fed7f2eaeb5ce3c05705))

## [61.1.0](https://github.com/Sage/carbon/compare/v61.0.1...v61.1.0) (2021-01-27)


### Features

* **filterable-select:** implement object id property comparison ([a2bd662](https://github.com/Sage/carbon/commit/a2bd662ec3e7e8394569eec2d3f51ba28e5f7994))
* **multi-select:** implement object id property comparison ([e68aa57](https://github.com/Sage/carbon/commit/e68aa57abbe2fd26de83f1c6c7e2092bbcf04b77))
* **select:** implement object id property comparison ([32026b3](https://github.com/Sage/carbon/commit/32026b3a61a776ad2e76f8b941f7faeafccd01e9))

### [61.0.1](https://github.com/Sage/carbon/compare/v61.0.0...v61.0.1) (2021-01-26)


### Bug Fixes

* **sidebar:** disable scroll on document if sidebar is open ([738304a](https://github.com/Sage/carbon/commit/738304ac4452a274d8b57d126b20d7d4a206a2ec)), closes [#3541](https://github.com/Sage/carbon/issues/3541)

## [61.0.0](https://github.com/Sage/carbon/compare/v60.1.0...v61.0.0) (2021-01-26)


### ⚠ BREAKING CHANGES

* **button:** The margin left 16px styling applied to the sibling buttons has been removed. An
add-prop codemod has been created to help facilitate the adding of the margin left spacing prop and
the value to the buttons in your project.

### Miscellaneous Chores

* **button:** remove sibling styling for button ([164fab8](https://github.com/Sage/carbon/commit/164fab85185ae5567939d0e5b4360be2837adc01)), closes [#3392](https://github.com/Sage/carbon/issues/3392)

## [60.1.0](https://github.com/Sage/carbon/compare/v60.0.0...v60.1.0) (2021-01-26)


### Features

* **multi-action-button:** render content in portal ([66d452c](https://github.com/Sage/carbon/commit/66d452c89daaa417ccfdff549ad98f78e35ab965))
* **split-button:** render content in portal ([fee50f5](https://github.com/Sage/carbon/commit/fee50f5f922f0a84276d8a88ecc1c62a83611c25))
* add new internal popover component ([de2962b](https://github.com/Sage/carbon/commit/de2962b7acd8237b8365c6404343291a5aae7376))

## [60.0.0](https://github.com/Sage/carbon/compare/v59.1.0...v60.0.0) (2021-01-26)


### ⚠ BREAKING CHANGES

* **content:** prop `as` has been replaced with `variant` as `as` prop is reserved for Styled Components.
To update your code you can use the following codemod
https://github.com/Sage/carbon-codemod/tree/master/transforms/rename-prop

### Code Refactoring

* **content:** update to be functional ([93c4e86](https://github.com/Sage/carbon/commit/93c4e8645867e529941b62ba5a0b16d24601f867))

## [59.1.0](https://github.com/Sage/carbon/compare/v59.0.2...v59.1.0) (2021-01-25)


### Features

* **action-popover:** render content in portal ([9c12819](https://github.com/Sage/carbon/commit/9c1281907bc06e24ae5a6a88bac2b08b493e6d51))
* add new internal popover component ([5df1eb6](https://github.com/Sage/carbon/commit/5df1eb6e951a8972caf2aea43a2429e1fbdd8582))

### [59.0.2](https://github.com/Sage/carbon/compare/v59.0.1...v59.0.2) (2021-01-22)


### Bug Fixes

* **date:** fix date crashing when allowEmptyValue is set ([f6fb41c](https://github.com/Sage/carbon/commit/f6fb41c24aebe78950c987274b78a8f04a6ee448))

### [59.0.1](https://github.com/Sage/carbon/compare/v59.0.0...v59.0.1) (2021-01-21)


### Bug Fixes

* **focus-trap:** filter disabled inputs in query selector ([d616577](https://github.com/Sage/carbon/commit/d6165777ed5ff55e72d6f981d3f623a351eb6b05))

## [59.0.0](https://github.com/Sage/carbon/compare/v58.1.0...v59.0.0) (2021-01-19)


### ⚠ BREAKING CHANGES

* **text-editor:** remove cancel and save buttons from the toolbar,
use toolbarElements prop to render custom elements such as these buttons

### Code Refactoring

* **text-editor:** allow user to render toolbar action controls ([d27b878](https://github.com/Sage/carbon/commit/d27b878d70d8526ef3d21d8c8577175da40d3589)), closes [#3444](https://github.com/Sage/carbon/issues/3444)

## [58.1.0](https://github.com/Sage/carbon/compare/v58.0.0...v58.1.0) (2021-01-18)


### Features

* add new `pod-manager` component ([8c418cd](https://github.com/Sage/carbon/commit/8c418cd3a7eb6df8af3db20867a71b9eccbfb1c6)), closes [#3046](https://github.com/Sage/carbon/issues/3046)

## [58.0.0](https://github.com/Sage/carbon/compare/v57.0.0...v58.0.0) (2021-01-12)


### ⚠ BREAKING CHANGES

* **menulist:** deprecated menu-list and menu-list-item components

### Miscellaneous Chores

* **menulist:** remove component ([f6d2a4b](https://github.com/Sage/carbon/commit/f6d2a4b6a5966e985525a57f6481f554f2a0b8dd))

## [57.0.0](https://github.com/Sage/carbon/compare/v56.1.0...v57.0.0) (2021-01-12)


### ⚠ BREAKING CHANGES

* **checkbox:** group-checkbox prop label is renamed to legend

There is a codemod available to assist with this upgrade
`npx carbon-codemod rename-prop <target> carbon-react/lib/components/checkbox-group label legend`
See https://github.com/Sage/carbon-codemod for more information.

### Code Refactoring

* **checkbox:** modify checkbox-group to use fieldset ([a3da4cc](https://github.com/Sage/carbon/commit/a3da4cc53f00f2e76d2857bbf0ea6a394741be93))

## [56.1.0](https://github.com/Sage/carbon/compare/v56.0.1...v56.1.0) (2021-01-11)


### Features

* **search:** added keyboard navigation to clear text button ([069dbab](https://github.com/Sage/carbon/commit/069dbabd11378fdad3e214acae5da9d56ca70b70)), closes [#3485](https://github.com/Sage/carbon/issues/3485)

### [56.0.1](https://github.com/Sage/carbon/compare/v56.0.0...v56.0.1) (2021-01-11)


### Bug Fixes

* **dialog:** dialog centering with dynamic content ([2f15659](https://github.com/Sage/carbon/commit/2f156596b89422246c019a2a49721b5bcb4401d3)), closes [#3470](https://github.com/Sage/carbon/issues/3470)

## [56.0.0](https://github.com/Sage/carbon/compare/v55.0.0...v56.0.0) (2021-01-08)


### ⚠ BREAKING CHANGES

* **flat-table:** default paddings of flat table cell removed,
cell should match row height or expand the row,
cell paddings should depend on FlatTable size prop

### Features

* **flat-table:** add aria-describedby prop ([ab52374](https://github.com/Sage/carbon/commit/ab52374ed0d2bda268e91bf627b5a86ef073d30b))
* **flat-table:** add caption prop ([617f8a9](https://github.com/Sage/carbon/commit/617f8a9e79d26921254b885e35ef85a6312a68ae))
* **flat-table:** add size prop to control cell size ([af095f9](https://github.com/Sage/carbon/commit/af095f9c2c9ae03ec70c0700dd21fdf10d2797e6))
* **flat-table:** add zebra stripes functionality ([f8c32db](https://github.com/Sage/carbon/commit/f8c32dbb82cf6c665c63468e49480b39d51cfa05))


### Bug Fixes

* **flat-table:** row header not highlighted ([efc3654](https://github.com/Sage/carbon/commit/efc3654fb51e18ebede9a982a6ba1e5dc0adf300))


### Code Refactoring

* **flat-table:** remove flat table cell default paddings ([ef4fa5b](https://github.com/Sage/carbon/commit/ef4fa5b9dddbb7b5cf01563fd7b89f862767bd0d))

## [55.0.0](https://github.com/Sage/carbon/compare/v54.6.2...v55.0.0) (2021-01-07)


### ⚠ BREAKING CHANGES

* **inputicon:** removed InputIcon decorator

### Code Refactoring

* **inputicon:** remove whole decorator ([ebe9dc2](https://github.com/Sage/carbon/commit/ebe9dc20c77e88f49cc1bcee8c9eb80149cf3979))

### [54.6.2](https://github.com/Sage/carbon/compare/v54.6.1...v54.6.2) (2021-01-07)


### Bug Fixes

* **menuitem:** check for null chldren ([58bf841](https://github.com/Sage/carbon/commit/58bf841be15af1045950483f0ba5a48688d3f0da)), closes [#3540](https://github.com/Sage/carbon/issues/3540)

### [54.6.1](https://github.com/Sage/carbon/compare/v54.6.0...v54.6.1) (2021-01-06)


### Bug Fixes

* **tabs:** prevent padding override for large tabs with siblings ([3387ca0](https://github.com/Sage/carbon/commit/3387ca08d0861553e3ef8e8bc4f85f72a5c4d543))

## [54.6.0](https://github.com/Sage/carbon/compare/v54.5.0...v54.6.0) (2021-01-04)


### Features

* **menu:** add scrollable block component ([4814977](https://github.com/Sage/carbon/commit/4814977945c7f4ae06556feca7b4ab3df31da8cb))

## [54.5.0](https://github.com/Sage/carbon/compare/v54.4.0...v54.5.0) (2020-12-30)


### Features

* **numeral-date:** add date parts internal validation ([b10a5f8](https://github.com/Sage/carbon/commit/b10a5f8508b2966e0f123b246ec189b6960f2910))

## [54.4.0](https://github.com/Sage/carbon/compare/v54.3.7...v54.4.0) (2020-12-24)


### Features

* **menu:** allow icon only, keyboard override and accessiblity props ([6f33d2a](https://github.com/Sage/carbon/commit/6f33d2ac4d353f41d3d0f318471d4b0331c80392)), closes [#3505](https://github.com/Sage/carbon/issues/3505) [#3292](https://github.com/Sage/carbon/issues/3292)

### [54.3.7](https://github.com/Sage/carbon/compare/v54.3.6...v54.3.7) (2020-12-22)


### Bug Fixes

* **carousel:** fix not unique slide selector id ([e2ddd4d](https://github.com/Sage/carbon/commit/e2ddd4d5e08cfe9569ce3e84a7396597fb3d0eb4))

### [54.3.6](https://github.com/Sage/carbon/compare/v54.3.5...v54.3.6) (2020-12-22)


### Bug Fixes

* **sidebar:** fix sidebar crashing while closing with enableBackgroundUI ([f5d7c47](https://github.com/Sage/carbon/commit/f5d7c4788047198b3e5fa705e21067e2c07c97ab))

### [54.3.5](https://github.com/Sage/carbon/compare/v54.3.4...v54.3.5) (2020-12-22)


### Bug Fixes

* **split-button:** fix accessibility issues ([670ab7c](https://github.com/Sage/carbon/commit/670ab7cd249b3a3be4f7eb92a175a7bc3ee2533a))

### [54.3.4](https://github.com/Sage/carbon/compare/v54.3.3...v54.3.4) (2020-12-18)


### Bug Fixes

* **menu:** allow null children ([237b62e](https://github.com/Sage/carbon/commit/237b62e30680e724ce59b1376ebf1e22df340bdb)), closes [#3497](https://github.com/Sage/carbon/issues/3497)

### [54.3.3](https://github.com/Sage/carbon/compare/v54.3.2...v54.3.3) (2020-12-18)


### Bug Fixes

* **submenu:** stop submenu width from flexing with parent ([95066a3](https://github.com/Sage/carbon/commit/95066a33b41afaa6ce9df66db9033fd1ee71bf70))

### [54.3.2](https://github.com/Sage/carbon/compare/v54.3.1...v54.3.2) (2020-12-18)


### Bug Fixes

* **navbar:** remove old styling to allow full width ([03542c0](https://github.com/Sage/carbon/commit/03542c0911b94e2020fad37743b0981e70f30a91))

### [54.3.1](https://github.com/Sage/carbon/compare/v54.3.0...v54.3.1) (2020-12-18)


### Bug Fixes

* **action-popover:** close action popover when submenu item is clicked ([993a07c](https://github.com/Sage/carbon/commit/993a07c5c01f99f4871b1b3df0159a4cfb37ffcc))
* **action-popover:** incorrect event capturing on outside click ([fedd9c1](https://github.com/Sage/carbon/commit/fedd9c1ed7f747d20727352f5c4492795e66d587))

## [54.3.0](https://github.com/Sage/carbon/compare/v54.2.0...v54.3.0) (2020-12-17)


### Features

* **box:** extend box to support scrollbar style ([1f7f691](https://github.com/Sage/carbon/commit/1f7f6912c17abf9aa843b44e57787cf639e55b9f))

## [54.2.0](https://github.com/Sage/carbon/compare/v54.1.2...v54.2.0) (2020-12-17)


### Features

* **search:** add styling for dark theme ([56b3779](https://github.com/Sage/carbon/commit/56b37793627cd0d7b4731fa7bc11c2fddaea367f))

### [54.1.2](https://github.com/Sage/carbon/compare/v54.1.1...v54.1.2) (2020-12-17)


### Bug Fixes

* **tooltip:** change tooltip text-align to be always left ([8b37b7e](https://github.com/Sage/carbon/commit/8b37b7e1966d153845d7dedff798e921756bd419))

### [54.1.1](https://github.com/Sage/carbon/compare/v54.1.0...v54.1.1) (2020-12-16)


### Bug Fixes

* fix withuniqueid hoc id assignment mechanism ([4d0e161](https://github.com/Sage/carbon/commit/4d0e161cd292f560501f0b2dabcbc12b57141e4f))

## [54.1.0](https://github.com/Sage/carbon/compare/v54.0.1...v54.1.0) (2020-12-16)


### Features

* **filterable-select:** clear filter on close ([f2e9bc3](https://github.com/Sage/carbon/commit/f2e9bc352ac6c2b948f3670c6090ef8437d70065))

### [54.0.1](https://github.com/Sage/carbon/compare/v54.0.0...v54.0.1) (2020-12-10)


### Bug Fixes

* **alert:** fix styling bug with close icon ([13cfc33](https://github.com/Sage/carbon/commit/13cfc336852d43be858548fdfeca5f66a5111213))

## [54.0.0](https://github.com/Sage/carbon/compare/v53.1.1...v54.0.0) (2020-12-09)


### ⚠ BREAKING CHANGES

* **fieldset:** Fieldset component no longer supports classic theme
* **select:** Experimental Select component has been removed, please use our new Select component  `import { Select, Option } from "carbon-react/lib/components/select"`
* **select-async:** SelectAsync component has been removed, please use our new Select component  `import { Select, Option } from "carbon-react/lib/components/select"`
Also check an example of how to provide data fetching functionality
https://carbon.sage.com/?path=/docs/select--with-is-loading-prop
* **date:** Date component no longer supports classic theme
* **textbox:** Textbox no longer supports classic theme
* **textarea:** Textarea input no longer supports classic theme
* **grouped-character:** GroupedCharacter no longer supports classic theme
* **decimal:** Experimental Decimal component no longer supports classic theme
* **date-range:** DateRange component no longer supports classic theme
* **simple-color-picker:** SimpleColorPicker component no longer supports classic theme
* **number:** Number input no longer supports classic theme

### Miscellaneous Chores

* **date:** remove classic theme support ([e856b97](https://github.com/Sage/carbon/commit/e856b97a842133afe21fe708e1920e2b5f2270a5))
* **date-range:** remove classic theme support ([9283b56](https://github.com/Sage/carbon/commit/9283b5681c2435980b5a5c4bdb462fcbe6e68c1f))
* **decimal:** remove classic theme support ([7eff047](https://github.com/Sage/carbon/commit/7eff0470110f18586f542ceb5dd42cb961e8c768))
* **fieldset:** remove classic theme support ([7f30056](https://github.com/Sage/carbon/commit/7f300561658c088e538fc04b697f082b73cd8123))
* **grouped-character:** remove classic theme support ([ef51f0f](https://github.com/Sage/carbon/commit/ef51f0f8b26cd7c0b831cb55928cb45a56ea7c3b))
* **number:** remove classic theme support ([5866222](https://github.com/Sage/carbon/commit/58662226e83b50dd931518885d841f20d7bce006))
* **select:** remove experimental select component ([95961f4](https://github.com/Sage/carbon/commit/95961f47926c4a5653075b781d92dd95f456de27))
* **select-async:** remove select-async component ([dcaf64c](https://github.com/Sage/carbon/commit/dcaf64c8e00b79d3cfaaab5d89331b51ee09a1c8))
* **simple-color-picker:** remove classic theme support ([66aa3cb](https://github.com/Sage/carbon/commit/66aa3cb16590e560df734758acab1827e3c99d2f))
* **textarea:** remove classic theme support ([3cfbbdd](https://github.com/Sage/carbon/commit/3cfbbdde02d0dd96f4a8c99467f7450d657f82ea))
* **textbox:** remove classic theme support ([c1081fb](https://github.com/Sage/carbon/commit/c1081fb680234d7c14735986403eb141b362e642))

### [53.1.1](https://github.com/Sage/carbon/compare/v53.1.0...v53.1.1) (2020-12-09)


### Bug Fixes

* **dialog:** fix styling for pill close icon ([ac11a2d](https://github.com/Sage/carbon/commit/ac11a2df9a6f1b6bec31535b0fc27539da5353d2))

## [53.1.0](https://github.com/Sage/carbon/compare/v53.0.0...v53.1.0) (2020-12-09)


### Features

* **filterable-select:** add infinite scroll callback ([5cd8ef2](https://github.com/Sage/carbon/commit/5cd8ef2e869d69dc89c6883ddfc7d152ec0cd0f3))
* **select:** add infinite scroll callback ([2836fed](https://github.com/Sage/carbon/commit/2836fedc106e47c39edf82eee640d7d709e2d357))
* **select:** add list height transition animation ([3fb5fb2](https://github.com/Sage/carbon/commit/3fb5fb25ac6a76fedac1ea8758fed1af1190dea3))

## [53.0.0](https://github.com/Sage/carbon/compare/v52.0.0...v53.0.0) (2020-12-08)


### ⚠ BREAKING CHANGES

* **action-popover:** Classic theme styling has been removed
* **action-toolbar:** Classic theme is no longer supported
* **dialog-full-screen/full-screen-heading:** removal of classic theme from dialog full screen component.

fixes FE-3633 and FE-3361
* **dismiss-button:** dismiss-button component is being removed as it is no longer used internally.
* **action-popover:** Classic theme styling has been removed
* **action-toolbar:** Classic theme is no longer supported
* **dialog-full-screen/full-screen-heading:** removal of classic theme from dialog full screen component.

fixes FE-3633 and FE-3361
* **dismiss-button:** dismiss-button component is being removed as it is no longer used internally.
* **action-popover:** Classic theme styling has been removed
* **dialog-full-screen/full-screen-heading:** removal of classic theme from dialog full screen component.

fixes FE-3633 and FE-3361
* **action-toolbar:** Classic theme is no longer supported
* **dismiss-button:** dismiss-button component is being removed as it is no longer used internally.

### Miscellaneous Chores

* **action-popover:** remove support for classic theme ([a80eaea](https://github.com/Sage/carbon/commit/a80eaea2902190e0573f0a0d9ae68a6f27fa847f))
* **action-popover:** remove support for classic theme ([8a60053](https://github.com/Sage/carbon/commit/8a600535bcc4c0f63e5367058340acd15bd0caa4))
* **action-popover:** remove support for classic theme ([d0bbc44](https://github.com/Sage/carbon/commit/d0bbc44aab016924e14bc3c067cf932bf27d7f97))
* **action-toolbar:** remove classic theme support ([a4e69c8](https://github.com/Sage/carbon/commit/a4e69c8b91cc51e37d7f4c3d07cf037b9e44ebe0))
* **action-toolbar:** remove classic theme support ([5221a63](https://github.com/Sage/carbon/commit/5221a63bf4728ae927db72cecde0578bcbb26b9c))
* **action-toolbar:** remove classic theme support ([96f3e2c](https://github.com/Sage/carbon/commit/96f3e2c459c0d861caa54825f596dac239d0e292))
* **dialog-full-screen/full-screen-heading:** remove classic theme ([a073d1f](https://github.com/Sage/carbon/commit/a073d1f4c87c821bf978c6b86d9f7c4fbd812b6f))
* **dialog-full-screen/full-screen-heading:** remove classic theme ([5679196](https://github.com/Sage/carbon/commit/5679196e9e42e41f18b90667f0527d039f06f537))
* **dialog-full-screen/full-screen-heading:** remove classic theme ([b7e2ad7](https://github.com/Sage/carbon/commit/b7e2ad7b6b23b6590b62cc00973df4e38d6c9934))
* **dismiss-button:** remove dismiss-button component ([61ea851](https://github.com/Sage/carbon/commit/61ea851e99ebdd533a51b6de07555b0083d252a2)), closes [#2647](https://github.com/Sage/carbon/issues/2647)
* **dismiss-button:** remove dismiss-button component ([b1d7302](https://github.com/Sage/carbon/commit/b1d73022078e41929bde3cf048a47e98e6111eda)), closes [#2647](https://github.com/Sage/carbon/issues/2647)
* **dismiss-button:** remove dismiss-button component ([d948ed5](https://github.com/Sage/carbon/commit/d948ed5a084e8871a00ef8fdc5e3017dc15eb311)), closes [#2647](https://github.com/Sage/carbon/issues/2647)

## [52.0.0](https://github.com/Sage/carbon/compare/v51.0.0...v52.0.0) (2020-12-08)


### ⚠ BREAKING CHANGES

* Components that render a button now default to `type=button` instead of `type=submit`. The `Button` component has not changed and you can still override the button type using the `type` prop.

### Bug Fixes

* prevent accidental form submission ([6286f5c](https://github.com/Sage/carbon/commit/6286f5cbc3fcc7a7671ba51a4f6e5900749adbd0)), closes [#3405](https://github.com/Sage/carbon/issues/3405)

## [51.0.0](https://github.com/Sage/carbon/compare/v50.3.1...v51.0.0) (2020-12-07)


### ⚠ BREAKING CHANGES

* **sort:** `asc` and `desc` are no more supported, there are new ones
`ascending` and `descending`

You will need replace
`<Sort sortType="asc" />`
with
`<Sort sortType="ascending" />`

Or you can use our codemod for replacing prop values
https://github.com/Sage/carbon-codemod/tree/master/transforms/replace-prop-value

### Features

* **sort:** add accessibility for screen readers ([10d0140](https://github.com/Sage/carbon/commit/10d01406496e55dcd0668ef48ff0c4c7626f936a))

### [50.3.1](https://github.com/Sage/carbon/compare/v50.3.0...v50.3.1) (2020-12-02)


### Bug Fixes

* **action-popover:** incorrect submenu proptype ([08f4117](https://github.com/Sage/carbon/commit/08f4117c92502f5a73b698f0e78ed10bd26f36fa))

## [50.3.0](https://github.com/Sage/carbon/compare/v50.2.0...v50.3.0) (2020-11-26)


### Features

* **tile:** add new `TileFooter` component ([9897490](https://github.com/Sage/carbon/commit/9897490648fd2d16355ed070fce37003ba184b72))

## [50.2.0](https://github.com/Sage/carbon/compare/v50.1.0...v50.2.0) (2020-11-26)


### Features

* **filterable-select:** add loader for async ([2953ae0](https://github.com/Sage/carbon/commit/2953ae0aba29525f10f48556b79d1eaa141b9d9f))
* **select:** add loader for async ([889a9a6](https://github.com/Sage/carbon/commit/889a9a6a69db9431682f2dd5aa6dbce9b218a03b))


### Bug Fixes

* **filterable-select:** when readonly pressing a key opens the list ([38fd162](https://github.com/Sage/carbon/commit/38fd162304bc418f0d2e944b7dc91a5dd18071df))
* **multi-select:** when readonly pressing a key opens the list ([1f2e9c3](https://github.com/Sage/carbon/commit/1f2e9c32eb10657710efe0c03eeb7ede511fbedd))
* **select:** proptype warning when option has object in value ([2001474](https://github.com/Sage/carbon/commit/20014742bc57b15d76767663aa69d419c6bb9087)), closes [#3327](https://github.com/Sage/carbon/issues/3327)
* **select:** typescript definitions not exported ([53e7a33](https://github.com/Sage/carbon/commit/53e7a3376d7329166530b7522c1f3ca88d7352e0))
* **select:** when readonly pressing a key opens the list ([9c5862f](https://github.com/Sage/carbon/commit/9c5862f001bd5bd810a19a548da8a8faa917e12a))

## [50.1.0](https://github.com/Sage/carbon/compare/v50.0.0...v50.1.0) (2020-11-25)


### Features

* **textbox:** add space props ([334852f](https://github.com/Sage/carbon/commit/334852ff5a667d37e15762b599c4bf91e65b85a4))

## [50.0.0](https://github.com/Sage/carbon/compare/v49.4.0...v50.0.0) (2020-11-25)


### ⚠ BREAKING CHANGES

* **row:** Row and Column components no loger support classic theme, also `.carbon-row` and `.carbon-column` classNames no longer exist, adjust your code accordingly before updating if your code relies on these classes.
* **table-ajax:** classic theme support has been removed
* **settings-row:** SettingsRow no longer support classic theme
* **table:** classic theme support has been removed
* **message:** Message component no logger support classic theme. Also `<Message as="info" roundedCorners border={false}>My Message</Message>` has been
removed in favour of `<Message variant="info">My Message</Message>`.

There is a codemod available to assist with this upgrade `npx carbon-codemod message-remove-classic-theme <target>`.

See https://github.com/Sage/carbon-codemod for more information
* **flash:** Flash component has been removed please use Toast component instead.
To help with migration please use our codemod `npx carbon-codemod replace-flash-with-toast <target>`
* **draggable-context:** draggable context components no longer supports classic theme

### Features

* **toast:** add timeout functionality ([8ea5018](https://github.com/Sage/carbon/commit/8ea5018e15b8a6b9c17365d74eaa742630e75326))


### Bug Fixes

* **message:** change incorrect type of title prop ([cbccfb6](https://github.com/Sage/carbon/commit/cbccfb60a776b4d157ab471a59cac05433b461f0))
* **toast:** correct toast propTypes descriptions ([9f07af1](https://github.com/Sage/carbon/commit/9f07af141ac03fcd11b7f9eedc1a2b58d275068f))


### Miscellaneous Chores

* **draggable-context:** remove classic theme support ([de92007](https://github.com/Sage/carbon/commit/de92007b514754b21e151255258b5fd4c656ed4b))
* **flash:** remove flash component ([658af77](https://github.com/Sage/carbon/commit/658af778d78e03123734a81aadfaf348134f7a35))
* **message:** remove classic theme support ([9d355b2](https://github.com/Sage/carbon/commit/9d355b26ba3762feec82e23a8266a1f8f202ea7d))
* **row:** remove classic theme support ([280a8b5](https://github.com/Sage/carbon/commit/280a8b5b5be63a0fa9c2957147733c2f908db172))
* **settings-row:** remove classic theme support ([d8bd20d](https://github.com/Sage/carbon/commit/d8bd20dd456542e6939a60cfb6c9ec65602a635e))
* **table:** remove classic theme support ([bdd3e07](https://github.com/Sage/carbon/commit/bdd3e07b0f3b7445f1fa7f75f1467c4d86a0e480))
* **table-ajax:** remove classic theme support ([df425a9](https://github.com/Sage/carbon/commit/df425a907f850646556f6ff2c482a03e771c39b9))

## [49.4.0](https://github.com/Sage/carbon/compare/v49.3.0...v49.4.0) (2020-11-20)


### Features

* **menu-item:** add prop to hide dropdown arrow for items with submenu ([ef9bc4d](https://github.com/Sage/carbon/commit/ef9bc4d5c449fcdeeb7abbc9616c3b9a1006141a))

## [49.3.0](https://github.com/Sage/carbon/compare/v49.2.0...v49.3.0) (2020-11-19)


### Features

* **action-popover:** add support to place menu above button ([929a438](https://github.com/Sage/carbon/commit/929a438f314de6bd43ba1899495e8cc10d3f7871))

## [49.2.0](https://github.com/Sage/carbon/compare/v49.1.0...v49.2.0) (2020-11-18)


### Features

* **select:** add option group headers ([83aa90a](https://github.com/Sage/carbon/commit/83aa90a740e20cc9eae30fadfd84dcb62c38e123))

## [49.1.0](https://github.com/Sage/carbon/compare/v49.0.2...v49.1.0) (2020-11-18)


### Features

* **definition-list:** add support for spacing props ([744812b](https://github.com/Sage/carbon/commit/744812b7f28e056055618858e66a9d3f533fa7ce)), closes [#3387](https://github.com/Sage/carbon/issues/3387)

### [49.0.2](https://github.com/Sage/carbon/compare/v49.0.1...v49.0.2) (2020-11-17)


### Bug Fixes

* **textarea:** align label with input text ([ca0c871](https://github.com/Sage/carbon/commit/ca0c8719cb7065da4396f5a8c4f6b11494d6a5dd)), closes [#3224](https://github.com/Sage/carbon/issues/3224)

### [49.0.1](https://github.com/Sage/carbon/compare/v49.0.0...v49.0.1) (2020-11-17)


### Bug Fixes

* **accordion:** update headings grid to allow subtitle to span columns ([3b2fa89](https://github.com/Sage/carbon/commit/3b2fa89b78b09fce540e6708649e36a8dc8a5e62))

## [49.0.0](https://github.com/Sage/carbon/compare/v48.7.1...v49.0.0) (2020-11-17)


### ⚠ BREAKING CHANGES

* **pages:** Removal of classic theme from the Pages component. Component no longer supports
classic theme.

fixes FE-3117
* **mount-in-app:** Removal of classic theme from the mount in app component. Component no longer
supports classic theme.

fixes FE-3116
* **menu-list:** Classic theme has been removed from the MenuList component. This component no
longer supports the classic theme.

fixes FE-3114
* **link:** Classic styling has been removed from the link the component. The link component no
longer supports the classic theme.

fixes FE-3113
* **menu-list:** Classic theme has been removed from the MenuList component. This component no
longer supports the classic theme.

fixes FE-3114
* **link:** Classic styling has been removed from the link the component. The link component no
longer supports the classic theme.

fixes FE-3113

### Miscellaneous Chores

* **link:** remove classic theme ([4a030e3](https://github.com/Sage/carbon/commit/4a030e37adeb945d367bc48c4d6667a2a3c552b7))
* **link:** remove classic theme ([0ebf9cc](https://github.com/Sage/carbon/commit/0ebf9cc970eda74b66166972ea01c231da04bf5b))
* **menu-list:** remove classic theme ([51167c6](https://github.com/Sage/carbon/commit/51167c669fd7b4fc01ca7a0163938a070034fc0e))
* **menu-list:** remove classic theme ([85786d8](https://github.com/Sage/carbon/commit/85786d89554d76beda8f06ea8c0eed421e6f5f0b))
* **mount-in-app:** remove classic theme ([9446069](https://github.com/Sage/carbon/commit/94460691c6f8bb3b16fafe6e240270a44ea404c6))
* **pages:** remove classic theme ([610841f](https://github.com/Sage/carbon/commit/610841f8ae006e2b862bbb4c43a887c552cdbbd8))

### [48.7.1](https://github.com/Sage/carbon/compare/v48.7.0...v48.7.1) (2020-11-13)


### Bug Fixes

* **flat-table:** fix incorrect type definitions ([d8a8597](https://github.com/Sage/carbon/commit/d8a8597accdd91f2e33052fc04c4255997214fc6))

## [48.7.0](https://github.com/Sage/carbon/compare/v48.6.3...v48.7.0) (2020-11-12)


### Features

* **flat-table:** add support for rendering table footer ([aa5ef93](https://github.com/Sage/carbon/commit/aa5ef93785e7fec2beb877742a4ec8c48d1c35a0))

### [48.6.3](https://github.com/Sage/carbon/compare/v48.6.2...v48.6.3) (2020-11-12)


### Bug Fixes

* **radio-button:** align legend with first radio-button ([c08ae52](https://github.com/Sage/carbon/commit/c08ae5252f55956bb2d1a0fb8d9af26e84b67d39)), closes [#3269](https://github.com/Sage/carbon/issues/3269)

### [48.6.2](https://github.com/Sage/carbon/compare/v48.6.1...v48.6.2) (2020-11-11)


### Bug Fixes

* **menu-divider:** add default cursor to passive submenu elements ([c449531](https://github.com/Sage/carbon/commit/c4495315a7fe909d43360d9ca0439c613fb1a670))

### [48.6.1](https://github.com/Sage/carbon/compare/v48.6.0...v48.6.1) (2020-11-09)


### Bug Fixes

* **menu-item:** add height when onclick passed and button renders ([cec05f3](https://github.com/Sage/carbon/commit/cec05f3580a5f5bf9fceb9953349d8a08a72f0f9)), closes [#3308](https://github.com/Sage/carbon/issues/3308)

## [48.6.0](https://github.com/Sage/carbon/compare/v48.5.0...v48.6.0) (2020-11-06)


### Features

* **menu-item:** add support for alternate background color variant ([bd14b40](https://github.com/Sage/carbon/commit/bd14b4015eba45a64e2e946ca5facf2ec184ec94))

## [48.5.0](https://github.com/Sage/carbon/compare/v48.4.0...v48.5.0) (2020-11-06)


### Features

* **dialog-full-screen:** add prop `disableContentPadding` ([95d2717](https://github.com/Sage/carbon/commit/95d2717da44720d620eec149b7d646f5799bc092))

## [48.4.0](https://github.com/Sage/carbon/compare/v48.3.1...v48.4.0) (2020-11-06)


### Features

* **navigation-bar:** add support for custom spacing props ([242d26e](https://github.com/Sage/carbon/commit/242d26e7261135bfc7cf8ac7dd4cde7e2ee46a56))


### Bug Fixes

* **radio-button:** warning when react node passed in label prop ([edbfb8f](https://github.com/Sage/carbon/commit/edbfb8fa023b5a2dcd16eb92037a72bfa61bb758))

### [48.3.1](https://github.com/Sage/carbon/compare/v48.3.0...v48.3.1) (2020-11-02)


### Bug Fixes

* **search:** fix story ([4ff48d9](https://github.com/Sage/carbon/commit/4ff48d917321ed122f303df350b3f43dd95036a8))
* **search:** fix styling ([60a1deb](https://github.com/Sage/carbon/commit/60a1deb0e782797243d2a63f154b06fb421c5bc9))
* **search:** search icon show in wrong time ([436a4f4](https://github.com/Sage/carbon/commit/436a4f475f34f53f8f4086301c56ed91cea0c0aa))
* **search:** work in controlled mode ([56f897f](https://github.com/Sage/carbon/commit/56f897f8a62743aa3b03420f55de1cca5926f9c1))

## [48.3.0](https://github.com/Sage/carbon/compare/v48.2.0...v48.3.0) (2020-11-02)


### Features

* **icon:** add custom color support ([7b69b04](https://github.com/Sage/carbon/commit/7b69b042e8998b185b1c4767e6f80ba84bca7a44))
* **pill:** add custom color support ([c542205](https://github.com/Sage/carbon/commit/c5422051419050a6e5c4dd5293fea784f078e293))

## [48.2.0](https://github.com/Sage/carbon/compare/v48.1.0...v48.2.0) (2020-11-02)


### Features

* **accordion:** add tertiary button heading styling option ([254f1de](https://github.com/Sage/carbon/commit/254f1de4bcd737c4c0eb3c812309ca89c070f972))

## [48.1.0](https://github.com/Sage/carbon/compare/v48.0.0...v48.1.0) (2020-10-30)


### Features

* **date:** add option to disable portal in component ([ec01acf](https://github.com/Sage/carbon/commit/ec01acf6a2f7bddf51b4a24918faa77eba57acbe))
* **select:** add option to disable portal in component ([b0013bf](https://github.com/Sage/carbon/commit/b0013bfaa79dc7afb8faf18dea7d553a9a1c0b47))


### Bug Fixes

* **date:** fix failing snapshots ([1bd4c06](https://github.com/Sage/carbon/commit/1bd4c0670f36f6848c3c6e7bf6387eb2eff431a1))
* **select:** fix select list positioning mechanism ([ee4686c](https://github.com/Sage/carbon/commit/ee4686cd1ac2e361ef3377d7e4bc956a8da0e232))

## [48.0.0](https://github.com/Sage/carbon/compare/v47.1.2...v48.0.0) (2020-10-30)


### ⚠ BREAKING CHANGES

* **accordion:** prop `customPadding` no longer exists, after adding `styled-system` you can add any padding you need to Accordion
To fix issues you will have to replace
```
<Accordion customPadding="50" />
```
with
```
<Accordion py="50px" />
```
to see more information about `styled-system` go visit https://styled-system.com/api

feat(accordion): add prop headerSpacing

headerSpacing prop allow you to use styled-system spacing API for Accordion Title

feat(accordion): add new prop `disableContentPadding`
* **tile:** - Tile will no longer support for padding prop  like `S, M, L, XL`
- Tile will now support styled-system values for the padding and margin. You can see more here https://styled-system.com/api

### Features

* **accordion:** add styled-system ([ca27839](https://github.com/Sage/carbon/commit/ca27839f09f27c112eb54cfd0dfb201610800f9a))
* **tile:** add styled-system ([e2de6fa](https://github.com/Sage/carbon/commit/e2de6fa0886bfa1da52ae2043de49ac3ed725da1))

### [47.1.2](https://github.com/Sage/carbon/compare/v47.1.1...v47.1.2) (2020-10-30)


### Bug Fixes

* **theme:** update base/none theme primary color ([173d35f](https://github.com/Sage/carbon/commit/173d35f898097d456ef9ab18aa84c451096f4ada))

### [47.1.1](https://github.com/Sage/carbon/compare/v47.1.0...v47.1.1) (2020-10-29)


### Bug Fixes

* **date:** datepicker incorrect weekday short names ([9947e44](https://github.com/Sage/carbon/commit/9947e44e522b0d9b58a5fbd89fcbfb0d57a3d91c))
* **date:** datepicker weekdays not translated ([0377971](https://github.com/Sage/carbon/commit/037797189f74524dc26da8108d1dede3929ef531)), closes [#3120](https://github.com/Sage/carbon/issues/3120)

## [47.1.0](https://github.com/Sage/carbon/compare/v47.0.0...v47.1.0) (2020-10-28)


### Features

* **filterable-select:** add list action button ([c2ef17a](https://github.com/Sage/carbon/commit/c2ef17a05861660f2f49b02081cd97db866ddc2d))


### Bug Fixes

* **button:** change forwardref proptype ([9e2599d](https://github.com/Sage/carbon/commit/9e2599d00ea19c3a48692006b8b43601386e4b40))

## [47.0.0](https://github.com/Sage/carbon/compare/v46.0.0...v47.0.0) (2020-10-27)


### ⚠ BREAKING CHANGES

* **color:** The `atOpacity` function has been removed from the
theme palette. To use this utility you should import it directly
`import atOpacity from “carbon-react/lib/style/utils/at-opacity`.

BREKAING CHANGE: The file “carbon-react/lib/style/index” has been
removed.
If you want to use `addOpacity` you can use `atOpacity` directly.
If you want to use `blackAtOpacity` you can use
`theme.palette.blackOpacity` or you can use `atOpacity` directly.
Please note that `blackAtOpacity` previously returned a white opacity
you can use `theme.palette.whiteOpacity` to keep this behaviour.
If you want to use `generatePalette` you can import it directly `import
generatePalette from “carbon-react/lib/style/palette`.

### Features

* **color:** add palette support to color props ([68a32d6](https://github.com/Sage/carbon/commit/68a32d63ac3dba4847becc39327cf9a4c5600f29))
* **typography:** create typography component ([45c981d](https://github.com/Sage/carbon/commit/45c981d67f8d598a7166f4aa91443b2e64bcd4f5))


### Bug Fixes

* **color:** add missing backgroundColor definitions ([2cd3afb](https://github.com/Sage/carbon/commit/2cd3afb90c85f2d3265952ae95c1d3803bbcc05c))

## [46.0.0](https://github.com/Sage/carbon/compare/v45.3.0...v46.0.0) (2020-10-27)


### ⚠ BREAKING CHANGES

* **grid-container:** change styled system spacing props from margin to padding

There is a codemod available to assist with this upgrade
`npx carbon-codemod rename-prop <target> carbon-react/lib/components/grid m p`
See https://github.com/Sage/carbon-codemod for more information.

### Bug Fixes

* **grid-container:** margins are not counted in scrollHeight ([81c2e5b](https://github.com/Sage/carbon/commit/81c2e5b7227c54ca63c93a8d89647f6a526c67fa))

## [45.3.0](https://github.com/Sage/carbon/compare/v45.2.1...v45.3.0) (2020-10-27)


### Features

* **box:** add new box component ([9d0df49](https://github.com/Sage/carbon/commit/9d0df497857d42a0f1d6c35c3ae2fbea1e9b1dae))

### [45.2.1](https://github.com/Sage/carbon/compare/v45.2.0...v45.2.1) (2020-10-26)


### Bug Fixes

* **inputs:** show input icon if info validation is empty string ([cdca91a](https://github.com/Sage/carbon/commit/cdca91aff59ed8e5266ddf8772362ac7a4683a26)), closes [#3137](https://github.com/Sage/carbon/issues/3137)

## [45.2.0](https://github.com/Sage/carbon/compare/v45.1.0...v45.2.0) (2020-10-26)


### Features

* **text-editor:** add support for validation icon and error styles ([9c6f114](https://github.com/Sage/carbon/commit/9c6f114faf2afb2ccc9fe4720efa23642739097c))

## [45.1.0](https://github.com/Sage/carbon/compare/v45.0.1...v45.1.0) (2020-10-22)


### Features

* **dialogfullscreen:** ability to add content to header ([d972587](https://github.com/Sage/carbon/commit/d972587330eed73deabcfb9eeac87a382d1572d1))

### [45.0.1](https://github.com/Sage/carbon/compare/v45.0.0...v45.0.1) (2020-10-22)


### Bug Fixes

* **radiobutton:** check for onchange passed in ([b5dacc6](https://github.com/Sage/carbon/commit/b5dacc6242ed66c50a0f1f245f28531ecbe509a1)), closes [#3263](https://github.com/Sage/carbon/issues/3263)

## [45.0.0](https://github.com/Sage/carbon/compare/v44.1.0...v45.0.0) (2020-10-22)


### ⚠ BREAKING CHANGES

* **help:** classic styling has been removed from the component

fixes FE-3110
* **heading:** removal of the classic styling from the heading component.

fixes FE-3109
* **confirm:** confirm component no longer supports classic styling

fixes FE-3104

### Miscellaneous Chores

* **confirm:** remove classic styling ([151cdfb](https://github.com/Sage/carbon/commit/151cdfbd80f84d86520bc0cc6eef9eb1504858fb))
* **heading:** remove classic theme ([649c264](https://github.com/Sage/carbon/commit/649c26456e3a73a669cc3c7a70449736c5b3f99d))
* **help:** remove classic theme ([a6b32c3](https://github.com/Sage/carbon/commit/a6b32c3bfaa34aa102bc1fcbf6d7ec7ba36edac7))

## [44.1.0](https://github.com/Sage/carbon/compare/v44.0.0...v44.1.0) (2020-10-21)


### Features

* **text-editor:** allow to focus editor when label is clicked ([3beaf2a](https://github.com/Sage/carbon/commit/3beaf2af6a1472e662f6c2b241f1870f3b0bdb08))

## [44.0.0](https://github.com/Sage/carbon/compare/v43.0.0...v44.0.0) (2020-10-20)


### ⚠ BREAKING CHANGES

* **tabs:** `setTarget` callback is no longer available, `onTabChange` should be used instead

### Bug Fixes

* **tabs:** tabs position left in sidebar and remove set target callback ([a3afc81](https://github.com/Sage/carbon/commit/a3afc813db8657925c343f62523d2a47c1000872)), closes [#3214](https://github.com/Sage/carbon/issues/3214)

## [43.0.0](https://github.com/Sage/carbon/compare/v42.6.0...v43.0.0) (2020-10-20)


### ⚠ BREAKING CHANGES

* **button-toggle:** button-toggle component no longer supports classic theme
* **step-sequence:** step-sequence and step-sequence-item components no longer supports classic theme
* **tooltip:** tooltip component no longer supports classic theme
* **icon:** Icon component no longer supports classic theme
* **show-edit-pod:** ShowEditPod component no longer supports classic theme, also `as` and `podType` props have been removed in favour of `variant` prop

There is a codemod available to assist with this upgrade
 `npx carbon-codemod rename-prop <target> carbon-react/lib/components/show-edit-pod as variant`
 or
  `npx carbon-codemod rename-prop <target> carbon-react/lib/components/show-edit-pod podType variant`

See https://github.com/Sage/carbon-codemod for more information.
* **pod:** Pod component no longer supports classic theme, also `as` and `podType` props have been removed in favour of `variant` prop

There is a codemod available to assist with this upgrade
 `npx carbon-codemod rename-prop <target> carbon-react/lib/components/pod as variant`
 or
  `npx carbon-codemod rename-prop <target> carbon-react/lib/components/pod podType variant`

See https://github.com/Sage/carbon-codemod for more information.
* **radio-button:** radio button component no longer supports classic theme
* **pill:** The classic theme has been removed from `Pill`. To
upgrade please use a DLS theme.
* **pill:** The `as` prop is no longer supported in `Pill`. It has
no effect when using a DLS theme. In future this will change the root
element so any existing usages should be removed.

Fixes FE-3089

### Miscellaneous Chores

* **button-toggle:** remove classic theme support ([75a2238](https://github.com/Sage/carbon/commit/75a22383ed4988c09f92bb89ac665c9d68ea55d1))
* **icon:** remove classic theme support ([2661503](https://github.com/Sage/carbon/commit/266150312e2079d5c584058ba3e24ea9d423c07a))
* **pill:** remove classic theme ([d765b95](https://github.com/Sage/carbon/commit/d765b954a9eff00ce1cac2e0ab5fd97a8ce56465))
* **pod:** remove classic theme support ([154e75f](https://github.com/Sage/carbon/commit/154e75f4243cae1e222a8218a71d9dad431099b8))
* **radio-button:** remove classic theme support ([a8a5e94](https://github.com/Sage/carbon/commit/a8a5e9449da671009b4df7948a74098ac882fdc6))
* **show-edit-pod:** remove classic theme support ([4517785](https://github.com/Sage/carbon/commit/451778533049c5218ed2f4c698f76f1a9153327d))
* **step-sequence:** remove classic theme support ([45eb633](https://github.com/Sage/carbon/commit/45eb633a07df1f8c85a3628b98123fb91f95de1c))
* **tooltip:** remove classic theme support ([d9f98d2](https://github.com/Sage/carbon/commit/d9f98d2b5f3c7cd616ac4261a2333376e453345f))

## [42.6.0](https://github.com/Sage/carbon/compare/v42.5.2...v42.6.0) (2020-10-16)


### Features

* **accordion:** add support to rendering validation icon beside heading ([4e0c130](https://github.com/Sage/carbon/commit/4e0c1301573a3f6e648b41b5507eeeaa022f1acc))

### [42.5.2](https://github.com/Sage/carbon/compare/v42.5.1...v42.5.2) (2020-10-16)


### Bug Fixes

* **label:** remove margin from label when input in form ([9f27214](https://github.com/Sage/carbon/commit/9f27214bd1f5c9ec31ef2a8ee77946c294ddc28c))

### [42.5.1](https://github.com/Sage/carbon/compare/v42.5.0...v42.5.1) (2020-10-15)


### Bug Fixes

* **filterable-select:** visible value cannot be cleared ([2b89fed](https://github.com/Sage/carbon/commit/2b89fed087ccbc6f2d0509608fde5a8f89f9ad66))
* **simple-select:** visible value cannot be cleared ([fbaa76f](https://github.com/Sage/carbon/commit/fbaa76f93f4632f60ee58a4597b4236e9032e497))

## [42.5.0](https://github.com/Sage/carbon/compare/v42.4.0...v42.5.0) (2020-10-14)


### Features

* add asterisk to required fields ([157e02e](https://github.com/Sage/carbon/commit/157e02e02d4881a677f48c4988ccaa044988cbab))

## [42.4.0](https://github.com/Sage/carbon/compare/v42.3.3...v42.4.0) (2020-10-14)


### Features

* **flat-table:** add possibility to set column width and cell paddings ([fcae564](https://github.com/Sage/carbon/commit/fcae564a1c499a2bf4becd9d384a975a6f51f712))


### Bug Fixes

* **flat-table:** update incorrect typescript prop definitions ([0749454](https://github.com/Sage/carbon/commit/0749454c43ae2cac845f8da48d7c7d961f4d65e0))

### [42.3.3](https://github.com/Sage/carbon/compare/v42.3.2...v42.3.3) (2020-10-13)


### Bug Fixes

* **validation:** renders tooltip in 'top' position when validation ([01884a7](https://github.com/Sage/carbon/commit/01884a77c858291f00afed2a016503ac45543c47)), closes [#3191](https://github.com/Sage/carbon/issues/3191)

### [42.3.2](https://github.com/Sage/carbon/compare/v42.3.1...v42.3.2) (2020-10-09)


### Bug Fixes

* **select:** stop passing onblur to style wrapper ([da246cf](https://github.com/Sage/carbon/commit/da246cf88f7a3d49d06e52f61f1091e8f37dbe23))

### [42.3.1](https://github.com/Sage/carbon/compare/v42.3.0...v42.3.1) (2020-10-07)


### Bug Fixes

* **search:** address alignment styling bug with search button ([5aa9307](https://github.com/Sage/carbon/commit/5aa93070356299974a1e8fd7feebafdc97145395))

## [42.3.0](https://github.com/Sage/carbon/compare/v42.2.0...v42.3.0) (2020-10-02)


### Features

* **button:** add spacing props ([abf89e3](https://github.com/Sage/carbon/commit/abf89e33593814381cf00c0f48416e3c1c95e601))
* **select:** add spacing props ([b3684de](https://github.com/Sage/carbon/commit/b3684de16e00c0fe3d0426e13d336ec783b211d4))

## [42.2.0](https://github.com/Sage/carbon/compare/v42.1.0...v42.2.0) (2020-10-02)


### Features

* **dialog full screen:** added reference to scrollable content ([00183f9](https://github.com/Sage/carbon/commit/00183f9035484f54afa3b7f6790796f22b2ecc7d)), closes [#3116](https://github.com/Sage/carbon/issues/3116)

## [42.1.0](https://github.com/Sage/carbon/compare/v42.0.0...v42.1.0) (2020-10-02)


### Features

* **accordion:** calculate content height on window resize ([2e8dd71](https://github.com/Sage/carbon/commit/2e8dd71be47933f9bad9fc0497247890d26c59f3))


### Bug Fixes

* **definition-list:** display as grid to enable content wrapping ([3af247a](https://github.com/Sage/carbon/commit/3af247a548a87bcab495372c2197de9764b46d24))

## [42.0.0](https://github.com/Sage/carbon/compare/v41.2.0...v42.0.0) (2020-09-30)


### ⚠ BREAKING CHANGES

* **switch:** switch component no longer supports classic theme
* **checkbox:** checkbox component no longer supports classic theme
* **sidebar:** The classic theme has been removed from sidebar. To
upgrade please use a DLS theme.

Fixes FE-3088
* **carousel:** The classic theme has been removed from carousel. To upgrade
please use a DLS theme.
* **carousel:** The `transition` prop has been removed from carousel. This was used in the classic theme.

fixes FE-2908

### Miscellaneous Chores

* **carousel:** remove classic theme ([6c44050](https://github.com/Sage/carbon/commit/6c44050afc227a6659f9abd71cf8b9df8c17af1b))
* **checkbox:** remove classic theme support ([99ad721](https://github.com/Sage/carbon/commit/99ad7217638e8d0f56bf2c26836c4c2185ac0360))
* **sidebar:** remove classic theme ([d3c1175](https://github.com/Sage/carbon/commit/d3c117557f4ed284f8764fafe67bf6e97667fe6b))
* **switch:** remove classic theme support ([53a22c0](https://github.com/Sage/carbon/commit/53a22c02d45bb330771541b46b796f9fb5b5a617))

## [41.2.0](https://github.com/Sage/carbon/compare/v41.1.1...v41.2.0) (2020-09-29)


### Features

* **vertical-divider:** add new component ([3b2eb23](https://github.com/Sage/carbon/commit/3b2eb2384ef8e924f5cda90e36b5abafe05ebbcb))

### [41.1.1](https://github.com/Sage/carbon/compare/v41.1.0...v41.1.1) (2020-09-21)


### Bug Fixes

* **help:** navigate to URL when href is set ([c7a3a7d](https://github.com/Sage/carbon/commit/c7a3a7d4c44fad74d1b109a08b277e19b11c22e9)), closes [#3009](https://github.com/Sage/carbon/issues/3009)

## [41.1.0](https://github.com/Sage/carbon/compare/v41.0.0...v41.1.0) (2020-09-21)


### Features

* **hr:** add styled-system spacing props ([4058325](https://github.com/Sage/carbon/commit/40583259b5f96b4aaba72cda28a3816d8e06c2d2))

## [41.0.0](https://github.com/Sage/carbon/compare/v40.6.0...v41.0.0) (2020-09-21)


### ⚠ BREAKING CHANGES

* **grid:** gridColumnStart and gridColumnEnd props in GridItem
and GridItem responsiveSettings replaced with gridColumn styled-system compatible prop,
gridRowStart and gridRowEnd props in GridItem and GridItem responsiveSettings
replaced with gridRow styled-system compatible prop

### Features

* **grid:** add styled-system cusom padding and margin props ([1144f9a](https://github.com/Sage/carbon/commit/1144f9a49e78446bf9f09de77f9fcf1d5d1603dc))

## [40.6.0](https://github.com/Sage/carbon/compare/v40.5.0...v40.6.0) (2020-09-18)


### Features

* **confirm:** add props (destructive and iconType) ([92fa833](https://github.com/Sage/carbon/commit/92fa8335b8ae263a29e5bc6d1740153de0012f9f))

## [40.5.0](https://github.com/Sage/carbon/compare/v40.4.1...v40.5.0) (2020-09-17)


### Features

* add adaptive props to input components ([7ed9b9c](https://github.com/Sage/carbon/commit/7ed9b9c21f0345cb2e12378d321a832b4c8cc9c6))

### [40.4.1](https://github.com/Sage/carbon/compare/v40.4.0...v40.4.1) (2020-09-15)


### Bug Fixes

* **button-toggle:** no focus outline when button is clicked ([af821eb](https://github.com/Sage/carbon/commit/af821ebf72b6e7529b6a343ff64cbefb8a168ece))

## [40.4.0](https://github.com/Sage/carbon/compare/v40.3.1...v40.4.0) (2020-09-15)


### Features

* **validations:** display validations when field is readOnly ([12a7047](https://github.com/Sage/carbon/commit/12a70475e29e6fcb4f6b8db191c711520737d21e)), closes [#3097](https://github.com/Sage/carbon/issues/3097)

### [40.3.1](https://github.com/Sage/carbon/compare/v40.3.0...v40.3.1) (2020-09-14)


### Bug Fixes

* **note:** update invariant to check inline control constructor ([8d504f0](https://github.com/Sage/carbon/commit/8d504f0a25ffc4a8d26466a26507342cad32b411)), closes [#3208](https://github.com/Sage/carbon/issues/3208)

## [40.3.0](https://github.com/Sage/carbon/compare/v40.2.0...v40.3.0) (2020-09-11)


### Features

* **icon:** add spacing props support ([193545b](https://github.com/Sage/carbon/commit/193545b2139bb1ccea06cfa101b74e64e614ff86))
* **pill:** add spacing props support ([e4b7ede](https://github.com/Sage/carbon/commit/e4b7ede8088d0c8d1c8edb63d1e819586abe941a))


### Bug Fixes

* **pill:** fix incorrect margin top applied to pill ([5be5816](https://github.com/Sage/carbon/commit/5be5816414a7f7d831ce366507a71dd7080ef468))

## [40.2.0](https://github.com/Sage/carbon/compare/v40.1.0...v40.2.0) (2020-09-10)


### Features

* **definition list:** create definition list component ([6af9b9b](https://github.com/Sage/carbon/commit/6af9b9b02095b79da5967c7dd31beb5b2d0b76c8))

## [40.1.0](https://github.com/Sage/carbon/compare/v40.0.0...v40.1.0) (2020-09-10)


### Features

* **textbox:** add prefix prop to display emphasized prefix ([bbbfdbb](https://github.com/Sage/carbon/commit/bbbfdbb44b3f6fc97af709cd733f9cd10f4cea66))


### Bug Fixes

* **input:** remove user agent input padding ([89d811e](https://github.com/Sage/carbon/commit/89d811ec48d21c0ca521acf9df279eb21f456915))

## [40.0.0](https://github.com/Sage/carbon/compare/v39.3.0...v40.0.0) (2020-09-08)


### ⚠ BREAKING CHANGES

* default spacings for input components have changed

### Features

* **button:** add margin props ([722b3d6](https://github.com/Sage/carbon/commit/722b3d6c08bc43b354442fbdc67bf9369fe27286))
* **form:** implement vertical spacing option ([87a53a8](https://github.com/Sage/carbon/commit/87a53a890eca60bf414a638f751d1ea7442c4933))
* **form-field:** implement horizontal label spacing option ([ffee308](https://github.com/Sage/carbon/commit/ffee308a979cf39f8af94fd46b47b6411c5d12d2))
* **switch:** add new props for switch alignment ([7b50282](https://github.com/Sage/carbon/commit/7b50282376cbed334365cc2ccdcafcf4ccd1b0b7))
* add margin left prop to checkable inputs ([70167ef](https://github.com/Sage/carbon/commit/70167efa00c05c26488437f045ae565edff49053))


### Miscellaneous Chores

* add breaking change message ([670851a](https://github.com/Sage/carbon/commit/670851a100f2166924eb6142ef30d8e65869e4f4))

## [39.3.0](https://github.com/Sage/carbon/compare/v39.2.1...v39.3.0) (2020-09-07)


### Features

* **drawer, tabs:** add support for custom target overrides via context ([7fe79d3](https://github.com/Sage/carbon/commit/7fe79d3d9ae9039a2ed34d1cb075df2bcc455d7d))

### [39.2.1](https://github.com/Sage/carbon/compare/v39.2.0...v39.2.1) (2020-09-04)


### Bug Fixes

* **button:** update onClick typescript definition ([bdd2dca](https://github.com/Sage/carbon/commit/bdd2dcaf9c9699173b8a19bdbca2c1ea7307364f))
* **numeral-date:** update onClick and onBlur typescript definition ([de25f13](https://github.com/Sage/carbon/commit/de25f1318b09a10a0bb7671b7a4463cf62073a23))

## [39.2.0](https://github.com/Sage/carbon/compare/v39.1.0...v39.2.0) (2020-09-04)


### Features

* **checkbox:** add spacing props ([e2a7c39](https://github.com/Sage/carbon/commit/e2a7c391c8c4c49c5b30818bdd25cffec5101c39))

## [39.1.0](https://github.com/Sage/carbon/compare/v39.0.0...v39.1.0) (2020-09-03)


### Features

* **menu:** add keyboard navigation ([8fa77e1](https://github.com/Sage/carbon/commit/8fa77e11b3c9b04158fc4c99d901c9d693ce8597))

## [39.0.0](https://github.com/Sage/carbon/compare/v38.2.0...v39.0.0) (2020-09-01)


### ⚠ BREAKING CHANGES

* **toast:** toast will be dismissed when esc key
is pressed, regardless of the focus on the close button
* **modal:** when multiple modals are being open,
esc key will close only the topmost one
* **icon-button:** esc key will no longer trigger onAction prop

### Features

* **toast:** dismiss toast on esc without focussing on the component ([ace80dd](https://github.com/Sage/carbon/commit/ace80dd0f9fd6a234413821b99a33e48dbc6d41f))


### Bug Fixes

* **icon-button:** 'esc' key triggers onAction closing a modal ([0fd16ba](https://github.com/Sage/carbon/commit/0fd16ba1f901d5f80d3de19ef967c316981c3f92))
* **modal:** esc key closes all nested modals ([47c4c26](https://github.com/Sage/carbon/commit/47c4c26bf6ab1a1be7b31db2020065b4a6803ca7))

## [38.2.0](https://github.com/Sage/carbon/compare/v38.1.4...v38.2.0) (2020-08-28)


### Features

* **tabs, tab:** add extendedline, borders, size, siblings, customlayout ([dbf7ce2](https://github.com/Sage/carbon/commit/dbf7ce2358b9e6cb5930b5ff8d62adf791cfeb39))


### Bug Fixes

* **tabs:** add support for component being controlled via ontabchange ([f70f4bb](https://github.com/Sage/carbon/commit/f70f4bb9639f231f581133f97c6e45bc92d40eac)), closes [#3170](https://github.com/Sage/carbon/issues/3170)

### [38.1.4](https://github.com/Sage/carbon/compare/v38.1.3...v38.1.4) (2020-08-27)


### Bug Fixes

* **batch-selection:** fix incorrect colorTheme proptypes ([1c20a37](https://github.com/Sage/carbon/commit/1c20a37e52a2c973f8fadbc0d524d5ea77666624))
* **storybook:** fix various story related errors ([07c96f4](https://github.com/Sage/carbon/commit/07c96f451832e90c90ffc7cfe9ecc130d48bee99))

### [38.1.3](https://github.com/Sage/carbon/compare/v38.1.2...v38.1.3) (2020-08-26)


### Bug Fixes

* **switch:** fix switch validation icon overlapping the label ([ce6575f](https://github.com/Sage/carbon/commit/ce6575f6939762b5f9ef8e3f9a0a2aa67b81cad7))

### [38.1.2](https://github.com/Sage/carbon/compare/v38.1.1...v38.1.2) (2020-08-26)


### Bug Fixes

* **confirm:** fix incorrect button order ([9ac9aea](https://github.com/Sage/carbon/commit/9ac9aea87e7d996cd2a1522abc73776e316e11bd))

### [38.1.1](https://github.com/Sage/carbon/compare/v38.1.0...v38.1.1) (2020-08-23)


### Bug Fixes

* **portrait:** remove incorrect size propType values ([8bcc171](https://github.com/Sage/carbon/commit/8bcc17101edaff59abe4c47c2f5aeb28a0029bb4))

## [38.1.0](https://github.com/Sage/carbon/compare/v38.0.2...v38.1.0) (2020-08-21)


### Features

* **navigation-bar:** add a loading state ([c5b5355](https://github.com/Sage/carbon/commit/c5b5355d01ca8b0d2c8f809ebfdd09f16b21ea35))

### [38.0.2](https://github.com/Sage/carbon/compare/v38.0.1...v38.0.2) (2020-08-21)


### Bug Fixes

* **pager:** fix incorrect prop types passed to page size select ([61bab41](https://github.com/Sage/carbon/commit/61bab41a5c91250d6500194ef7b6727e041da347)), closes [#3152](https://github.com/Sage/carbon/issues/3152)

### [38.0.1](https://github.com/Sage/carbon/compare/v38.0.0...v38.0.1) (2020-08-13)


### Bug Fixes

* **note:** remove min width to allow note to size dynamically ([8b0bef3](https://github.com/Sage/carbon/commit/8b0bef33c4e3b60cfd6774971f63055265450093))

## [38.0.0](https://github.com/Sage/carbon/compare/v37.3.0...v38.0.0) (2020-08-12)


### ⚠ BREAKING CHANGES

* **numeral-date:** NumeralDate onChange prop method arguments have been changed. Event.target.value will now have the same structure as the value passed as a prop to the component.

### Features

* **numeral-date:** add controlled uncontrolled mode switch warning ([e795696](https://github.com/Sage/carbon/commit/e795696e96dfdb272890cc5c8976d59adbd5dc6b))
* **numeral-date:** add label support to numeral date component ([c51ddd9](https://github.com/Sage/carbon/commit/c51ddd9cb9e9ed949179f56d28d9264aaaba9e05))
* **numeral-date:** restrict available date formats ([500a0f2](https://github.com/Sage/carbon/commit/500a0f23e72d502fae98d05429376faebf94ab4f))


### Bug Fixes

* **numeral-date:** fix incorrect onchange prop method arguments ([3828664](https://github.com/Sage/carbon/commit/3828664d752c861eb76d97ad9ca463b847cd5965))

## [37.3.0](https://github.com/Sage/carbon/compare/v37.2.0...v37.3.0) (2020-08-07)


### Features

* **icon:** added 2 new icons, flag and hide ([fb18f43](https://github.com/Sage/carbon/commit/fb18f43c991806ae46ebf03d7cc153b2007465f3))

## [37.2.0](https://github.com/Sage/carbon/compare/v37.1.0...v37.2.0) (2020-08-06)


### Features

* **validations:** show tooltip when input is hovered or focused ([c8d9360](https://github.com/Sage/carbon/commit/c8d9360fdd8145796e973ed035d69aae1815c2e1))


### Bug Fixes

* **label:** render icons outside of label element ([e1fc428](https://github.com/Sage/carbon/commit/e1fc4281119ab53557d00f961bf290a8e891143e))

## [37.1.0](https://github.com/Sage/carbon/compare/v37.0.0...v37.1.0) (2020-08-05)


### Features

* add new MultiSelect component ([fe43a50](https://github.com/Sage/carbon/commit/fe43a50e99107b5e6b551cfc32d07d7f93b2bd94))

## [37.0.0](https://github.com/Sage/carbon/compare/v36.0.0...v37.0.0) (2020-08-03)


### ⚠ BREAKING CHANGES

* **note:** The following props are now required for the Note component.
- noteContent
- name
- createdDate
- status.text if status is provided
- status.timeStamp if status is provided
- inlineControl must be an instance of ActionPopover

### Bug Fixes

* **note:** add default theme ([915dbcf](https://github.com/Sage/carbon/commit/915dbcf183b32aa2c155409f0770818c46d7fea2))
* **note:** enforce required props ([4e8f09a](https://github.com/Sage/carbon/commit/4e8f09abb2490cb3114e70e0720db9b7baabf2c2))

## [36.0.0](https://github.com/Sage/carbon/compare/v35.4.0...v36.0.0) (2020-07-29)


### ⚠ BREAKING CHANGES

* The with-validation higher order component and custom validators have been removed.
To update please check our validations guide in docs/validations
* The deprecated form component has been
removed. To upgrade please use the new form component.
* The experimental form component has been
removed. To upgrade please use the new form component.
* The deprecated input-label decorator has been removed
* The deprecated input-validation decorator has been removed
* The deprecated input decorator has been removed
* The deprecated input-decorator-bridge has been removed.
* The deprecated dropdown component has been removed. To upgrade please use the select component.
* The deprecated spinner component has been
removed. To upgrade please use the loader component.
* The deprecated animated-menu-button component has been removed.
* Deprecated Textbox has been removed. To upgrade please use the experimental Textbox component.
* The deprecated Filter component has been removed
* **show-edit-pod:** afterFormValidation, beforeFormValidation and validateOnMount props on ShowEditPod has been removed, onSave callback has been added which is triggered by clicking on save button
* The deprecated create component has been removed.
To upgrade please use the Button component. [There is codemod to help with this upgrade.](
https://github.com/Sage/carbon-codemod/tree/master/transforms/deprecate-create)

Fixes FE-1921, fixes FE-2875
* The deprecated dropdown-filter component has been removed.
* The deprecated dropdown-filter-ajax component has been removed.

Fixes FE-1921
* The deprecated date component has been removed. To
upgrade please use the experimental date component.

Fixes FE-1921
* The deprecated date-range component has been removed. To
upgrade please use the experimental date-range component.

Fixes FE-1921
* The deprecated fieldset component has been removed. To
upgrade please use the experimental fieldset component.

Fixes FE-1921
* The deprecated radio-button component has been removed.
To upgrade please use the experimental radio-button component.

Fixes FE-1921
* The deprecated simple-color-picker component has been
removed. To upgrade please use the experimental simple-color-picker component.

Fixes FE-1921

### Miscellaneous Chores

* remove custom validators and with-validation hoc ([ee37d49](https://github.com/Sage/carbon/commit/ee37d4955b4ab757b7220eeb9a911a8ca7cc00a9))
* remove deprecated animated-menu-button component ([8332008](https://github.com/Sage/carbon/commit/8332008a811d02487c7c41ba548d009cecb7de3e))
* remove deprecated create component ([6801af4](https://github.com/Sage/carbon/commit/6801af4655647e4b90860b4fea68de842aae2508))
* remove deprecated date component ([e32dbbf](https://github.com/Sage/carbon/commit/e32dbbf21b7e47480aa9d1ed1b2d2d82e14540af))
* remove deprecated date-range component ([f7e3d20](https://github.com/Sage/carbon/commit/f7e3d20bda2eb7064811e1c60a098f170384b5b7))
* remove deprecated dropdown component ([b0ba9be](https://github.com/Sage/carbon/commit/b0ba9be1d8fe66758a1bb652b06240efe75bb9b7))
* remove deprecated dropdown-filter component ([a7d0a5c](https://github.com/Sage/carbon/commit/a7d0a5ceb9d11396d7aa3169647468c7db512e44)), closes [#2913](https://github.com/Sage/carbon/issues/2913)
* remove deprecated dropdown-filter-ajax component ([a97082b](https://github.com/Sage/carbon/commit/a97082b1683ee43578fc6eef650c413bf7f42e8e))
* remove deprecated fieldset component ([b43c9f5](https://github.com/Sage/carbon/commit/b43c9f5fc9c1292a76e9e503068eca1ae60ad69b))
* remove deprecated filter component ([ced84b7](https://github.com/Sage/carbon/commit/ced84b759826993c63de1a3aa36aa5db0d5ff18c))
* remove deprecated form component ([9b2f62f](https://github.com/Sage/carbon/commit/9b2f62fb377ddbceb54d6666deeb229e5129d824))
* remove deprecated input decorator ([e5f5c9e](https://github.com/Sage/carbon/commit/e5f5c9e780183c7e3a7b700aa575676c53e9f94b))
* remove deprecated input-decorator-bridge ([fc9e19b](https://github.com/Sage/carbon/commit/fc9e19bb08228d361c52c252b1e151f45793e700))
* remove deprecated input-label decorator ([8bc6963](https://github.com/Sage/carbon/commit/8bc69631c69c190e112f4b63a5c78289b9058088))
* remove deprecated input-validation decorator ([a63b192](https://github.com/Sage/carbon/commit/a63b19273436931c772b719a259a3ef30aad62b2))
* remove deprecated radio-button component ([1b380cd](https://github.com/Sage/carbon/commit/1b380cd496cff2f17a5437144e6505209c928966))
* remove deprecated simple-color-picker component ([f0360f9](https://github.com/Sage/carbon/commit/f0360f937b2247fa14f0f910fb37ce155220c707))
* remove deprecated spinner component ([4806a2a](https://github.com/Sage/carbon/commit/4806a2a8194907a8cd416a0eb1ab1af5df5ec89a))
* remove deprecated textbox ([d438355](https://github.com/Sage/carbon/commit/d43835524046e4ac37d1ba2c5e3a207499fb0594))
* remove experimental form component ([d1b7f4f](https://github.com/Sage/carbon/commit/d1b7f4f80eb1326e6d716e6509e53905a1fa26c9))
* **show-edit-pod:** replace deprecated Form component ([9cb9faa](https://github.com/Sage/carbon/commit/9cb9faa001689d857b30ed1d397f0a6db8354221))

## [35.4.0](https://github.com/Sage/carbon/compare/v35.3.0...v35.4.0) (2020-07-29)


### Features

* **tabs, tab:** make components functional use new context api and ([e0bb281](https://github.com/Sage/carbon/commit/e0bb281c6f3f7b19bf1093dd0afec45d8b563a19))

## [35.3.0](https://github.com/Sage/carbon/compare/v35.2.0...v35.3.0) (2020-07-29)


### Features

* **hr:** add new hr component ([f57fc38](https://github.com/Sage/carbon/commit/f57fc38e6a5f181c9fa8be7a1202f70467a2d5fa))

## [35.2.0](https://github.com/Sage/carbon/compare/v35.1.1...v35.2.0) (2020-07-23)


### Features

* **accordion:** enable custom padding ([cd67639](https://github.com/Sage/carbon/commit/cd6763964b88de4194537d58ea853d228c31c5a2))
* **accordion:** enable custom width ([61651e8](https://github.com/Sage/carbon/commit/61651e8bf6c7707e6ccf2d570ae9db1cbbb47b61))
* **accordion:** implement full border ([ef02757](https://github.com/Sage/carbon/commit/ef02757634f713f7e9c749a9827900ce93f980c2))
* **accordion:** implement large and small size ([00374c3](https://github.com/Sage/carbon/commit/00374c3506749947965b534c0a53848cf52a1814))
* **accordion:** implement white and transparent scheme ([f6490d0](https://github.com/Sage/carbon/commit/f6490d0cb9220873db2ba90cd5fc8bba03349863))

### [35.1.1](https://github.com/Sage/carbon/compare/v35.1.0...v35.1.1) (2020-07-17)


### Bug Fixes

* **dialog:** auto focus dialog when opened ([4322681](https://github.com/Sage/carbon/commit/432268110a1feea23d60e7b77f6e493c5b3cfd87)), closes [#2960](https://github.com/Sage/carbon/issues/2960)

## [35.1.0](https://github.com/Sage/carbon/compare/v35.0.0...v35.1.0) (2020-07-17)


### Features

* **note:** create component and tooltip status ([834fe52](https://github.com/Sage/carbon/commit/834fe529fb42a501a9ec2627b4f2204a3e8ff6b7))

## [35.0.0](https://github.com/Sage/carbon/compare/v34.0.2...v35.0.0) (2020-07-17)


### ⚠ BREAKING CHANGES

* The deprecated rainbow component has been removed. There is no suitable replacement within carbon so please find an alternative library for your use case.

### Miscellaneous Chores

* remove deprecated rainbow component ([f0b97ef](https://github.com/Sage/carbon/commit/f0b97efa565fbda0f9d8baf7c806f27b649e0012)), closes [#3008](https://github.com/Sage/carbon/issues/3008)

### [34.0.2](https://github.com/Sage/carbon/compare/v34.0.1...v34.0.2) (2020-07-16)


### Bug Fixes

* **text-editor:** update styling for lists ([a2fe8eb](https://github.com/Sage/carbon/commit/a2fe8ebbf37419d2f9f87bb7ad5b0d980dbb8b87))

### [34.0.1](https://github.com/Sage/carbon/compare/v34.0.0...v34.0.1) (2020-07-16)


### Bug Fixes

* **tooltip:** ensure toolip repositions when off screen ([25b1c4a](https://github.com/Sage/carbon/commit/25b1c4af989621f2b20901956fd942df61bed083))

## [34.0.0](https://github.com/Sage/carbon/compare/v33.3.0...v34.0.0) (2020-07-16)


### ⚠ BREAKING CHANGES

* **menu:** `Menu` scheme colors `primary` and `secondary` no
longer exists.
To upgrade replace
`<Menu menuType="primary" />` with `<Menu />`
or
`<Menu menuType="secondary" />` with `<Menu menuType="dark" />`
* **menu:** The `Menu` prop `divide` no longer exists.
To upgrade replace `<MenuItem divide />` with
`<MenuDivider /><MenuItem />`

Fixes FE-2315

### Features

* **menu:** update visual appearance to match design system ([3b30e4e](https://github.com/Sage/carbon/commit/3b30e4e79d264fb83d8c86dfc87ff89149eadbc1))

## [33.3.0](https://github.com/Sage/carbon/compare/v33.2.0...v33.3.0) (2020-07-15)


### Features

* add new FilterableSelect Component ([ae2833b](https://github.com/Sage/carbon/commit/ae2833b595d0fba22b9094aa8f151915ccfb2f2a))
* add new SimpleSelect Component ([d6c6ec3](https://github.com/Sage/carbon/commit/d6c6ec33bd9ab4a6a75b3402a4eac582f5555c84))


### Bug Fixes

* **input-icon-toggle:** add missing onMouseDown prop ([b0ab93a](https://github.com/Sage/carbon/commit/b0ab93a84ebd4b7ec4660b726f72a0067c02f561))

## [33.2.0](https://github.com/Sage/carbon/compare/v33.1.0...v33.2.0) (2020-07-13)


### Features

* **text-editor:** add new text editor component ([3717bb9](https://github.com/Sage/carbon/commit/3717bb9fd9b37ee5c9266aeacac7b02f2140e713))

## [33.1.0](https://github.com/Sage/carbon/compare/v33.0.1...v33.1.0) (2020-07-13)


### Features

* **table-ajax:** replace deprecated spinner with loader component ([855bc25](https://github.com/Sage/carbon/commit/855bc2576bc2c2d4bbeef0483bb9a7344da102ad))

### [33.0.1](https://github.com/Sage/carbon/compare/v33.0.0...v33.0.1) (2020-07-09)


### Bug Fixes

* **menu-item:** `routerLink` prop is not provided when there is no submenu ([92b601e](https://github.com/Sage/carbon/commit/92b601e62a3b7081faba94d976794f43f2ce58cb)), closes [#3056](https://github.com/Sage/carbon/issues/3056)

## [33.0.0](https://github.com/Sage/carbon/compare/v32.0.3...v33.0.0) (2020-07-08)


### ⚠ BREAKING CHANGES

* **navigation-bar:** `as` prop is no more supported as the prop is reserved for Styled-Components.
there is new prop called `navigationType`.
Also `primary` and `secondary` has been replaced with `light` and `dark`.
After update you will need to replace
`<NavigationBar as="primary" />` with `<NavigationBar />`
or
`NavigationBar as="secondary" />` with `<NavigationBar navigationType="dark" />`

### Features

* **navigation-bar:** update component ([7815170](https://github.com/Sage/carbon/commit/7815170858f05a90b8747f8f616e9f7909f96386))

### [32.0.3](https://github.com/Sage/carbon/compare/v32.0.2...v32.0.3) (2020-07-08)


### Bug Fixes

* **switch:** fix misaligned validation icon on large switch ([afc2f68](https://github.com/Sage/carbon/commit/afc2f68b5a6de1a9001ca18daf4b30bf94db89dc))

### [32.0.2](https://github.com/Sage/carbon/compare/v32.0.1...v32.0.2) (2020-07-02)


### Bug Fixes

* **filter:** add deprecation warning ([373a9b4](https://github.com/Sage/carbon/commit/373a9b416277aea11ee36c40db48cd5c070a7baa))

### [32.0.1](https://github.com/Sage/carbon/compare/v32.0.0...v32.0.1) (2020-06-30)


### Bug Fixes

* **anchor-navigation:** fix anchor navigation item prop type definitions ([0605c7a](https://github.com/Sage/carbon/commit/0605c7a25523ebff2748bda96a7452b309caa6ad))

## [32.0.0](https://github.com/Sage/carbon/compare/v31.1.1...v32.0.0) (2020-06-29)


### ⚠ BREAKING CHANGES

* **menu:** prop `as` has been replaced with `menuType`. Keyword `as` is reserved for
Styled-Components.
To update your components you will need to replace
`<Menu as="primary" />` with `<Menu menuType="primary" />`

### Code Refactoring

* **menu:** refactor component ([ea2e727](https://github.com/Sage/carbon/commit/ea2e7272faadfeea4b2a08caf3367db1e6e7f137))

### [31.1.1](https://github.com/Sage/carbon/compare/v31.1.0...v31.1.1) (2020-06-26)


### Bug Fixes

* increase width on validation labels ([a10e90e](https://github.com/Sage/carbon/commit/a10e90eafe336c35b6b8d878caf38efbefa41026))

## [31.1.0](https://github.com/Sage/carbon/compare/v31.0.0...v31.1.0) (2020-06-25)


### Features

* **button:** add full-width buttons ([82e96b4](https://github.com/Sage/carbon/commit/82e96b4e24601bd7232759f08caa50d28db01934))

## [31.0.0](https://github.com/Sage/carbon/compare/v30.1.0...v31.0.0) (2020-06-23)

These breaking changes were reverted, there are no breaking changes in this release.

## [30.1.0](https://github.com/Sage/carbon/compare/v30.0.0...v30.1.0) (2020-06-15)


### Features

* **icon:** added 15 new icons ([922d68d](https://github.com/Sage/carbon/commit/922d68dd784b7d3e147f1cbc773fa9727ff6d836))

## [30.0.0](https://github.com/Sage/carbon/compare/v29.0.0...v30.0.0) (2020-06-12)


### ⚠ BREAKING CHANGES

* The deprecated grouped-character component has been
removed. To upgrade please use the experimental grouped-character
component.

### Miscellaneous Chores

* remove deprecated grouped-character component ([44d26b2](https://github.com/Sage/carbon/commit/44d26b20ebe68776434d37dad2f6481ab45c0a0a))

## [29.0.0](https://github.com/Sage/carbon/compare/v28.0.0...v29.0.0) (2020-06-12)


### ⚠ BREAKING CHANGES

* The deprecated textarea component has been removed. To
upgrade please use the experimental textarea component.

Fixes FE-1921

### Miscellaneous Chores

* remove deprecated textarea component ([052ce56](https://github.com/Sage/carbon/commit/052ce5623674994a0bf6d6757db124db30e74e9f))

## [28.0.0](https://github.com/Sage/carbon/compare/v27.0.0...v28.0.0) (2020-06-11)


### ⚠ BREAKING CHANGES

* The deprecated number component has been removed. To
upgrade please use the experimental number component.

Fixes FE-1921

### Miscellaneous Chores

* remove deprecated number component ([badcaf1](https://github.com/Sage/carbon/commit/badcaf1763b69d1ad912114b19ce7a739ee682fb))

## [27.0.0](https://github.com/Sage/carbon/compare/v26.0.0...v27.0.0) (2020-06-11)


### ⚠ BREAKING CHANGES

* The deprecated decimal component has been removed. To
upgrade please use the experimental decimal component.

### Miscellaneous Chores

* remove deprecated decimal component ([78eb3ce](https://github.com/Sage/carbon/commit/78eb3ce723d2f78d24d2de97d0d6f67fb00702be))

## [26.0.0](https://github.com/Sage/carbon/compare/v25.0.0...v26.0.0) (2020-06-11)


### ⚠ BREAKING CHANGES

* The deprecated checkbox component has been removed. To
upgrade please use the experimental checkbox.
* The classic theme is no longer supported. To upgrade
please use a DLS theme.

### Miscellaneous Chores

* remove classic theme from configurable-items ([74e1434](https://github.com/Sage/carbon/commit/74e1434fd587d00c6208e54f5d67bfc95eaa62d9))
* remove deprecated checkbox component ([1f30e6d](https://github.com/Sage/carbon/commit/1f30e6dde3108a0c53f4e9df1b15b83c517c1c68))

## [25.0.0](https://github.com/Sage/carbon/compare/v24.0.1...v25.0.0) (2020-06-10)


### ⚠ BREAKING CHANGES

* The deprecated switch component has been removed. To
upgrade please use the experimental switch component.

Fixes FE-1921

### Miscellaneous Chores

* remove deprecated switch component ([fe7ddc2](https://github.com/Sage/carbon/commit/fe7ddc2548964f5aa3c9538d1ab762db80844810))

### [24.0.1](https://github.com/Sage/carbon/compare/v24.0.0...v24.0.1) (2020-06-10)


### Bug Fixes

* **button-toggle:** onBlur not being passed on button toggle input ([1287a19](https://github.com/Sage/carbon/commit/1287a19631298f928ed91025dec2601f0a376b7a))

## [24.0.0](https://github.com/Sage/carbon/compare/v23.2.1...v24.0.0) (2020-06-09)


### ⚠ BREAKING CHANGES

* **validations:** validator functions applied to inputs no longer work, validations have to be handled externally by the consumer of the library
* **validations:** remove support for `validations`, `warnings`, `info`, `hasError`, `hasWarning`, `hasInfo`, `tooltipMessage`, `inputIcon`, `forceUpdateTriggerToggle`, `addInputToFormState`, `unblockValidation`, `useValidationIcon` from all inputs and input groups
to display validation visuals use new `error`, `warning` and `info` props - check components props descriptions for more details
* **validations:** remove support for `startMessage` and `endMessage` from `DateRange`
to display validation visuals use new `startError`, `endError`, `startWarning`, `endWarning`, `startInfo` and `endInfo` props - check `DateRange` props description for more details
* **validations:** rename `labelInline` to `legendInline` on `RadioButtonGroup`

### Features

* **validations:** implement new input validations interface ([0015029](https://github.com/Sage/carbon/commit/0015029c46d75f68d60884019d59e5d01afd2ce4))

### [23.2.1](https://github.com/Sage/carbon/compare/v23.2.0...v23.2.1) (2020-06-05)


### Bug Fixes

* **drawer:** drawer update ([2835f99](https://github.com/Sage/carbon/commit/2835f99569615ce3164ff6e5691d31393f27a131)), closes [#2918](https://github.com/Sage/carbon/issues/2918)

## [23.2.0](https://github.com/Sage/carbon/compare/v23.1.0...v23.2.0) (2020-06-04)


### Features

* **grid-item:** add align and justify props ([e8ed5ef](https://github.com/Sage/carbon/commit/e8ed5efd9f93205c054c679bdac2db4e29735272))

## [23.1.0](https://github.com/Sage/carbon/compare/v23.0.0...v23.1.0) (2020-06-03)


### Features

* **tile-select:** create tile-select component ([ec7273f](https://github.com/Sage/carbon/commit/ec7273fb53593d76a07ddb8bd83db815a6cf787a))

## [23.0.0](https://github.com/Sage/carbon/compare/v22.2.0...v23.0.0) (2020-06-02)


### ⚠ BREAKING CHANGES

* removes classic theme support from profile
* **profile:** removes classic theme support from profile

### Bug Fixes

* **profile:** profile story not loading in storybook ([2599f42](https://github.com/Sage/carbon/commit/2599f428121e321da79db031e314e7bd3a1c2368))


* Merge pull request #2966 from Sage/FE-2822-profile-storybook-error ([619da30](https://github.com/Sage/carbon/commit/619da3029b5bd5e4a39c45586e8d92002330abbb)), closes [#2966](https://github.com/Sage/carbon/issues/2966)

## [22.2.0](https://github.com/Sage/carbon/compare/v22.1.1...v22.2.0) (2020-06-01)


### Features

* **drawer, flat-table, flat-table-row:** add sidebar context ([4351fae](https://github.com/Sage/carbon/commit/4351fae87dce5648542b027e2d6f18a14970a9f9))

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
