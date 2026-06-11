# Button Bar

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
Button Bar has been deprecated, if this pattern is still needed please see our deprecation migration docs for a recommended alternative.
</DeprecationWarning>

## Import

```javascript
import ButtonBar from "carbon-react/lib/components/button-bar";
```

## Examples

### Button Bar - Sizes

Button bars of different sizes.

See: `examples/ButtonBarSizesAndButtonBarMinorSizes.md`

### Button Bar - Icon Position

See: `examples/buttonBarIcons.md`

### Button Bar Minor - Icon Position

See: `examples/buttonBarMinorIcons.md`

### Button Bar - Icon Only

See: `examples/buttonBarIconsOnly.md`

### Button Bar Minor - Icon Only

See: `examples/ButtonBarMinorIconsOnlyAndButtonBarIconButtons.md`

### Button Bar - Full Width

See: `examples/buttonBarFullWidth.md`

### Button Bar Minor - Full Width

See: `examples/buttonBarMinorFullWidth.md`

## Props

### Button Bar

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Button or IconButton Elements, to be rendered inside the component |  |
| buttonType | "primary" \| "secondary" \| undefined | No |  | Color variants for new business themes: "primary" \| "secondary" \| "tertiary" \| "darkBackground" |  |
| fullWidth | boolean \| undefined | No |  | Apply fullWidth style to the button bar | false |
| iconPosition | "before" \| "after" \| undefined | No |  | Defines an Icon position for buttons: "before" \| "after" | "before" |
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
| size | "small" \| "medium" \| "large" \| undefined | No |  | Assigns a size to the buttons: "small" \| "medium" \| "large" | "medium" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
