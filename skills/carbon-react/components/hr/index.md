# Hr

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

Provides a horizontal dividing line to make the above and below components feel distinctly separate from one another.

**Category:** UI presentation

## Quick Start

To use Hr, import the `Hr` and set the margins to align it with other components.

```javascript
import Hr from "carbon-react/lib/components/hr";
```

## Examples

### Default

By default the hr is 100% width and has top and bottom margins of 24px.

See: `examples/Default.md`

### With different vertical spacing

The `mb` and `mt` props set the vertical spacing. These props are multipliers and are therefore multiplied by the base theme spacing which is `8px`. The default for both is `3` and therefore `24px`.

See: `examples/DifferentSpacing.md`

### With different heights

The `height` prop sets the height of the hr. Accepts `"small"`, `"medium"` and `"large"`.

See: `examples/DifferentHeights.md`

### With inverse type

The `type` prop can be set to `"inverse"` for darker backgrounds, it applies a white background color to the horizontal rule at 30% opacity.

See: `examples/InverseType.md`

### Inside a form

Horizontal rule used to visually separate sections within a `Form`.

See: `examples/InsideForm.md`

### Inside a form with inline labels

Horizontal rule used inside a `Form` where labels are displayed inline.

See: `examples/InsideFormInlineLabels.md`

### Enabling the adaptive behaviour

The left and right margins can be set to 0 below a screen width breakpoint. This can be switched on with the `adaptiveMxBreakpoint` prop by passing in a number corresponding to a px value screen width.

See: `examples/EnablingAdaptiveBehaviour.md`

## Props

### Hr

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| adaptiveMxBreakpoint | number \| undefined | No |  | Breakpoint for adaptive left and right margins (below the breakpoint they go to 0). Enables the adaptive behaviour when set |  |
| height | "small" \| "medium" \| "large" \| undefined | No |  | Set the height of the component. Accepts one of "small", "medium", or "large" | "small" |
| type | "typical" \| "inverse" \| undefined | No |  | Set the color variant of the horizontal rule. Use "typical" for standard styling or "inverse" for use in darker backgrounds | "typical" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-hidden | "true" \| "false" \| undefined | No |  | Set whether the component should be recognised by assistive technologies |  |
