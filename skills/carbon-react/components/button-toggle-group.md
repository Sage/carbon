---
name: carbon-component-button-toggle-group
description: Carbon ButtonToggleGroup component props and usage examples.
---

# ButtonToggleGroup

## Import
`import { ButtonToggleGroup } from "carbon-react/lib/components/button-toggle";`

## Source
- Export: `./components/button-toggle`
- Props interface: `ButtonToggleGroupProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| id | string | Yes |  | Unique id for the root element of the component |  |
| onChange | (ev: React.MouseEvent<HTMLButtonElement>, value?: string) => void | Yes |  | Callback triggered by pressing one of the child buttons. |  |
| value | string | Yes |  | Determines which child button is selected |  |
| allowDeselect | boolean \| undefined | No |  | Allow buttons within the group to be deselected when already selected, leaving no selected button | false |
| children | React.ReactNode | No |  | Toggle buttons to be rendered. Only accepts children of type ButtonToggle |  |
| disabled | boolean \| undefined | No |  | Disable all user interaction. | false |
| fieldHelp | string \| undefined | No |  | [Legacy] The text for the field help. |  |
| fieldHelpInline | boolean \| undefined | No |  | [Legacy] Sets the field help to inline. |  |
| fullWidth | boolean \| undefined | No |  | If true all ButtonToggle children will flex to the full width of the ButtonToggleGroup parent |  |
| helpAriaLabel | string \| undefined | No |  | [Legacy] Aria label for rendered help component |  |
| inputHint | React.ReactNode | No |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputWidth | string \| number \| undefined | No |  | The percentage width of the ButtonToggleGroup. |  |
| label | string \| undefined | No |  | Text for the visible label of the button group. |  |
| labelHelp | React.ReactNode | No |  | [Legacy] Text for the label's help tooltip. |  |
| labelInline | boolean \| undefined | No |  | [Legacy] Sets the label to be inline. |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) |  |
| labelWidth | number \| undefined | No |  | [Legacy] The percentage width of the label. |  |
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
| data-component | string \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | aria-label for the group wrapper. Required for accessibility when no text label is provided |  |

## Examples
### Default

**Args**

```tsx
{}
```

