---
name: carbon-component-action-popover-menu-button
description: Carbon ActionPopoverMenuButton component props and usage examples.
---

# ActionPopoverMenuButton

## Import
`import { ActionPopoverMenuButton } from "carbon-react/lib/components/action-popover";`

## Source
- Export: `./components/action-popover`
- Props interface: `ActionPopoverMenuButtonProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| ariaAttributes | ActionPopoverMenuButtonAria | Yes |  | ARIA attributes to be applied to the button HTML element |  |
| tabIndex | number | Yes |  | Overrides the default tabindex of the component |  |
| data-element | string | Yes |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| buttonType | ButtonTypes \| undefined | No |  | Variant of the menu button |  |
| children | string \| undefined | No |  | Content of the button |  |
| iconPosition | ButtonIconPosition \| undefined | No |  | Defines an Icon position related to the children: "before" \| "after" |  |
| iconType | IconType \| undefined | No |  | Defines an Icon type within the button |  |
| size | SizeOptions \| undefined | No |  | Assigns a size to the button: "small" \| "medium" \| "large" |  |

## Examples
### Default

**Args**

```tsx
{}
```

