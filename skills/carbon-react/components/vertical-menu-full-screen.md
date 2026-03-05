---
name: carbon-component-vertical-menu-full-screen
description: Carbon VerticalMenuFullScreen component props and usage examples.
---

# VerticalMenuFullScreen

## Import
`import { VerticalMenuFullScreen } from "carbon-react/lib/components/vertical-menu";`

## Source
- Export: `./components/vertical-menu`
- Props interface: `VerticalMenuFullScreenProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Content of the menu - VerticalMenuItem |  |
| isOpen | boolean | Yes |  | Whether the menu is open or not |  |
| onClose | (ev: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement> \| KeyboardEvent) => void | Yes |  | A callback to be called when the close icon is clicked or enter is pressed when focused |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | An aria-label attribute for the menu |  |
| aria-labelledby | string \| undefined | No |  | An aria-labelledby attribute for the menu |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

