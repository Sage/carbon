# Migration catalogue guidance

This guide documents the provisional implementation/pilot slice. It is not a
public support promise, and catalogue selection does not prove that an upgrade
is complete.

<a id="css-package-version-prefix"></a>
## Version-prefixed generated CSS classes

From `160.0.0`, review selectors, scripts, snapshots, overrides, and visual
differences that depend on generated class names. Run visual regression tests,
especially where multiple Carbon versions coexist.

<a id="button-next-dom-ref"></a>
## Button DOM refs

From `161.0.0`, replace `ButtonHandle` and `focusButton()` use with the forwarded
DOM ref and `.focus()`. Choose `HTMLButtonElement` or `HTMLAnchorElement` based
on actual usage, and verify nullability, focus behaviour, and accessibility.

<a id="npm-engine-11-18"></a>
## npm 11.18 compatibility boundary

From `161.3.0`, npm `>=11.18.0` is required. Update relevant local, CI,
container, and package-manager pins before running the normal install and
lockfile workflow. This package-configuration change was absent from generated
release notes.

<a id="dialog-full-screen-component"></a>
## DialogFullScreen optional cleanup

This is optional proactive deprecation cleanup, not required upgrade work.
Replace the documented component-path `DialogFullScreen` with `Dialog
size="fullscreen"`. The supported future transform is limited to unambiguous,
direct default imports and JSX without spreads or conflicting `size` or
`fullscreen` props. Verify focus, layout, header/footer behaviour, visuals, and
accessible naming.

<a id="step-sequence-item-aria-label"></a>
## StepSequenceItem ariaLabel optional cleanup

This is optional proactive deprecation cleanup, not required upgrade work.
Replace `ariaLabel` on directly imported `StepSequenceItem` JSX with the native
`aria-label` attribute when no conflicting attribute exists. Verify the
computed accessible name.
