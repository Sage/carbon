# Flat Table

A table structures content in a grid and controls the display of data using filters.

**Category:** UI presentation

## Quick Start

Import all the necessary components from the flat table folder

```javascript
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableBodyDraggable,
  FlatTableRow,
  FlatTableHeader,
  FlatTableRowHeader,
  FlatTableCell,
  FlatTableCheckbox,
  Sort,
} from "carbon-react/lib/components/flat-table";
```

**It is necessary that `FlatTableCell` and `FlatTableHeader` components are a direct children of `FlatTableRow` component.**

This is because `FlatTableRow` iterates through and clones the children applying different props depending on the index of the given child.
If you need to wrap `FlatTableCell` or `FlatTableHeader` remember to spread all the props directly to these components as shown below:

```javascript
const FlatTableCellWrapper = ({ customProp, ...rest }) => {
  // ...
  // some additional logic
  // ...
  return <FlatTableCell {...rest} />;
};
```

## Examples

### Default

A basic `FlatTable` with `FlatTableHead` and `FlatTableBody`, demonstrating the standard column/row structure.

See: `examples/DefaultStory.md`

### With row headers

By default the `FlatTableRowHeader`'s `stickyAlignment` prop is set to `left`.
Any preceding cells will automatically also be made sticky as seen in the example below.

See: `examples/WithRowHeader.md`

### Using row headers to create left and right hand side sticky columns

In order to have right hand side sticky columns you should set the `FlatTableRowHeader` `stickyAlignment` prop to `right`.
Any columns to following it will also be sticky.

By default the left hand side columns have the prop set to `left`.
It is important to ensure any left hand side sticky cells are defined in the `table` before the right hand side ones.

See: `examples/WithMultipleRowHeaders.md`

### Horizontal scrolling

To allow horizontal scrolling, set the `width` and `overflowX` props as shown below. An `aria-label` should be added to give the table an accessible name.

See: `examples/HorizontalScrolling.md`

### With custom cell paddings

Padding can be set on each cell individually by using the spacing props syntax. Check prop tables at the bottom of this document for more information.

See: `examples/WithCustomCellPaddings.md`

### With custom column width

Column width can be set by passing number as a `width` prop to the column header or cell component.
**Column width can't be smaller than the sum of horizontal cell padding and content width.**

See: `examples/WithCustomColumnWidth.md`

### With custom row background color

Setting a custom background color will also override hover, highlight and row selection colors.

See: `examples/WithCustomRowBackgroundColor.md`

### With custom horizontal border size

Use the `horizontalBorderSize` prop on `FlatTableRow` or the individual cell components to override the default border thickness.

See: `examples/WithCustomHorizontalBorderSize.md`

### With custom horizontal border color

Use the `horizontalBorderColor` prop on `FlatTableRow` or individual cells to override the default border colour.

See: `examples/WithCustomHorizontalBorderColor.md`

### With custom bottom border radius

Use the `borderRadius` prop on `FlatTable` to apply a custom border radius to the bottom corners of the table.

See: `examples/WithCustomBottomBorderRadius.md`

### With custom vertical borders

Use the `verticalBorder` and `verticalBorderColor` props on `FlatTableCell` or `FlatTableHeader` to add or style vertical borders between columns.

See: `examples/WithCustomVerticalBorders.md`

### With alternative header background

Set `colorTheme` on `FlatTable` to `"transparent-base"`, `"transparent-white"`, `"dark"`, or `"light"` to change the header background colour.

See: `examples/WithAlternativeHeaderBackground.md`

### With truncated cell content

When setting column widths it is also possible to set the content to `truncate`: this will prevent the content from wrapping
and add ellipsis to any content that overflows the given width. By default the `title` will be set to the children if it
is a string. However, if the passed children are not a string it is possible to override it by passing in a different
`title` string.

See: `examples/WithTruncatedCellContent.md`

### With stickyHead prop set to true

It is possible to have one or any number of header rows set to sticky.

See: `examples/WithStickyHead.md`

### With stickyHead, rowspan and colspan

Is it possible to combine the `stickyHead` prop along with the `rowSpan` and `colspan`props.

See: `examples/WithStickyHeadRowSpanAndColspan.md`

### With stickyFooter prop set to true

See: `examples/WithStickyFooter.md`

In this example of FlatTable with `stickyFooter`, FlatTable has been placed inside of a `div` with a height
of `220px`. There is not enough data to fill the flatTable but the style remains consistent and the footer
remains sticky.

See: `examples/WithStickyFooterInsideOfLargerDiv.md`

### With hasMaxHeight

By using the `hasMaxHeight` prop you can automatically apply a max-height of 100% to the FlatTable.

See: `examples/WithHasMaxHeight.md`

### Removing outer vertical borders

Setting the `hasOuterVerticalBorders` prop to `false` removes the table's outermost vertical borders by hiding the left border of the first column and the right border of the last column.

See: `examples/WithoutVerticalBorders.md`

### With clickable rows

Pass an `onClick` handler to `FlatTableRow` to make each row interactive. The cursor changes to a pointer and keyboard navigation is supported.

