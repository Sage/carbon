---
name: carbon-component-radio-button-group
description: Carbon RadioButtonGroup component props and usage examples.
---

# RadioButtonGroup

## Import
`import RadioButtonGroup from "carbon-sage/lib/components/radio-button";`

## Source
- Export: `./components/radio-button`
- Props interface: `RadioButtonGroupProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The RadioButton objects to be rendered in the group |  |
| name | string | Yes |  | Specifies the name prop to be applied to each button in the group |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  | Callback fired when the user selects a RadioButton |  |
| value | string | Yes |  | value of the selected RadioButton |  |
| adaptiveLegendBreakpoint | number \| undefined | No |  | Breakpoint for adaptive legend (inline labels change to top aligned). Enables the adaptive behaviour when set |  |
| adaptiveSpacingBreakpoint | number \| undefined | No |  | Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| id | string \| undefined | No |  | Unique identifier for the component. Will use a randomly generated GUID if none is provided. |  |
| info | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information. |  |
| inline | boolean \| undefined | No |  | When true, RadioButtons children are in line | false |
| labelSpacing | 1 \| 2 \| undefined | No |  | Spacing between labels and radio buttons, given number will be multiplied by base spacing unit (8) | 1 |
| legend | string \| undefined | No |  | The content for the RadioButtonGroup Legend |  |
| legendAlign | "left" \| "right" \| undefined | No |  | [Legacy] Text alignment of legend when inline | "left" |
| legendHelp | string \| undefined | No |  | The content for the RadioButtonGroup hint text, will only be rendered when `validationRedesignOptIn` is true. |  |
| legendInline | boolean \| undefined | No |  | [Legacy] When true, legend is placed in line with the RadioButtons | false |
| legendSpacing | 1 \| 2 \| undefined | No |  | [Legacy] Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) |  |
| legendWidth | number \| undefined | No |  | [Legacy] Percentage width of legend (only when legend is inline) |  |
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
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Callback fired when each RadioButton is blurred |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | [Legacy] Overrides the default tooltip position |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Render the ValidationMessage above the RadioButton inputs when validationRedesignOptIn flag is set | true |
| warning | string \| boolean \| undefined | No |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

