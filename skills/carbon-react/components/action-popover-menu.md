---
name: carbon-component-action-popover-menu
description: Carbon ActionPopoverMenu component props and usage examples.
---

# ActionPopoverMenu

## Import
`import { ActionPopoverMenu } from "carbon-sage/lib/components/action-popover";`

## Source
- Export: `./components/action-popover`
- Props interface: `ActionPopoverMenuProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Children for the menu |  |
| focusIndex | number \| undefined | No |  |  |  |
| isOpen | boolean \| undefined | No |  | Flag to indicate whether a menu should open |  |
| key | Key \| null \| undefined | No |  |  |  |
| menuID | string \| undefined | No |  | A unique ID for the menu |  |
| parentID | string \| undefined | No |  | Unique ID for the menu's parent |  |
| placement | "bottom" \| "top" \| undefined | No |  | Set whether the menu should open above or below the button |  |
| ref | LegacyRef<T> \| undefined | No |  | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). |  |
| role | string \| undefined | No |  |  |  |
| setFocusIndex | ((args: number) => void) \| undefined | No |  |  |  |
| setOpen | ((args: boolean) => void) \| undefined | No |  | Callback to set the isOpen flag |  |
| style | { left: string \| number; top?: string; bottom?: string; right: string \| number; } \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  |  |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

