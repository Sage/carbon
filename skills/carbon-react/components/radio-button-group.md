---
name: carbon-component-radio-button-group
description: Carbon RadioButtonGroup component props and usage examples.
---

# RadioButtonGroup

## Import
`import RadioButtonGroup from "carbon-react/lib/components/radio-button";`

## Source
- Export: `./components/radio-button`
- Props interface: `RadioButtonGroupProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | The RadioButton objects to be rendered within the group. |  |
| name | string | Yes |  |  |  | Specifies the name prop to be applied to each RadioButton in the group. |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  |  |  | Callback fired when a RadioButton child is selected. |  |
| value | string | Yes |  |  |  | Value of the selected RadioButton child. |  |
| disabled | boolean \| undefined | No |  |  |  | Flag to disable the RadioButtonGroup. |  |
| error | string \| undefined | No |  |  |  | Error message to be displayed when validation fails. |  |
| id | string \| undefined | No |  |  |  | Unique identifier for the component. Will use a randomly generated GUID if none is provided. |  |
| inline | boolean \| undefined | No |  |  |  | When true, RadioButton children are inline. | false |
| legend | string \| undefined | No |  |  |  | The content for the RadioButtonGroup legend. |  |
| legendAlign | "left" \| "right" \| undefined | No |  |  |  | Alignment of the legend. |  |
| legendHint | string \| undefined | No |  |  |  | Content for the hint text below the legend. |  |
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
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Callback fired when a RadioButton child is blurred. |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure RadioButtonGroup as mandatory. |  |
| size | "large" \| "small" \| "medium" \| undefined | No |  |  |  | Size of the RadioButtonGroup. | "medium" |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| adaptiveLegendBreakpoint | number \| undefined | No |  | Yes | The adaptive legend behaviour is no longer supported on this component. | Breakpoint for adaptive legend (inline labels change to top aligned). Enables the adaptive behaviour when set |  |
| adaptiveSpacingBreakpoint | number \| undefined | No |  | Yes | The adaptive spacing behaviour is no longer supported on this component. | Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set |  |
| info | string \| boolean \| undefined | No |  | Yes | Information validation is no longer supported on this component. | [Legacy] Indicate additional information. |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | Yes | Custom spacing for labels is no longer supported on this component. | Spacing between labels and radio buttons, given number will be multiplied by base spacing unit (8) |  |
| legendHelp | string \| undefined | No |  | Yes | The `legendHelp` prop is deprecated and will be removed in a future release. Please use the `legendHint` prop instead. | The content for the RadioButtonGroup hint text, will only be rendered when `validationRedesignOptIn` is true. |  |
| legendInline | boolean \| undefined | No |  | Yes | Inline legends are no longer supported on this component. | When true, legend is placed in line with the RadioButtons |  |
| legendSpacing | 1 \| 2 \| undefined | No |  | Yes | Custom spacing for legends is no longer supported on this component. | Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) |  |
| legendWidth | number \| undefined | No |  | Yes | Inline legends are no longer supported on this component. | Percentage width of legend (only when legend is inline) |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | Tooltips are no longer supported on this component. | Overrides the default tooltip position |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Yes | The `validationMessagePositionTop` prop is deprecated and will be removed in a future release. | Render the ValidationMessage above the RadioButtonGroup | true |
| warning | string \| undefined | No |  | Yes | The `warning` state is deprecated and will be removed in a future release. | Warning message to be displayed when validation warning occurs. |  |

## Examples
No Storybook examples found.