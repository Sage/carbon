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
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | string | Yes |  |  |  | Unique id for the root element of the component. |  |
| onChange | (ev: React.MouseEvent<HTMLButtonElement>, value?: string) => void | Yes |  |  |  | Callback triggered by pressing one of the child buttons. |  |
| value | string | Yes |  |  |  | Determines which child button is selected |  |
| allowDeselect | boolean \| undefined | No |  |  |  | Allow selected buttons within the group to be deselected. | false |
| children | React.ReactNode | No |  |  |  | Toggle buttons to be rendered. Only accepts children of type ButtonToggle |  |
| disabled | boolean \| undefined | No |  |  |  | Disable the group. | false |
| fullWidth | boolean \| undefined | No |  |  |  | If true all ButtonToggle children will flex to the full width of the ButtonToggleGroup parent | false |
| inputHint | React.ReactNode | No |  |  |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputWidth | string \| number \| undefined | No |  |  |  | The percentage width of the ButtonToggleGroup. |  |
| label | string \| undefined | No |  |  |  | Visible label for the group. |  |
| m | SpacingProperty | No |  |  |  |  |  |
| margin | SpacingProperty | No |  |  |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |  |  |
| marginX | SpacingProperty | No |  |  |  |  |  |
| marginY | SpacingProperty | No |  |  |  |  |  |
| mb | SpacingProperty | No |  |  |  |  |  |
| ml | SpacingProperty | No |  |  |  |  |  |
| mr | SpacingProperty | No |  |  |  |  |  |
| mt | SpacingProperty | No |  |  |  |  |  |
| mx | SpacingProperty | No |  |  |  |  |  |
| my | SpacingProperty | No |  |  |  |  |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of the ButtonToggleGroup | "medium" |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Sets an aria-label for the group, must be provided if there is no visible label. |  |
| fieldHelp | string \| undefined | No |  | Yes | `fieldHelp` is no longer supported, please use `inputHint` instead. | [Legacy] The text for the field help. |  |
| fieldHelpInline | boolean \| undefined | No |  | Yes | `fieldHelpInline` is no longer supported. | [Legacy] Sets the field help to inline. |  |
| helpAriaLabel | string \| undefined | No |  | Yes | Help tooltips are no longer supported. | [Legacy] Aria label for rendered help component. |  |
| labelHelp | React.ReactNode | No |  | Yes | Help tooltips are no longer supported, please use the `inputHint` prop instead. | [Legacy] Text for the label's help tooltip. |  |
| labelInline | boolean \| undefined | No |  | Yes | Inline labels are no longer supported. | [Legacy] Sets the label to be inline. |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | Yes | Custom label spacing is no longer supported for this component. | [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8), |  |
| labelWidth | number \| undefined | No |  | Yes | `labelWidth` is no longer supported. | [Legacy] The percentage width of the label. |  |

## Examples
No Storybook examples found.