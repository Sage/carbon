# Settings Row

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
Settings Row has been deprecated, if this pattern is still needed please see our deprecation migration docs for an alternative pattern.
</DeprecationWarning>

## Import

```javascript
import SettingsRow from "carbon-react/lib/components/settings-row";
```

## Examples

### Default

`SettingsRow` accepts a `title` string to be displayed at the top left of the row.

The `description` property accepts a string or JSX object to support flexible layout of elements (e.g. Links, bolded text, paragraphs) in the header column under the title.

The default `divider` line at the bottom of the row may be disabled by setting `divider={ false }`.

All `children` are rendered in the input column to the right of the header column.

See: `examples/Default.md`

### with HeadingType

The `headingType` prop sets the HTML heading element of the `title` within the component which is rendered on the page. It can take values `"h1"` up to `"h5"`.

See: `examples/HeadingType.md`

## Props

### Settings Row

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Content to be rendered inside the component. |  |
| className | string \| undefined | No |  |  |  |
| description | React.ReactNode | No |  | A string or JSX object that provides a short description about the group of settings. |  |
| divider | boolean \| undefined | No |  | Shows a divider below the component. | true |
| headingType | HeadingType \| undefined | No |  | Defines the HTML heading element of the `title` within the component. | "h3" |
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
| title | string \| undefined | No |  | A title for this group of settings. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
