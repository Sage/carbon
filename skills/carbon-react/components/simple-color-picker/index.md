# Simple Color Picker

- Choose from a small palette of pre-set colours, with indication of a currently selected colour.

## Import

```javascript
import SimpleColorPicker from "carbon-react/lib/components/simple-color-picker";
```

## Examples

### Default

See: `examples/Default.md`

### Disabled

See: `examples/Disabled.md`

### Required

You can use the `required` prop to indicate if the field is mandatory.

See: `examples/RequiredAndWithMargin.md`

## Props

### SimpleColorPicker

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| legend | string | Yes |  | The content for the Legend |  |
| name | string | Yes |  | The name to apply to the input. |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  | Prop for `onChange` events |  |
| value | string | Yes |  | The currently selected color. |  |
| children | React.ReactNode | No |  | The SimpleColor components to be rendered in the group |  |
| childWidth | string \| number \| undefined | No |  | prop that represents childWidth |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| info | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| maxWidth | string \| number \| undefined | No |  | prop that sets max-width in css |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onBlur` events |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onKeyDown` events |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory |  |
| validationOnLegend | boolean \| undefined | No |  | When true, validation icon will be placed on legend instead of being placed by the input |  |
| warning | string \| boolean \| undefined | No |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### SimpleColor

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| value | string | Yes |  | the value of the color that is represented by this SimpleColor |  |
| checked | boolean \| undefined | No |  | determines if this color option is selected or unselected |  |
| className | string \| undefined | No |  |  |  |
| defaultChecked | boolean \| undefined | No |  | determines if this color option is selected or unselected when component is used as uncontrolled |  |
| disabled | boolean \| undefined | No |  | if true, input will be disabled |  |
| id | string \| undefined | No |  | the input id |  |
| name | string \| undefined | No |  | the input name |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onBlur` events |  |
| onChange | ((ev: React.ChangeEvent<HTMLInputElement>) => void) \| undefined | No |  | called when the user selects or deselects this color option |  |
| onMouseDown | ((ev: React.MouseEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onMouseDown` events |  |
| aria-label | string \| undefined | No |  | the value of the label to pass to screen reader software |  |
