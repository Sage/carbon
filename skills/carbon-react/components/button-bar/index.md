# Button Bar

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated component that groups `Button` and `ButtonMinor` elements side-by-side in a row with shared border styling. Use individual `Button` components or a `Box` with flex layout in new implementations.

**Category:** Actions

## Quickstart

```javascript
import ButtonBar from "carbon-react/lib/components/button-bar";
```

## Examples

### Button Bar - Sizes

Button bars of different sizes.

See: `examples/buttonBarSizes.md`

See: `examples/buttonBarMinorSizes.md`

### Button Bar - Icon Position

Button bars with different icon positions.

See: `examples/buttonBarIcons.md`

### Button Bar Minor - Icon Position

Button bars using `ButtonMinor` with different icon positions.

See: `examples/buttonBarMinorIcons.md`

### Button Bar - Icon Only

Button bars displaying icon-only buttons, with no visible label text.

See: `examples/buttonBarIconsOnly.md`

### Button Bar Minor - Icon Only

`ButtonMinor` components displayed as icon-only buttons within a button bar.

See: `examples/buttonBarMinorIconsOnly.md`

### Button Bar - Icon Buttons

`IconButton` components on a button bar.

See: `examples/buttonBarIconButtons.md`

### Button Bar - Full Width

Button bars can be `fullWidth`, stretching to fill the available horizontal space.

See: `examples/buttonBarFullWidth.md`

### Button Bar Minor - Full Width

`ButtonMinor` components in a full-width button bar.

See: `examples/buttonBarMinorFullWidth.md`

## Props

### Button Bar

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Button or IconButton Elements, to be rendered inside the component |  |
| buttonType | "primary" \| "secondary" \| undefined | No |  | Color variants for new business themes: "primary" \| "secondary" \| "tertiary" \| "darkBackground" |  |
| fullWidth | boolean \| undefined | No |  | Apply fullWidth style to the button bar | false |
| iconPosition | "before" \| "after" \| undefined | No |  | Defines an Icon position for buttons: "before" \| "after" | "before" |
| size | "small" \| "medium" \| "large" \| undefined | No |  | Assigns a size to the buttons: "small" \| "medium" \| "large" | "medium" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
