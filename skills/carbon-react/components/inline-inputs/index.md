# Inline Inputs

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
Inline Inputs has been deprecated, if this pattern is still needed please see our deprecation migration docs for a recommended alternative.
</DeprecationWarning>

## Import

```javascript
import InlineInputs from "carbon-react/lib/components/inline-inputs";
```

## required

<Canvas of={InlineInputsStories.Required} />

## labelAlign

<Canvas of={InlineInputsStories.LabelAlign} />

## Examples

### Default

See: `examples/Default.md`

## Props

### InlineInputs

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | Children elements | null |
| className | string \| undefined | No |  |  |  |  |  |
| gutter | GutterOptions \| undefined | No |  |  |  | Gutter prop gets passed down to Row component if false gutter value is "none" | "none" |
| htmlFor | string \| undefined | No |  |  |  | The id of the corresponding input control for the label |  |
| inputWidth | number \| undefined | No |  |  |  | Width of the inline inputs container in percentage |  |
| label | string \| undefined | No |  |  |  | Defines the label text for the heading. |  |
| labelAlign | "left" \| "right" \| undefined | No |  |  |  | Inline label alignment |  |
| labelId | string \| undefined | No |  |  |  | Custom label id, could be used in combination with aria-labelledby prop of each input, to make them accessible for screen readers. |  |
| labelInline | boolean \| undefined | No |  |  |  |  | true |
| labelWidth | number \| undefined | No |  |  |  | Width of a label in percentage |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure component as mandatory. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| adaptiveLabelBreakpoint | number \| undefined | No |  | Yes | `adaptiveLabelBreakpoint` has been deprecated. It is recommended to use `useMediaQuery` hook to implement adaptive behaviour. Breakpoint for adaptive label (inline label change to top aligned). Enables the adaptive behaviour when set |  |  |
