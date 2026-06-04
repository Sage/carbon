# Anchor Navigation

Easily navigate through long scrollable content.

## Import

```javascript
import {
  AnchorNavigation,
  AnchorNavigationItem,
  AnchorSectionDivider,
} from "carbon-react/lib/components/anchor-navigation";
```

## Examples

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