See: `examples/WithClickableRows.md`

### With zebra stripes

Set `isZebra` on `FlatTable` to apply alternating background colours to odd and even rows, improving readability for wide tables.

See: `examples/Zebra.md`

### With sorting headers

Wrap a `FlatTableHeader` label in a `Sort` component and use the `sortType` and `onClick` props to implement ascending/descending column sorting.

See: `examples/WithSortingHeaders.md`

### With sorting headers and custom accessible name

A custom accessible name can be provided to the `<Sort>` component with the `accessibleName` prop. It is recommended
that text content of the `<Sort>` component as well as the current `sortType` are included
in this accessible name.

See: `examples/WithSortingHeadersAndCustomAccessibleName.md`

### With a cell spanning the whole row

Use the `colspan` prop on `FlatTableCell` to make a cell span multiple columns.

See: `examples/WithColspan.md`

### With a cell spanning the whole column

Use the `rowspan` prop on `FlatTableCell` to make a cell span multiple rows.

See: `examples/WithRowspan.md`

### With Selectable Rows

It is possible to use the selected prop on the FlatTableRow to handle the selection of multiple rows of data.

To take an action across multiple table rows, the user can first select relevant rows with their checkboxes, then apply an action at the top left of the table.

If a given action isn’t available for a single selected item, the option appears disabled. A tooltip may explain why.

If a given action is available for some, but not all, selected rows, then the action is performed, but the user is notified.

Where icons are used for batch actions, they have text labels too, or tooltips to make their function clear. There are always confirmation dialogs for destructive actions, or those difficult to undo.

See: `examples/WithSelectableRows.md`

### With Disabled Checkboxes

It is possible to disable individual row checkboxes to prevent user interaction when actions are not available or a row is processing.

See: `examples/WithDisabledCheckboxes.md`

### With Highlightable Rows

It is possible to utilise the selected and onClick props on the FlatTableRow to highlight single rows of data.

See: `examples/WithHighlightableRows.md`

### With Selectable and Highlightable Rows

It is also possible to integrate selection of multiple rows and the highlighting of single rows.

See: `examples/WithSelectableAndHighlightableRows.md`

### With Pagination

If pagination is needed, this can be shown at the bottom of the table.

Balance performance concerns with the convenience of the user being able to see more data - we suggest giving the user the option of showing 25, 50, and 100 table rows before pagination, with a default of 50. Whatever the user selects, make this sticky per user, per table, and between sessions.

See: `examples/Paginated.md`

### Paginated with sticky header

When using the `Pager` and a sticky `FlatTableHead` some of the child elements may have style properties that cause the
overflow to exceed the height of the table. In the example below, the `ActionPopoverMenu` has absolute positioning meaning
it is accounted for in the overflow. To avoid this it is possible to use the `placement` prop to render the menu on `top`
of the button control.

See: `examples/PaginatedWithStickyHeader.md`

### When a child of Sidebar

When `FlatTable` is rendered inside a `Sidebar`, it adapts its layout to fit the narrower container.

See: `examples/WhenAChildOfSidebar.md`

### Table Cell Sizes

The `size` prop on `FlatTable` controls the padding of all cells. Available values are `"compact"`, `"small"`, `"medium"` (default), and `"large"`.

See: `examples/Sizes.md`

### Draggable rows

Replace `FlatTableBody` with `FlatTableBodyDraggable` and wrap each `FlatTableRow` in a `FlatTableBodyDraggable` to enable drag-and-drop row reordering.

See: `examples/WithDraggableRows.md`

### Wrapping FlatTableRowHeaders

The `FlatTableRow` relies on specific child composition to identify sticky columns. If you need to wrap the `FlatTableRowHeader` you will need to set the `displayName` of the wrapper to `FlatTableRowHeader.displayName`.

See: `examples/WrappingRowHeaders.md`

## Props

### FlatTable

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | FlatTableHead and FlatTableBody |  |
| ariaDescribedby | string \| undefined | No |  | The HTML id of the element that contains a description of this table. |  |
| bottomBorderRadius | "borderRadius100" \| "borderRadius200" \| "borderRadius400" \| "borderRadius000" \| "borderRadius010" \| "borderRadius025" \| "borderRadius050" \| undefined | No |  | Sets the border radius of the first and last cells in the last row. | "borderRadius100" |
| caption | string \| undefined | No |  | A string to render as the table's caption |  |
| colorTheme | "dark" \| "light" \| "transparent-base" \| "transparent-white" \| undefined | No |  | `FlatTable` color theme | "dark" |
| footer | React.ReactNode | No |  | Content to be rendered at the foot of the table |  |
| hasMaxHeight | boolean \| undefined | No |  | Applies max-height of 100% to FlatTable if true | false |
| hasOuterVerticalBorders | boolean \| undefined | No |  | Toggles the visibility of the table's outer left and right borders. When false, the left border of the first column and the right border of the last column are hidden. | true |
| hasStickyFooter | boolean \| undefined | No |  | If true, the header does not scroll with the content | false |
| hasStickyHead | boolean \| undefined | No |  | If true, the header does not scroll with the content |  |
| height | string \| number \| undefined | No |  | Set the height of the table. String can be any valid CSS string, numbers will be converted to pixels. |  |
| isZebra | boolean \| undefined | No |  | Toggles the zebra striping for the table rows |  |
| minHeight | string \| number \| undefined | No |  | Set the min-height of the table. String can be any valid CSS string, numbers will be converted to pixels. |  |
| overflowX | string \| undefined | No |  | Set the overflow X of the table wrapper. Any valid CSS string |  |
| size | "small" \| "medium" \| "large" \| "compact" \| "extraLarge" \| undefined | No |  | Used to define the tables size Renders as: 'compact', 'small', 'medium', 'large' and 'extraLarge' | "medium" |
| title | string \| undefined | No |  | The title to describe the table when one or more tables are used on a single page |  |
| width | string \| undefined | No |  | Width of the table. Any valid CSS string |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### FlatTableHead

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Array of FlatTableRow. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### FlatTableBody

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Array of FlatTableRow. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### FlatTableBodyDraggable

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Array of FlatTableRow. |  |
| getOrder | ((draggableItemIds?: (string \| number \| undefined)[]) => void) \| undefined | No |  | Callback fired when order is changed |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

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

