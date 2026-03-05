---
name: carbon-component-option-row
description: Carbon OptionRow component props and usage examples.
---

# OptionRow

## Import
`import { OptionRow } from "carbon-sage/lib/components/select";`

## Source
- Export: `./components/select`
- Props interface: `OptionRowProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Row content, should consist of multiple td elements |  |
| text | string | Yes |  | The option's visible text, displayed within <Textbox> of <Select> |  |
| value | string \| Record<string, unknown> | Yes |  | The option's invisible internal value |  |
| disabled | boolean \| undefined | No |  | If true, the component will be disabled |  |
| hidden | boolean \| undefined | No |  |  |  |
| id | string \| undefined | No |  | Unique identifier for the component. Will use a randomly generated GUID if none is provided. |  |
| index | number \| undefined | No |  |  |  |
| onSelect | ((data: { id: string; text: string; value: string \| Record<string, unknown>; }) => void) \| undefined | No |  |  |  |
| style | CSSProperties \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
No Storybook examples found.