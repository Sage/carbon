# Pager

Pagination Component.

## Import

```javascript
import Pager from "carbon-react/lib/components/pager";
```

## Examples

### With disabled Page Size Selection

See: `examples/DisabledPageSize.md`

### Hiding Pager elements

Unlike with hiding the page size select component, the remaining elements that make up the `Pager` are rendered by
default: in order for them to be hidden you must pass `false` to the corresponding `show...` prop (see prop table below).
In the example below the `First` and `Last` buttons and `totalRecords` label have been hidden by setting the
`showFirstAndLastButtons` and `showTotalRecords` props to false.

See: `examples/HidingPagerElements.md`

### Smart elements

The examples below demonstrate the `Pager`'s smart functionality. In the first there are only enough records for one page,
and as such the navigation buttons are not necessary and therefore not rendered. In the second example there are only enough
records for two pages, the `First` and `Last` buttons are not needed and as a result will not render.

See: `examples/SmartFunctionality.md`

### Loading state

When no totalRecords provided.

See: `examples/LoadingState.md`

### Custom pageSizeSelectionOptions

Show custom page size selection options.

See: `examples/PageSizeSelectionOptions.md`

### With currentPage pre-set to last page

Due to the fact that it is last page, next and last links are disabled.

See: `examples/CurrentPageLastPage.md`

### With currentPage pre-set to page 5

See: `examples/CurrentPage.md`

### Custom responsive example

The`show...` props can be used to implement responsive behaviour in the `Pager`. Below is an example that will
conditionally render the internal elements as the screen size is adjusted. This example is best viewed in the Canvas tab
using full-screen mode with device or viewport emulation.

See: `examples/UsingCustomResponsiveSettings.md`

### Small screen breakpoint

The `smallScreenBreakpoint` prop allows you to set the screen size at which the `Pager` will switch to small screen layout. 
This will cause the navigation links to wrap onto a new line if `showPageSizeSelection` or `showTotalRecords` is set to `true`, as well as reduce the spacing around the elements.

**Note:** This prop does not guarantee that the elements within `Pager` do not overflow, it is up to consumers to ensure they set the appropriate props and breakpoints.

See: `examples/SmallScreenBreakpoint.md`

## Props

### Pager

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onPagination | (currentPage: number, pageSize: number, origin: string) => void | Yes |  | Function called when pager changes (Current page, Page size, Origin component) |  |
| currentPage | string \| number \| undefined | No |  | Current visible page | 1 |
| hideDisabledElements | boolean \| undefined | No |  | If true, sets css property visibility: hidden on all disabled elements | false |
| interactivePageNumber | boolean \| undefined | No |  | If true, page number navigation will be changed to a non-interactive label | true |
| onFirst | ((ev: React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback function for first link |  |
| onLast | ((ev: React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback function for last link |  |
| onNext | ((ev: React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback function for next link |  |
| onPrevious | ((ev: React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback function for previous link |  |
| pageSize | string \| number \| undefined | No |  | Pagination page size | 10 |
| pageSizeSelectionOptions | PageSizeOption[] \| undefined | No |  | Set of page size options | [
    { id: "10", name: 10 },
    { id: "25", name: 25 },
    { id: "50", name: 50 },
    { id: "100", name: 100 },
  ] |
| showFirstAndLastButtons | boolean \| undefined | No |  | Should the `First` and `Last` navigation button be shown | true |
| showPageCount | boolean \| undefined | No |  | Should the page count input be shown | true |
| showPageSizeLabelAfter | boolean \| undefined | No |  | Should the label after the page size selection dropdown be shown | true |
| showPageSizeLabelBefore | boolean \| undefined | No |  | Should the label before the page size selection dropdown be shown | true |
| showPageSizeSelection | boolean \| undefined | No |  | Should the page size selection dropdown be shown | false |
| showPreviousAndNextButtons | boolean \| undefined | No |  | Should the `Previous` and `Next` navigation button be shown | true |
| showTotalRecords | boolean \| undefined | No |  | Should the total records label be shown | true |
| smallScreenBreakpoint | string \| undefined | No |  | Breakpoint for small screen styling to be applied. |  |
| totalRecords | string \| number \| undefined | No |  | Total number of records | 0 |
| variant | "default" \| "alternate" \| undefined | No |  | What variant the Pager background should be | "default" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
