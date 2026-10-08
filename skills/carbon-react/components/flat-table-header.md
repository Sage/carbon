---
name: carbon-component-flat-table-header
description: Carbon FlatTableHeader component props and usage examples.
---

# FlatTableHeader

## Import
`import { FlatTableHeader } from "carbon-react/lib/components/flat-table";`

## Source
- Export: `./components/flat-table`
- Props interface: `FlatTableHeaderProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| align | TableCellAlign \| undefined | No |  | Content alignment | "left" |
| alternativeBgColor | boolean \| undefined | No |  | If true sets alternative background color |  |
| children | React.ReactNode | No |  | Header content |  |
| colspan | string \| number \| undefined | No |  | Number of columns that a header cell should span |  |
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
| rowspan | string \| number \| undefined | No |  | Number of rows that a header cell should span |  |
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

