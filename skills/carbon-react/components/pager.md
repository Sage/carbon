---
name: carbon-component-pager
description: Carbon Pager component props and usage examples.
---

# Pager

Navigates between pages of records and can expose page-size and total-record controls.

## Pitfalls

- Update currentPage from onPagination so the consuming view and Pager remain in sync.
- Some layout and alignment combinations are normalised when the corresponding page-size or total-record controls are not shown.

## Import
`import Pager from "carbon-react/lib/components/pager";`

## Source
- Export: `./components/pager`
- Props interface: `PagerProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onPagination | (currentPage: number, pageSize: number, origin: string) => void | Yes |  |  |  | Function called when pager changes (Current page, Page size, Origin component). |  |
| alignment | PagerAlignment \| undefined | No | fill \| centred |  |  | Alignment of the content when rendered in a single row layout. Will only be applied if `showTotalRecords` and/or `showPageSizeSelection` are true. |  |
| currentPage | string \| number \| undefined | No |  |  |  | Current visible page. |  |
| interactivePageNumber | boolean \| undefined | No |  |  |  | Flag to set if the current page number renders as an input. |  |
| layout | PagerLayout \| undefined | No | single \| two-row \| three-row |  |  | Maximum number of lines used to render the component. |  |
| onFirst | ((ev: React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback function for the First button. |  |
| onLast | ((ev: React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback function for the Last button. |  |
| onNext | ((ev: React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback function for the Next button. |  |
| onPrevious | ((ev: React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback function for the Previous button. |  |
| pageSize | string \| number \| undefined | No |  |  |  | Number of records per page. |  |
| pageSizeSelectionOptions | PageSizeOption[] \| undefined | No |  |  |  | List of page size options. |  |
| showFirstAndLastButtons | boolean \| undefined | No |  |  |  | Flag to render "First" and "Last" navigation buttons. |  |
| showPageSizeSelection | boolean \| undefined | No |  |  |  | Flag to render the page size selection input. |  |
| showTotalRecords | boolean \| undefined | No |  |  |  | Should the total records label be shown. |  |
| size | "small" \| "medium" \| "large" \| undefined | No | small \| medium \| large |  |  | Size of the component. **Deprecation:** The "large" size is no longer supported. |  |
| totalRecords | string \| number \| undefined | No |  |  |  | Total number of records, used to calculate the total number of pages. |  |
| variant | "default" \| "alternate" \| undefined | No | default \| alternate |  |  | The component's variant. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Set an accessible label for the Pagination nav |  |
| hideDisabledElements | boolean \| undefined | No |  | Yes | Support to disable elements has been removed. | If true, sets css property visibility: hidden on all disabled elements. |  |
| showPageCount | boolean \| undefined | No |  | Yes | Support to show or hide page count input has been removed. The page count is always shown. | Should the page count input be shown |  |
| showPageSizeLabelAfter | boolean \| undefined | No |  | Yes | Support for this prop has been removed. Labels for page size selection are always shown. | Should the label after the page size selection dropdown be shown. |  |
| showPageSizeLabelBefore | boolean \| undefined | No |  | Yes | Support for this prop has been removed. Labels for page size selection are always shown. | Should the label before the page size selection dropdown be shown. |  |
| showPreviousAndNextButtons | boolean \| undefined | No |  | Yes | Support to show or hide "Previous" and "Next" buttons has been removed. Their visibility is managed internally. | Should the `Previous` and `Next` navigation buttons be shown. |  |
| smallScreenBreakpoint | string \| undefined | No |  | Yes | This component is now responsive by default and support for this prop has been removed. | Breakpoint for small screen styling to be applied. |  |

## Examples
Load only the example needed for the current task; playground stories are intentionally omitted.

- [Default](../examples/pager/default.md) — Keep the current page controlled by updating it from onPagination.