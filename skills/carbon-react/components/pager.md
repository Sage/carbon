---
name: carbon-component-pager
description: Carbon Pager component props and usage examples.
---

# Pager

## Import
`import Pager from "carbon-react/lib/components/pager";`

## Source
- Export: `./components/pager`
- Props interface: `PagerProps`

## Props
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

## Examples
### CurrentPage

**Args**

```tsx
{
    onPagination: () => {},
    totalRecords: 100,
    showPageSizeSelection: true,
    currentPage: 5,
  }
```


### CurrentPageLastPage

**Args**

```tsx
{
    onPagination: () => {},
    totalRecords: 100,
    showPageSizeSelection: true,
    currentPage: 10,
  }
```


### Default

**Args**

```tsx
{
  totalRecords: "100",
  showPageSizeSelection: false,
  currentPage: "1",
  pageSizeSelectionOptions: [
    { id: "1", name: 1 },
    { id: "10", name: 10 },
    { id: "25", name: 25 },
    { id: "50", name: 50 },
    { id: "100", name: 100 },
  ],
  onPagination: () => {},
}
```

**Render**

```tsx
(args: PagerProps) => {
  return <Pager {...args} />;
}
```


### DisabledPageSize

**Args**

```tsx
{ ...Default.args, totalRecords: "100", onPagination: () => {} }
```


### Hide Disabled Elements

**Args**

```tsx
{
  totalRecords: "100",
  hideDisabledElements: true,
  showPageSizeSelection: false,
  currentPage: "1",
  pageSizeSelectionOptions: [
    { id: "1", name: 1 },
    { id: "10", name: 10 },
    { id: "25", name: 25 },
    { id: "50", name: 50 },
    { id: "100", name: 100 },
  ],
  onPagination: () => {},
}
```

**Render**

```tsx
(args: PagerProps) => {
  return <Pager {...args} />;
}
```


### HidingPagerElements

**Args**

```tsx
{
    ...Default.args,
    totalRecords: "100",
    onPagination: () => {},
    showFirstAndLastButtons: false,
    showTotalRecords: false,
    showPageSizeSelection: true,
  }
```


### Interactive Page Number

**Args**

```tsx
{
  totalRecords: "100",
  interactivePageNumber: false,
  showPageSizeSelection: false,
  currentPage: "1",
  pageSizeSelectionOptions: [
    { id: "1", name: 1 },
    { id: "10", name: 10 },
    { id: "25", name: 25 },
    { id: "50", name: 50 },
    { id: "100", name: 100 },
  ],
  onPagination: () => {},
}
```

**Render**

```tsx
(args: PagerProps) => {
  return <Pager {...args} />;
}
```


### LoadingState

**Args**

```tsx
{
    onPagination: () => {},
  }
```


### PageSizeSelectionOptions

**Args**

```tsx
{
    onPagination: () => {},
    totalRecords: 100,
    showPageSizeSelection: true,
    pageSizeSelectionOptions: [
      { id: "15", name: 15 },
      { id: "30", name: 30 },
      { id: "60", name: 60 },
    ],
    pageSize: 15,
  }
```


### Small Screen Breakpoint

**Render**

```tsx
() => {
  const shouldShowExtraLinks = useMediaQuery("(min-width: 375px)");

  return (
    <Pager
      smallScreenBreakpoint="705px"
      totalRecords={1000}
      showPageSizeSelection
      showFirstAndLastButtons={shouldShowExtraLinks}
      pageSize={10}
      currentPage={1}
      onPagination={() => {}}
      pageSizeSelectionOptions={[
        { id: "10", name: 10 },
        { id: "25", name: 25 },
        { id: "50", name: 50 },
        { id: "100", name: 100 },
      ]}
    />
  );
}
```


### Smart Functionality

**Render**

```tsx
() => {
  return (
    <>
      <Pager totalRecords={10} onPagination={() => {}} />
      <br />
      <Pager totalRecords={20} onPagination={() => {}} />
    </>
  );
}
```


### Using Custom Responsive Settings

**Render**

```tsx
() => {
  const query1 = useMediaQuery("(max-width: 1000px)");
  const query2 = useMediaQuery("(max-width: 900px)");
  const query3 = useMediaQuery("(max-width: 800px)");
  const query4 = useMediaQuery("(max-width: 700px)");
  const query5 = useMediaQuery("(max-width: 600px)");
  const responsiveProps = () => {
    if (query5) {
      return {
        showPageSizeSelection: false,
        showTotalRecords: false,
        showFirstAndLastButtons: false,
      };
    }
    if (query4) {
      return {
        showFirstAndLastButtons: false,
        showTotalRecords: false,
        showPageSizeLabelBefore: false,
        showPageSizeLabelAfter: false,
      };
    }
    if (query3) {
      return {
        showFirstAndLastButtons: false,
        showTotalRecords: false,
        showPageSizeLabelBefore: false,
        showPageSizeLabelAfter: false,
      };
    }
    if (query2) {
      return {
        showFirstAndLastButtons: false,
        showTotalRecords: false,
      };
    }
    if (query1) {
      return {
        showPageSizeSelection: true,
        showFirstAndLastButtons: false,
      };
    }
    return {
      showPageSizeSelection: true,
    };
  };
  return (
    <Pager
      totalRecords={1000}
      pageSize={10}
      currentPage={1}
      onPagination={() => {}}
      {...responsiveProps()}
      smallScreenBreakpoint="375px"
      pageSizeSelectionOptions={[
        { id: "10", name: 10 },
        { id: "25", name: 25 },
        { id: "50", name: 50 },
        { id: "100", name: 100 },
      ]}
    />
  );
}
```

