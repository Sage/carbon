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
| isExpanded | boolean \| undefined | No |  | Indicates whether the table row is expandable. |  |
| isSelected | boolean \| undefined | No |  | Indicates whether the table row is selected. |  |
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