### FlatTableHeader

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| align | TableCellAlign \| undefined | No |  | Content alignment | "left" |
| alternativeBgColor | boolean \| undefined | No |  | If true sets alternative background color |  |
| children | React.ReactNode | No |  | Header content |  |
| colspan | string \| number \| undefined | No |  | Number of columns that a header cell should span |  |
| id | string \| undefined | No |  | Sets an id string on the element |  |
| rowspan | string \| number \| undefined | No |  | Number of rows that a header cell should span |  |
| verticalBorder | TableBorderSize \| undefined | No |  | Sets a custom vertical right border |  |
| verticalBorderColor | string \| undefined | No |  | Sets the color of the right border |  |
| width | number \| undefined | No |  | Column width, pass a number to set a fixed width in pixels |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Sort

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | string \| undefined | No |  |  |  | Sets the text content of the component |  |
| onClick | (() => void) \| undefined | No |  |  |  | Callback fired when the component is clicked |  |
| sortType | "ascending" \| "descending" \| undefined | No |  |  |  | if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-roledescription | string \| undefined | No |  |  |  | Sets the aria-roledescription of the component |  |
| accessibleName | string \| undefined | No |  | Yes | this prop has been deprecated in favour of using `aria-live` regions | Sets the accessible name of the component |  |

### FlatTableCell

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| align | TableCellAlign \| undefined | No |  | Content alignment | "left" |
| children | React.ReactNode | No |  | Cell content |  |
| colspan | string \| number \| undefined | No |  | Number of columns that a cell should span |  |
| id | string \| undefined | No |  | Sets an id string on the element |  |
| rowspan | string \| number \| undefined | No |  | Number of rows that a cell should span |  |
| title | string \| undefined | No |  | Title text to display if cell content truncates |  |
| truncate | boolean \| undefined | No |  | Truncate cell content and add ellipsis to any text that overflows | false |
| verticalBorder | TableBorderSize \| undefined | No |  | Sets a custom vertical right border |  |
| verticalBorderColor | string \| undefined | No |  | Sets the color of the right border |  |
| width | number \| undefined | No |  | Column width, pass a number to set a fixed width in pixels |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### FlatTableRowHeader

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| align | TableCellAlign \| undefined | No |  | Content alignment | "left" |
| children | React.ReactNode | No |  | RowHeader content |  |
| colspan | string \| number \| undefined | No |  | Number of columns that a header cell should span |  |
| id | string \| undefined | No |  | Sets an id string on the element |  |
| rowspan | string \| number \| undefined | No |  | Number of rows that a header cell should span |  |
| stickyAlignment | "left" \| "right" \| undefined | No |  | Defines whether the column should be sticky on the left or right hand side of the Table | "left" |
| title | string \| undefined | No |  | Title text to display if cell content truncates |  |
| truncate | boolean \| undefined | No |  | Truncate cell content and add ellipsis to any text that overflows |  |
| verticalBorder | TableBorderSize \| undefined | No |  | Sets a custom vertical right border |  |
| verticalBorderColor | string \| undefined | No |  | Sets the color of the right border |  |
| width | number \| undefined | No |  | Column width, pass a number to set a fixed width in pixels |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### FlatTableCheckbox

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| checked | boolean | Yes |  | Prop to set checked prop on Checkbox |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  | Callback to be called onChange in Checkbox |  |
| ariaLabelledBy | string \| undefined | No |  | The id of the element that labels the input |  |
| as | "td" \| "th" \| undefined | No |  | Prop to polymorphically render either a 'th' or 'td' element | "td" |
| disabled | boolean \| undefined | No |  | Prop to set disabled state on Checkbox | false |
| id | string \| undefined | No |  | Sets an id string on the element |  |
| onClick | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  | Callback function to be called when click event received |  |
| selectable | boolean \| undefined | No |  | Whether to render the checkbox or not, defaults to true | true |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
