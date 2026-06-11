# Fieldset

This component can be used within a [Form](../form/index.md) component to group related fields together. 
It will render a `<fieldset>` element with a `<legend>` element to provide a title for the group of fields.

## Import

```javascript
import Fieldset from "carbon-react/lib/components/fieldset";
```

## Examples

### Default

See: `examples/Default.md`

### With `fieldSpacing`

You can use the `fieldSpacing` prop on Form to adjust the spacing between inputs within the `Fieldset`. See the [Form - With Field Spacing](../form/index.md) example.

See: `examples/InFormFieldSpacing.md`

### Required

The `required` prop will add an asterisk to the legend and set all fields within the Fieldset to be required.

See: `examples/Required.md`

## Props

### Fieldset

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Child elements |  |
| legend | string \| undefined | No |  | The text for the fieldset's legend element. |  |
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
| required | boolean \| undefined | No |  | Flag to configure fields as mandatory. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
