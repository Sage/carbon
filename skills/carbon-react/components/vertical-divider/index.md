# VerticalDivider

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
VerticalDivider has been deprecated, if this pattern is still needed please see our deprecation migration docs for a recommended alternative.
</DeprecationWarning>

Provides a vertical dividing line to make the adjacent components feel distinctly separate from one another.

## Import

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

See: `examples/InADialog.md`

### In a Tile

See: `examples/InATile.md`

### In a grid container

This example is best viewed in the Canvas tab using full-screen mode with device or viewport emulation.

See: `examples/InGridContainer.md`

### In a table

See: `examples/InATable.md`

### In a Menu

See: `examples/InAMenu.md`

## Props

### Vertical Divider

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| displayInline | boolean \| undefined | No |  | Sets the display: inline css attribute on the component To be used in non-flex containers. | false |
| h | string \| number \| undefined | No |  | Shorthand for the height attribute |  |
| height | string \| number \| undefined | No |  | Height attribute of the component |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| tint | TintRange \| undefined | No |  | Custom tint of the divider, the supported rage is 1-100 | 80 |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-hidden | boolean \| undefined | No |  | Set the divider to be hidden from screen readers. Please note that this cannot be overridden when inside a Menu. |  |
