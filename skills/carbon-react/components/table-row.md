---
name: carbon-component-table-row
description: Carbon TableRow component props and usage examples.
---

# TableRow

## Import
`import { TableRow } from "carbon-react/lib/components/table";`

## Source
- Export: `./components/table`
- Props interface: `TableRowProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The content of the table row. |  |
| id | string | Yes |  | The id attribute for the table row. |  |
| borderThickness | BorderThickness \| undefined | No |  | The border thickness of the table row. |  |
| isExpanded | boolean \| undefined | No |  | Controls whether the table row is expanded. When omitted, the row manages its own expansion state and is initially collapsed. |  |
| isSelected | boolean \| undefined | No |  | Indicates whether the table row is selected. |  |
| onExpansionChange | ((isExpanded: boolean) => void) \| undefined | No |  | Callback fired with the requested expansion state when the disclosure control is activated. |  |
| subRows | React.ReactNode | No |  | The sub-rows of the expandable table row. |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
    id: "table-row",
  }
```

