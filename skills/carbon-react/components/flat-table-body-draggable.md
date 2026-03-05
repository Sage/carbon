---
name: carbon-component-flat-table-body-draggable
description: Carbon FlatTableBodyDraggable component props and usage examples.
---

# FlatTableBodyDraggable

## Import
`import { FlatTableBodyDraggable } from "carbon-sage/lib/components/flat-table";`

## Source
- Export: `./components/flat-table`
- Props interface: `FlatTableBodyDraggableProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Array of FlatTableRow. |  |
| getOrder | ((draggableItemIds?: (string \| number \| undefined)[]) => void) \| undefined | No |  | Callback fired when order is changed |  |
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

