---
name: carbon-component-flat-table-row
description: Carbon FlatTableRow component props and usage examples.
---

# FlatTableRow

## Import
`import { FlatTableRow } from "carbon-sage/lib/components/flat-table";`

## Source
- Export: `./components/flat-table`
- Props interface: `FlatTableRowProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Array of FlatTableHeader or FlatTableCell. FlatTableRowHeader could also be passed. |  |
| bgColor | string \| undefined | No |  | Overrides default cell color, provide design token, any color from palette or any valid css color value. |  |
| draggableProps | { index: number; } \| undefined | No |  |  |  |
| expandable | boolean \| undefined | No |  | Allows the row to be expanded, must be used with the `subRows` prop. |  |
| expandableArea | "wholeRow" \| "firstColumn" \| undefined | No |  | Area to click to open sub rows when expandable. Default is `wholeRow` |  |
| expanded | boolean \| undefined | No |  | Sets an expandable row to be expanded on start |  |
| highlighted | boolean \| undefined | No |  | Allows developers to manually control highlighted state for the row. |  |
| horizontalBorderColor | string \| undefined | No |  | Sets the color of the bottom border in the row |  |
| horizontalBorderSize | TableBorderSize \| undefined | No |  | Sets the weight of the bottom border in the row |  |
| id | string \| number \| undefined | No |  |  |  |
| onClick | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  | Function to handle click event. If provided the Component could be focused with tab key. |  |
| selected | boolean \| undefined | No |  | Allows developers to manually control selected state for the row. |  |
| subRows | React.ReactNode | No |  | Sub rows to be shown when the row is expanded, must be used with the `expandable` prop. |  |
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

