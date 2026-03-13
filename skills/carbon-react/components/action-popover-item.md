---
name: carbon-component-action-popover-item
description: Carbon ActionPopoverItem component props and usage examples.
---

# ActionPopoverItem

## Import
`import { ActionPopoverItem } from "carbon-react/lib/components/action-popover";`

## Source
- Export: `./components/action-popover`
- Props interface: `ActionPopoverItemProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | string | Yes |  | The text label to display for this Item |  |
| currentSubmenuPosition | Alignment \| undefined | No |  |  |  |
| disabled | boolean \| undefined | No |  | Flag to indicate if item is disabled | false |
| download | boolean \| undefined | No |  | allows to provide download prop that works dependent with href |  |
| focusItem | boolean \| undefined | No |  |  |  |
| href | string \| undefined | No |  | allows to provide href prop |  |
| icon | IconType \| undefined | No |  | The name of the icon to display next to the label |  |
| onClick | ((ev: React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback to run when item is clicked |  |
| setCurrentSubmenuPosition | ((value: Alignment) => void) \| undefined | No |  |  |  |
| submenu | React.ReactNode | No |  | Submenu component for item |  |

## Examples
### Default

**Args**

```tsx
{}
```

