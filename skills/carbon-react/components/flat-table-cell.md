---
name: carbon-component-flat-table-cell
description: Carbon FlatTableCell component props and usage examples.
---

# FlatTableCell

## Import
`import { FlatTableCell } from "carbon-react/lib/components/flat-table";`

## Source
- Export: `./components/flat-table`
- Props interface: `FlatTableCellProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| align | TableCellAlign \| undefined | No |  | Content alignment | "left" |
| children | React.ReactNode | No |  | Cell content |  |
| colspan | string \| number \| undefined | No |  | Number of columns that a cell should span |  |
| id | string \| undefined | No |  | Sets an id string on the element |  |
| p | SpacingProperty | No |  |  |  |
| padding | SpacingProperty | No |  |  |  |
| paddingBottom | SpacingProperty | No |  |  |  |
| paddingLeft | SpacingProperty | No |  |  |  |
| paddingRight | SpacingProperty | No |  |  |  |
| paddingTop | SpacingProperty | No |  |  |  |
| paddingX | SpacingProperty | No |  |  |  |
| paddingY | SpacingProperty | No |  |  |  |
| pb | SpacingProperty | No |  |  |  |
| pl | SpacingProperty | No |  |  |  |
| pr | SpacingProperty | No |  |  |  |
| pt | SpacingProperty | No |  |  |  |
| px | SpacingProperty | No |  |  |  |
| py | SpacingProperty | No |  |  |  |
| rowspan | string \| number \| undefined | No |  | Number of rows that a cell should span |  |
| title | string \| undefined | No |  | Title text to display if cell content truncates |  |
| truncate | boolean \| undefined | No |  | Truncate cell content and add ellipsis to any text that overflows | false |
| verticalBorder | TableBorderSize \| undefined | No |  | Sets a custom vertical right border |  |
| verticalBorderColor | string \| undefined | No |  | Sets the color of the right border |  |
| width | number \| undefined | No |  | Column width, pass a number to set a fixed width in pixels |  |
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

