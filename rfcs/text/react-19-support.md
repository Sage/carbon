# React 19 support baseline and inventory

- Start Date: 2026-11-27
- Status: Spike, baseline and inventory complete; React 19 execution pending
- Baseline: Carbon 164.1.0, commit [`6b3626c`](https://github.com/Sage/carbon/commit/6b3626c6ea16a5051d621b58e8a2666e469408dc)

## Summary

Support React 18 and React 19 in the same Carbon release so consuming teams can migrate independently. Removing React 17 support is separate work.

The initial audit points towards targeted ref, type and tooling changes. Existing hooks, `forwardRef` and `useImperativeHandle` can remain. This branch records the findings and the unchanged React 18 baseline; it does not declare React 19 support or implement compatibility fixes.

## Motivation

Carbon consumers need time to move to React 19 without maintaining separate Carbon implementations. The spike should establish which changes are necessary, preserve existing component contracts and provide repeatable checks against both React versions.

## Baseline checks

The audit covers 1,787 tracked JavaScript and TypeScript files under `src`, including 966 production files after excluding tests, stories and spec helpers. Syntax-tree counts exclude comments and generated files. Additional searches cover Storybook, Playwright, documentation and CI configuration.

The baseline ran on Node 26.13.1 with React and React DOM 18.3.1, `@types/react` 18.3.23, `@types/react-dom` 18.3.7 and TypeScript 5.8.3. Installation used npm 11.21.1, matching CI; subsequent scripts used the host npm 11.20.0. Future runs should consistently use the repository-required npm version.

| Check                                                | Result                                                                                   |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Locked install with npm 11.21.1                      | Passed; 1,917 packages, lifecycle scripts disabled consistently with `.npmrc`            |
| `npm run build`                                      | Passed, including type checking, CJS/ESM output and both declaration builds              |
| `npm run lint`                                       | Passed; 214 warnings, no errors                                                          |
| Full Jest run with two workers and coverage disabled | 321 suites passed, one failed; 9,787 tests passed, four failed; all ten snapshots passed |
| Isolated failing suite with `--runInBand`            | 109 tests passed, six failed                                                             |

All failures are in `src/__internal__/popover-menu/popover-menu.test.tsx`. Four variants of submenu Tab/Shift+Tab closing fail at line 1926. The isolated rerun also fails two related portalled-parent-menu cases at line 1847. Expected focus is on `Subitem 1`, but remains on `Item 1`. The original four failures repeat before any React 19 changes. The root cause and variation between runs remain unresolved.

The baseline does not cover browser component execution, a Storybook build, Node 24, the oldest supported React 18 version, published-package consumers or coverage thresholds. React 19 has not been installed or executed. Existing CI varies Node 24/26 and test shards, but has no React version axis.

Exact commands, environment and failed test names are in [baseline results](./react-19-support/baseline.json). Source locations and locked dependency peer ranges are in the [inventory](./react-19-support/inventory.json). These are dated audit snapshots; category counts overlap and are not an effort estimate or compiler diagnostics.

## Detailed findings

### Ref interoperability

Three production locations read an element's `.ref`:

- [Popover](https://github.com/Sage/carbon/blob/6b3626c6ea16a5051d621b58e8a2666e469408dc/src/__internal__/popover/popover.component.tsx#L96)
- [Tooltip](https://github.com/Sage/carbon/blob/6b3626c6ea16a5051d621b58e8a2666e469408dc/src/components/tooltip/tooltip.component.tsx#L233)
- [AccordionGroup](https://github.com/Sage/carbon/blob/6b3626c6ea16a5051d621b58e8a2666e469408dc/src/components/accordion/accordion-group/accordion-group.component.tsx#L75)

React 19 deprecates `element.ref` in favour of `element.props.ref`. A blanket replacement is unsafe under React 18. Explore a small accessor or remove the introspection, taking care to avoid development warning getters in either version.

The shared [combineRefs helper](https://github.com/Sage/carbon/blob/6b3626c6ea16a5051d621b58e8a2666e469408dc/src/__internal__/utils/helpers/combine-refs/index.ts#L11) discards callback return values and has 15 calls in 14 production files. Tooltip's `preserveRef` does the same. Handwritten forwarding functions also occur in buttons, checkbox, date/calendar select, flat-table rows, icon-button, link, numeral-date, select variants, sidebar, textarea and legacy input.

React 19 consumer refs can return cleanup functions. Verify that composition preserves those functions through unmount, ref replacement and Strict Mode remount, alongside object-ref clearing. A shared implementation must also respect React 18's callback contract. The inventory includes 18 candidate dispatch calls in 17 files; this requires review because names such as `inputRef` can also describe custom callbacks.

Select variants return early on a null node before notifying their outer ref. Include detachment in that review. Existing `combineRefs` tests cover assignment but do not exercise cleanup-returning consumer refs.

### JSX transform

Production Rollup already sets the automatic JSX runtime. Jest uses `babel-jest` and `@babel/preset-react` 7.27.1 without that setting. Transforming `const a = <div/>` with the actual test configuration emitted `React.createElement`.

Align Babel's React preset with the automatic runtime and verify both React versions. TypeScript uses `jsx: react`, but its normal build emits declarations only; changing that setting alone does not change Babel's output.

### Type compatibility

| Pattern                                  | Production occurrences | Files | Action                                                      |
| ---------------------------------------- | ---------------------- | ----- | ----------------------------------------------------------- |
| `useRef` without an initial argument     | 11                     | 9     | Check explicit initial values against both type versions    |
| Global `JSX` references                  | 24                     | 21    | Review migration to scoped `React.JSX`                      |
| `ReactElement` without a props parameter | 22                     | 14    | Check props access and provide precise types where required |
| `RefObject` type references              | 68                     | 42    | Check nullability in component and hook contracts           |
| `cloneElement` calls                     | 24                     | 23    | Review child props and ref types                            |

These are review candidates rather than confirmed React 19 errors. Focus first on select utilities, focus-trap, accordion, popover-menu and exported component declarations.

One expression-bodied JSX ref callback was found in numeral-date. Its target returns void, so this is not an implicit assignment-return defect.

### APIs to retain

The audit found 80 `forwardRef` calls across 78 production files and 14 `useImperativeHandle` calls across 14 files. Keep these while supporting React 18 and 19.

The existing state, effect, context, memoisation and ref hooks remain available. The newer `use` API does not replace them and is unavailable in stable React 18. Recreating standard hooks or changing their imports would add maintenance without addressing the identified compatibility problems.

### Dependencies

Every React and React-type peer range in the lockfile was checked against stable 19.0.0 using `semver`. The exclusions are Carbon's own React/React DOM peers, React DOM 18.3.1's React peer and `@types/react-dom` 18.3.7's React-type peer. The latter two are expected packages to swap together for the React 19 experiment.

The locked versions of styled-components 5.3.11, React Transition Group 4.4.5, Floating UI, Lexical 0.38.2, TanStack React Virtual 3.13.12, React Day Picker 9.3.2, Testing Library React 16.3.0 and Storybook React Vite 10.6.2 declare runtime peer ranges accepting 19.0.0. Peer acceptance does not establish runtime or declaration compatibility.

React Transition Group still contains `findDOMNode` fallbacks, but all nine Carbon `Transition`/`CSSTransition` sites in eight production files supply `nodeRef`. Validate transition execution and changing keys/ref identity in browser tests before deciding to replace the dependency. Chromatic's theme decorator disables transitions, so visual snapshots alone do not cover those paths.

Prioritise styling/SSR and declarations with styled-components and its v5 types; positioning and focus with Floating UI; editor behaviour with Lexical; and calendar/virtualisation interactions.

### Legacy API search

No direct matches were found in the audited Carbon application/test paths for `findDOMNode`, removed React DOM render/hydrate/unmount APIs, string refs, React internals, `createFactory`, legacy context, `react-dom/test-utils` or `react-test-renderer`. No component `.defaultProps` or `.propTypes` assignments were found. These source-search results do not certify transitive dependency implementations.

### Test coverage and support declarations

Storybook Strict Mode is opt-in through `ENABLE_REACT_STRICT_MODE=true`; Jest does not enable it globally. Jest fails on `console.error` but not `console.warn`, so capture warnings during diagnostics.

The Jest setup globally mocks Floating UI's hide middleware and JSDOM has no layout. Real-browser checks are needed for clipping, positioning, portals and focus. Existing server-render tests cover selected cases; consumer hydration needs separate validation.

Current peers allow React `^18.0.0`, while this baseline exercises only 18.3.1. Adding React 19 does not itself require raising that minimum. Check published declarations in React 18 and 19 consumer fixtures; the repository sets `skipLibCheck: true`, so stricter consumer checks may expose additional issues.

Later update installation documentation, peer declarations and repository guidance alongside the separate React 17 removal. This audit changes none of those support declarations.

## Drawbacks

Ref compatibility helpers require careful cleanup and ref-identity tests. Supporting two React/type versions adds CI and consumer-fixture maintenance. Source counts identify likely work but cannot establish its size until the React 19 compiler and runtime diagnostics are available.

## Alternatives

- Recreate standard hooks using `use`: does not address the findings and adds an unnecessary abstraction.
- Move every component to React 19's ref-as-prop API: incompatible with the requirement to keep React 18 consumers working.
- Upgrade all React integrations immediately: broadens the change without evidence that every dependency needs an upgrade. Use the diagnostic failures to justify individual changes.

## Adoption strategy

1. Investigate or explicitly track the existing popover-menu focus failures as the React 18 comparison baseline.
2. Create an isolated React 19 runtime/type setup and collect installation, type, build and test failures before fixing them.
3. Make shared ref/accessor and JSX-transform changes, then address type errors guided by diagnostics. Keep React 18 checks running.
4. Validate built-package consumer fixtures, Strict Mode, SSR/hydration, real transitions and browser interactions under both versions.
5. Add a React version axis to CI, widen only verified peer ranges and offer a prerelease for consuming teams.

## How we teach this

Existing component APIs and common React hooks remain the migration baseline. Document supported React versions and the tested upgrade path, with consumer changes only where verified incompatibilities require them.

## Unresolved questions

- What causes the existing submenu focus failures, and why do two extra cases fail in isolation?
- Which React 19 minor versions form the initial supported/tested range?
- Will React 18 support retain its current minimum of 18.0.0?
- Which identified type patterns produce actual diagnostics with React 19 types?
- Can ref compatibility be handled centrally, or do component-specific behaviours need separate changes?
- Do browser and consumer checks reveal dependency upgrades beyond peer-range acceptance?

## References

- [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Built-in React hooks](https://react.dev/reference/react/hooks)
- [React forwardRef](https://react.dev/reference/react/forwardRef)
- [React Transition Group nodeRef contract](https://reactcommunity.org/react-transition-group/transition/)
