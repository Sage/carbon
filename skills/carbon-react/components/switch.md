---
name: carbon-component-switch
description: Carbon Switch component props and usage examples.
---

# Switch

A control that turns a single setting on or off, with the change taking effect as soon as the user toggles it.

## Choose instead

- **Checkbox:** The choice only takes effect when a form is submitted, or users select one or more options from a list.

## Pitfalls

- Switch is controlled: checked and onChange are required, so update checked from e.target.checked.
- Give each Switch a label; it does not forward aria-label or aria-labelledby, so a label rendered elsewhere must be a label element whose htmlFor matches the Switch id.
- The input is disabled while loading is true.
- error, warning and info are deprecated and ignored; Switch does not display validation states.
- The On/Off state text and default processing label come from the switch.on, switch.off and switch.processingLabel locale keys; translate them through I18nProvider.

## Import
`import Switch from "carbon-react/lib/components/switch";`

## Source
- Export: `./components/switch`
- Props interface: `SwitchProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| checked | boolean | Yes |  |  |  | Checked state of the switch |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  |  |  | OnChange event handler |  |
| autoFocus | boolean \| undefined | No |  |  |  | If true, the input will auto-focus on mount |  |
| disabled | boolean \| undefined | No |  |  |  | Disables the switch |  |
| id | string \| undefined | No |  |  |  | The id attribute of the hidden input |  |
| inputHint | React.ReactNode | No |  |  |  | Hint text displayed below the switch |  |
| label | React.ReactNode | No |  |  |  | Accessible text label rendered above the switch |  |
| labelInline | boolean \| undefined | No |  |  |  | When true, the label is displayed inline (beside the switch) rather than above it | false |
| labelSpacing | 1 \| 2 \| undefined | No | 1 \| 2 |  |  | Spacing between the label and switch when labelInline is true (multiplier of base spacing unit) |  |
| labelWidth | number \| undefined | No |  |  |  | Label width as a percentage when labelInline is true |  |
| loading | boolean \| undefined | No |  |  |  | Triggers the loading state — hides On/Off text and shows a spinner |  |
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
| name | string \| undefined | No |  |  |  | The name attribute of the hidden input |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | OnBlur event handler |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | OnFocus event handler |  |
| processingLabel | string \| undefined | No |  |  |  | Text shown beside the spinner during loading. Defaults to "Processing..." |  |
| processingLabelBelowSwitch | boolean \| undefined | No |  |  |  | When true, the processing label is rendered below the switch rather than to its right | false |
| required | boolean \| undefined | No |  |  |  | Whether the input is required |  |
| size | "small" \| "large" \| undefined | No | small \| large |  |  | Size of the switch track | "small" |
| value | string \| undefined | No |  |  |  | The value attribute of the hidden input, passed on form submit |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| error | string \| boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| fieldHelp | React.ReactNode | No |  | Yes | Use `inputHint` instead. |  |  |
| fieldHelpInline | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| helpAriaLabel | string \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| info | string \| boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| isDarkBackground | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| labelHelp | React.ReactNode | No |  | Yes | Use `inputHint` instead. |  |  |
| reverse | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No | left \| right \| bottom \| top | Yes | This prop is no longer supported. |  |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| validationOnLabel | boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |
| warning | string \| boolean \| undefined | No |  | Yes | This prop is no longer supported. |  |  |

## Examples
Load only the example needed for the current task; playground stories are intentionally omitted.

- [Default](../examples/switch/default.md) — Control checked state from onChange, with a label and hint text.