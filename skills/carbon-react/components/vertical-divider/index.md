# VerticalDivider

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

Provides a vertical dividing line to make the adjacent components feel distinctly separate from one another.

**Category:** UI presentation

## Quick Start

To use component, import the `VerticalDivider` and set the padding to align it with the other components.

```javascript
import VerticalDivider from "carbon-react/lib/components/vertical-divider";
```

## Examples

### Default

By default the VerticalDivider has a height of `100%` and padding of `24px`.

See: `examples/Default.md`

### In a flex container

It is possible to set a custom height for the component by passing a value to the `h` prop as either a number or a string:
if passing a number the height will be set in pixels; if passing a string you will need to ensure you provide the measurement unit.

See: `examples/InAFlexContainer.md`

### In a non-flex container

When using the component in a non-flex container you can set the `displayInline` prop to true (default is false). This will
add the css attribute `display: inline;` to the component.

See: `examples/InANonFlexContainer.md`

### With custom spacing and height

The `p` prop allows for the spacing on all sides to be customised. The `pt` and `pb` props set the vertical spacing and
the `pr` and `pr` props set the horizontal spacing. These props can be number multipliers of the base
theme spacing which is `8px`, or any valid CSS string. The default for the `p` prop is `3` and therefore `24px`.

See: `examples/WithCustomSpacingHeight.md`

### Tint variants

It is possible to pass a value (any value between `1` and `100`) to the `tint` prop (default is `80`) to adjust the tint
applied to the slate.

See: `examples/WithCustomTint.md`

### In a Dialog

Places the vertical divider inside a `Dialog`, visually separating sections or panels within the modal layout.

See: `examples/InADialog.md`

### In a Tile

Places the vertical divider inside a `Tile` to separate adjacent content blocks within the tile layout.

See: `examples/InATile.md`

### In a grid container

This example is best viewed in the Canvas tab using full-screen mode with device or viewport emulation.

See: `examples/InGridContainer.md`

### In a table

Places the vertical divider between cells in a table row, creating a clear visual separation between columns.

See: `examples/InATable.md`

### In a Menu

Places the vertical divider between items in a menu or toolbar, grouping related controls and separating distinct action sets.

See: `examples/InAMenu.md`

## Props

### Vertical Divider

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| displayInline | boolean \| undefined | No |  | Sets the display: inline css attribute on the component To be used in non-flex containers. | false |
| h | string \| number \| undefined | No |  | Shorthand for the height attribute |  |
| height | string \| number \| undefined | No |  | Height attribute of the component |  |
| tint | TintRange \| undefined | No |  | Custom tint of the divider, the supported rage is 1-100 | 80 |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-hidden | boolean \| undefined | No |  | Set the divider to be hidden from screen readers. Please note that this cannot be overridden when inside a Menu. |  |
