---
name: carbon-component-table-body
description: Carbon TableBody component props and usage examples.
---

# TableBody

## Import
`import { TableBody } from "carbon-react/lib/components/table";`

## Source
- Export: `./components/table`
- Props interface: `TableBodyProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The content of the table body. |  |
| getOrder | ((draggableItemIds?: (string \| number \| undefined)[]) => void) \| undefined | No |  | Callback function that provides the current order of draggable item IDs. |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

