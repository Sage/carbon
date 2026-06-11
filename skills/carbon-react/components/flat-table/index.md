# Flat Table

Logically structure content in a grid for the user to enter, view, or work with.

## Import

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

## Examples

### Default

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

See: `examples/WithCustomHorizontalBorderSize.md`

### With custom horizontal border color

See: `examples/WithCustomHorizontalBorderColor.md`

### With custom bottom border radius

See: `examples/WithCustomBottomBorderRadius.md`

### With custom vertical borders

See: `examples/WithCustomVerticalBorders.md`

### With alternative header background

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

See: `examples/WithStickyFooterAndWithStickyFooterInsideOfLargerDiv.md`

### With hasMaxHeight

By using the `hasMaxHeight` prop you can automatically apply a max-height of 100% to the FlatTable.

See: `examples/WithHasMaxHeight.md`

### Removing outer vertical borders

Setting the `hasOuterVerticalBorders` prop to `false` removes the table's outermost vertical borders by hiding the left border of the first column and the right border of the last column.

See: `examples/WithoutVerticalBorders.md`

### With clickable rows

See: `examples/WithClickableRows.md`

### With zebra stripes

See: `examples/Zebra.md`

### With sorting headers

See: `examples/WithSortingHeaders.md`

### With sorting headers and custom accessible name

A custom accessible name can be provided to the `<Sort>` component with the `accessibleName` prop. It is recommended
that text content of the `<Sort>` component as well as the current `sortType` are included
in this accessible name.

See: `examples/WithSortingHeadersAndCustomAccessibleName.md`

### With a cell spanning the whole row

See: `examples/WithColspan.md`

### With a cell spanning the whole column

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

See: `examples/WhenAChildOfSidebar.md`

### Table Cell Sizes

See: `examples/Sizes.md`

### Draggable rows

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
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| minHeight | string \| number \| undefined | No |  | Set the min-height of the table. String can be any valid CSS string, numbers will be converted to pixels. |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
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
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
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
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
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
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
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
