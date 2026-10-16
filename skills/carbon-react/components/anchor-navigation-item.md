---
name: carbon-component-anchor-navigation-item
description: Carbon AnchorNavigationItem component props and usage examples.
---

# AnchorNavigationItem

## Import
`import { AnchorNavigationItem } from "carbon-react/lib/components/anchor-navigation";`

## Source
- Export: `./components/anchor-navigation`
- Props interface: `AnchorNavigationItemProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Children elements |  |
| href | string \| undefined | No |  | href to be passed to the anchor element, can be linked with id passed to the scrollable section |  |
| initiallySelected | boolean \| undefined | No |  | Marks this item as initially selected inside AnchorNavigation, including during server rendering. Only one item in a navigation should use this prop. |  |
| isSelected | boolean \| undefined | No |  | Indicates selection when this item is rendered without an AnchorNavigation parent. |  |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement>) => void) \| undefined | No |  | Called when the item is clicked. Prevent the default event to cancel navigation activation. |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLAnchorElement>) => void) \| undefined | No |  | Called when a key is pressed on the item. Prevent the default event to cancel navigation activation. |  |
| tabIndex | number \| undefined | No |  | tabIndex passed to the anchor element |  |
| target | React.RefObject<HTMLElement> \| undefined | No |  | Reference to the section html element meant to be shown |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

