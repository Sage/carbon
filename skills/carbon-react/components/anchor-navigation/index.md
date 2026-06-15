# Anchor Navigation

An anchor navigation provides context and instant animated scrolling on a long page. It lets a user move quickly up and down the page. It's sticky, so it's visible even when a user scrolls and indicates the current section of the page that's displayed.

**Category:** Navigation

## Quick Start

To use `AnchorNavigation` import `AnchorNavigation`, `AnchorNavigationItem` and `AnchorSectionDivider` from Carbon.

```javascript
import {
  AnchorNavigation,
  AnchorNavigationItem,
  AnchorSectionDivider,
} from "carbon-react/lib/components/anchor-navigation";
```

- Create `refs` which will be used internally in `AnchorNavigation` to measure positions of the elements.

- Pass proper structure of `AnchorNavigationItem`'s with assigned `refs` to `stickyNavigation` prop.

- Pass children where elements which are meant to serve as sections have `refs` assigned.

- Keep in mind that to assign a `ref` to a component it either has to be a `Class` component or it has to be wrapped in `React.forwardRef()` in case of a function component.

- **It is necessary to maintain the same order of navigation items and children when assigning the `refs`**

- **It is necessary to maintain `stickyNavigation` prop structure as shown below**

```javascript
const MyComponent = () => (
  const ref1 = React.useRef();
  const ref2 = React.useRef();
  const ref3 = React.useRef();

  <AnchorNavigation
    stickyNavigation={
      <>
        <AnchorNavigationItem target={ ref1 }>
          First
        </AnchorNavigationItem>
        <AnchorNavigationItem target={ ref2 }>
          Second
        </AnchorNavigationItem>
        <AnchorNavigationItem target={ ref3 }>
          Third
        </AnchorNavigationItem>
      </>
    }
  >
    <Box ref={ ref1 }>
      <h2>Section 1</h2>
    </Box>
    <AnchorSectionDivider />
    <Box ref={ ref2 }>
      <h2>Section 2</h2>
    </Box>
    <AnchorSectionDivider />
    <Box ref={ ref3 }>
      <h2>Section 3</h2>
    </Box>
  </AnchorNavigation>
);
```

## Examples

### Default

`AnchorNavigation` can be placed anywhere on the page to help with navigating long scrollable sections.

<Story of={AnchorNavigationStories.DefaultStory} />

### In Dialog

`AnchorNavigation` can also be used as the content of `Dialog` component.

See: `examples/InFullScreenDialogStory.md`

## Props

### AnchorNavigation

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Child elements |  |
| stickyNavigation | React.ReactNode | No |  | The AnchorNavigationItems components to be rendered in the sticky navigation. It is important to maintain proper structure. List of AnchorNavigationItems has to be wrapped in React.Fragment |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### AnchorNavigationItem

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Children elements |  |
| href | string \| undefined | No |  | href to be passed to the anchor element, can be linked with id passed to the scrollable section |  |
| isSelected | boolean \| undefined | No |  | Indicates if component is selected |  |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement>) => void) \| undefined | No |  | onClick handler |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLAnchorElement>) => void) \| undefined | No |  | OnKeyDown handler |  |
| tabIndex | number \| undefined | No |  | tabIndex passed to the anchor element |  |
| target | React.RefObject<HTMLElement> \| undefined | No |  | Reference to the section html element meant to be shown |  |
