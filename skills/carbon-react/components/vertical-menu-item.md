---
name: carbon-component-vertical-menu-item
description: Carbon VerticalMenuItem component props and usage examples.
---

# VerticalMenuItem

## Import
`import { VerticalMenuItem } from "carbon-react/lib/components/vertical-menu";`

## Source
- Export: `./components/vertical-menu`
- Props interface: `VerticalMenuItemProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| title | string | Yes |  | Title of the menu item |  |
| active | boolean \| ((isOpen: boolean) => boolean) \| undefined | No |  | Whether the menu item is active or not |  |
| adornment | React.ReactNode \| ((isOpen: boolean) => React.ReactNode) | No |  | Adornment of the menu item meant to be rendered on the right side |  |
| ariaCurrent | boolean \| "location" \| "page" \| "time" \| "true" \| "false" \| "step" \| "date" \| undefined | No |  | Marks the element as the current item within a navigation context. |  |
| children | React.ReactNode | No |  | Children of the menu item - another level of VerticalMenuItems |  |
| component | T \| undefined | No |  | Optional component to render instead of the default div, useful for rendering router link components |  |
| customIcon | React.ReactNode | No |  | Custom icon to be displayed. Takes precedence over `iconType` if both are specified. |  |
| defaultOpen | boolean \| undefined | No |  | Default open state of the component | false |
| height | string \| undefined | No |  | Height of the menu item | "56px" |
| href | string \| undefined | No |  | Href, when passed the menu item will be rendered as an anchor tag |  |
| iconType | IconType \| undefined | No |  | The Carbon icon to be displayed. Defers to `customIcon` if both are defined. |  |
| m | SpacingProperty | No |  |  |  |
| margin | SpacingProperty | No |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |
| marginX | SpacingProperty | No |  |  |  |
| marginY | SpacingProperty | No |  |  |  |
| mb | SpacingProperty | No |  |  |  |
| ml | SpacingProperty | No |  |  |  |
| mr | SpacingProperty | No |  |  |  |
| mt | SpacingProperty | No |  |  |  |
| mx | SpacingProperty | No |  |  |  |
| my | SpacingProperty | No |  |  |  |
| onClick | ((event: VerticalMenuItemClickEvent) => void) \| undefined | No |  | A custom click handler to run when the menu item is clicked |  |
| p | SpacingProperty | No |  |  |  |
| padding | SpacingProperty | No |  |  |  |
| paddingBottom | SpacingProperty | No |  |  |  |
| paddingLeft | SpacingProperty | No |  |  |  |
| paddingRight | SpacingProperty | No |  |  |  |
| paddingTop | SpacingProperty | No |  |  |  |
| paddingX | SpacingProperty | No |  |  |  |
| paddingY | SpacingProperty | No |  |  |  |
| pb | SpacingProperty | No |  |  |  |
| pl | SpacingProperty | No |  |  |  |
| pr | SpacingProperty | No |  |  |  |
| pt | SpacingProperty | No |  |  |  |
| px | SpacingProperty | No |  |  |  |
| py | SpacingProperty | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

