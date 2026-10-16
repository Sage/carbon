---
name: carbon-component-action-popover-menu
description: Carbon ActionPopoverMenu component props and usage examples.
---

# ActionPopoverMenu

## Import
`import { ActionPopoverMenu } from "carbon-react/lib/components/action-popover";`

## Source
- Export: `./components/action-popover`
- Props interface: `ActionPopoverMenuProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | Children for the menu |  |
| key | Key \| null \| undefined | No |  |  |  |  |  |
| menuID | string \| undefined | No |  |  |  | A unique ID for the menu |  |
| parentID | string \| undefined | No |  |  |  | Unique ID for the menu's parent |  |
| ref | LegacyRef<T> \| undefined | No |  |  |  | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). |  |
| focusIndex | number \| undefined | No |  | Yes | No longer used, focus is managed by the underlying PopoverMenu |  |  |
| isOpen | boolean \| undefined | No |  | Yes | No longer used, open state is managed by the parent ActionPopoverItem |  |  |
| placement | "bottom" \| "top" \| undefined | No |  | Yes | Submenus now open to the right and flip automatically when space is constrained. This prop will be removed in a future major release. |  |  |
| setFocusIndex | ((args: number) => void) \| undefined | No |  | Yes | No longer used, focus is managed by the underlying PopoverMenu |  |  |
| setOpen | ((args: boolean) => void) \| undefined | No |  | Yes | No longer used, open state is managed by the parent ActionPopoverItem |  |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

