# Detail

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
Detail has been deprecated, if this pattern is still needed please see our deprecation migration docs for an alternative pattern.
</DeprecationWarning>

## Import

```javascript
import Detail from "carbon-react/lib/components/detail";
```

## Examples

### Default Detail

This is an example of how the Detail component will look in its default format.

See: `examples/Default.md`

### Detail with a Footnote

Detail can also have a footnote by using the `footnote` prop.

See: `examples/DetailWithFootnote.md`

### Default with Icon

Detail can also have an icon that renders to the left.

See: `examples/DetailWithIcon.md`

### Inside of Components

#### Inside of Card

Detail can be nested inside of components. Inside of this example it is nested inside of the `Card` component.

See: `examples/DetailInsideCardAndDetailInsideTile.md`

## Props

### Detail

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | The rendered children of the component. |  |
| className | string \| undefined | No |  |  |  |
| footnote | string \| undefined | No |  | A small detail to display under the main content. |  |
| icon | IconType \| undefined | No |  | The type of icon to use. |  |
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
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
