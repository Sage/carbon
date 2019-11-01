Start Date: 2019/10/30
 
# Summary
 
This a proposal to add **react-table** as a dependency to the Carbon library.
 
# Basic example
 
[https://www.npmjs.com/package/react-table](https://www.npmjs.com/package/react-table)
 
# Motivation
 
There is a requirement for a data grid component that will support as much of the following features as possible:
 
- Inline editing
 
- Column re-sizing
 
- Searching/filtering
 
- Record selection across multiple pages
 
- Hover/select states
 
- Conditional formatting
 
- Data summaries/aggregation
 
- Bulk actions
 
- Grid state exporting
 
- Empty states
 
- Column choosing
 
- Expanded row views
 
- Row level actions
 
- Alternate row/column colours
 
- Loading states
 
- Sticky regions
 
- Saving grid views
 
- Pagination (server/client-side)
 
- Sorting
 
- Scrolling
 
- Grouping
 
# Detailed design
 
| Feature |react-table|
|--|--|
|Inline editing|:white_check_mark:|
|Column re-sizing|:white_check_mark:|
|Searching/filtering|:white_check_mark:|
|Record selection across multiple pages|:x:|
|Hover/select states|:white_check_mark:|
|Conditional formatting|:white_check_mark:|
|Data summaries/aggregation|:white_check_mark:|
|Bulk actions|:white_check_mark:|
|Grid state exporting|:white_check_mark:|
|Empty states|:white_check_mark:|
|Column choosing|:white_check_mark:|
|Expanded row views|:white_check_mark:|
|Row level actions|:white_check_mark:|
|Alternate row/column colours|:white_check_mark:|
|Loading states|:white_check_mark:|
|Sticky regions|:white_check_mark:|
|Saving grid views|:white_check_mark:|
|Pagination (server/client-side)|:white_check_mark:|
|Sorting|:white_check_mark:|
|Scrolling|:x:|
|Grouping|:white_check_mark:
 
 
**Inline editing and Column re-sizing:** 
An example of both is present in the following sandbox
 
[https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7.0.0-beta.0/archives/v6-examples/react-table-editable-content](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7.0.0-beta.0/archives/v6-examples/react-table-editable-content)
 
**Searching/filtering:** 
There doesn’t appear to be an API for “searching” but suspect the “custom filtering” API could be adapted for that purpose
 
[https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7.0.0-beta.0/archives/v6-examples/react-table-custom-filtering](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7.0.0-beta.0/archives/v6-examples/react-table-custom-filtering)
 
**Record selection across multiple pages:**
Row selections is a feature that’s specifically added in v7. There’s no information available of if this will support pagination specifically but it should be achievable with further implementation:
 
[https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/row-selection](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/row-selection)
 
**Hover/select states and Conditional formatting:**
See examples on “Functional Rendering” (“You have access to the entire internal state of your table before you render the markup. This allows you to use the table state to build even more sophisticated UI.“
 
[https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7.0.0-beta.0/archives/v6-examples/react-table-functional-rendering](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7.0.0-beta.0/archives/v6-examples/react-table-functional-rendering)
 
**Data summaries/aggregation:**
See the example:
 
[https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/archives/v6-examples/react-table-footers](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/archives/v6-examples/react-table-footers)
 
**Bulk actions:**
This would be an implementation on the back of examples for “row selection”.
 
**Grid state exporting:**
Similar to bulk actions, would just be an implementation taxt to export an object array to CSV file format (for example).
 
**Empty states:**
This could be implemented via “Conditional rendering” examples
 
**Column choosing:**
The react-table API provides a “show” (Boolean|Function) prop for column objects which toggles their display. It also supports custom widths, sorting and nesting:
 
[https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/examples/column-ordering](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/examples/column-ordering)
 
**Expanded row views:**
Because of the headless design, it’s possible to implement row expansion easily, here’s an example where it expands into more rows, creating a sort of tree-view:
[https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/examples/expanding](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/examples/expanding)
 
Here’s a more simple one:  
[https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/archives/v6-examples/react-table-custom-expander-position](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/archives/v6-examples/react-table-custom-expander-position)
 
**Row level actions:**
This would be an implementation based upon the “Row Selection” examples.
 
**Alternate row/column colours:**
UI is fully customisable but it has some “out-of-the-box” support in its API for this specifically:
 
*“Adding a -striped className to ReactTable will slightly color odd numbered rows for legibility*
 
*Adding a -highlight className to ReactTable will highlight any row as you hover over it”*
 
**Loading states:**
This would require implementation based on method of data retrieval.
 
**Sticky regions:**
No native support for this but there are libraries which have specifically implemented this feature for react-table:
[https://www.npmjs.com/package/react-table-hoc-fixed-columns](https://www.npmjs.com/package/react-table-hoc-fixed-columns)
 
**Saving grid views:**
This would be an implementation task which would involve simple persisting the “data”, “columns” and “columnOrder” object array that the grid is bound to.
 
**Pagination (server/client-side):**
[https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/examples/pagination](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/examples/pagination)
 
**Sorting:**
[https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/examples/sorting](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/examples/sorting)
 
**Scrolling:**
No support for scrolling. Could potentially be implemented.
 
**Grouping:**
[https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/examples/grouping](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/9c7b1e3/examples/grouping)
 
# Drawbacks
 
**Please consider:**
- v6 Has no support for column re-ordering or row-selection and these require v7
- v7 is a breaking change
 
# Alternatives
- A  potential candidate we found was "[https://adazzle.github.io/react-data-grid](https://adazzle.github.io/react-data-grid)" which seems comparable however its design seems to focus on reproducing "Excel-like" functionality.
- Ag-grid seems very feature-rich and supports most or all, of the requirements but comes licensing requirements
 
# Adoption strategy
The Carbon core team will refer other collaborators to this document when implementing data grid components.
 
# How we teach this
It would need its own page in the Carbon docs which details the props we expose and examples of how to consume the component and work with its API.
 
# Unresolved questions
- There’s no support for internal scrolling and it’s recommended to use paging instead. Paging can be switched off and the headless UI might allow for implementing our own but this has not been investigated.
- Row selection across multiple pages has also not been investigated yet.
