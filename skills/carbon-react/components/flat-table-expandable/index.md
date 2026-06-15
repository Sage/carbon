# Flat Table expandable options

Extends `FlatTable` with collapsible parent rows. Each expandable `FlatTableRow` can contain any number of sub-rows that are revealed or hidden when the user clicks the row or its expand icon. Rows can be uncontrolled (open/close handled internally) or controlled via the `expanded` and `onClick` props.

**Category:** UI presentation

## Examples

### Default

Flat table rows can be made expandable, with any number of sub rows.

See: `examples/DefaultStory.md`

### Keyboard accessible subrows

In order to make the subrows keyboard accessible you will need to pass a callback to the `onClick` prop as in the example
below.

See: `examples/KeyboardAccessibleSubRows.md`

### Expandable by first column only

Only clicking on the first column can expand the row with this option set.

See: `examples/ExpandableByFirstColumnOnly.md`

### With initially expanded rows

Set the rows to be open by default.

See: `examples/InitiallyExpanded.md`

### With row headers

Rows with row headers can also be made expandable. In the example below there is both a left and
right hand side sticky column. To set a column to be sticky on the left hand side set the
`stickyAlignment` prop to `left` (this is the default value) and for the right hand side sticky
columns set the prop to `right`.

See: `examples/RowHeaders.md`

### With row headers with custom paddings

Rows with row headers can also be made expandable and can also have custom paddings.
In this example `Child one` has `pl={8}` and `Child two` has `pl={5}` as well as having an icon.

See: `examples/RowHeadersWithCustomPaddings.md`

### With pagination

Tables with pagination can have expandable rows.

See: `examples/Paginated.md`

### With parent and children selectable

By writing your own selectable logic, both parent and child rows can be made selectable.

See: `examples/BothParentAndChildrenSelectable.md`

### Parent only selectable

By writing your own selectable logic, the parent rows only can be made selectable.

See: `examples/ParentOnlySelectable.md`

### Children only selectable

By writing your own selectable logic, the child rows only can be made selectable.

See: `examples/ChildrenOnlySelectable.md`

### Truncated cell content

In order to achieve the content truncation when using the `expandable` feature you will need to pass in a node with the
truncated styling applied, this is because of the caret icon that is rendered within the cell.

See: `examples/TruncatedCellContent.md`

### Controlled

Use the `expanded` prop together with an `onClick` handler to take full control of the open/closed state from outside the component.

See: `examples/Controlled.md`

### Table Sizes

The `size` prop on `FlatTable` applies to expandable tables in the same way as standard tables. Available values are `"compact"`, `"small"`, `"medium"` (default), and `"large"`.

See: `examples/Sizes.md`

## Props

### FlatTableRow

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
