---
name: carbon-component-table-cell
description: Carbon TableCell component props and usage examples.
---

# TableCell

## Import
`import { TableCell } from "carbon-react/lib/components/table";`

## Source
- Export: `./components/table`
- Props interface: `TableCellProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The content of the table cell. |  |
| align | "left" \| "right" \| "center" \| undefined | No |  | The alignment of the table cell content. |  |
| as | "td" \| "th" \| undefined | No |  | The HTML element to render the table cell as. |  |
| borderThickness | BorderThickness \| undefined | No |  | Override the vertical border thickness of the table cell. |  |
| colSpan | number \| undefined | No |  |  |  |
| id | string \| undefined | No |  | The id attribute for the table cell. |  |
| rowSpan | number \| undefined | No |  |  |  |
| scope | "col" \| "colgroup" \| "row" \| "rowgroup" \| undefined | No |  | The scope attribute specifies the set of data cells for which the header cell provides header information. |  |

## Examples
### Default

**Args**

```tsx
{
    children: "Cell",
  }
```

