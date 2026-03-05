---
name: carbon-component-menu-fullscreen
description: Carbon MenuFullscreen component props and usage examples.
---

# MenuFullscreen

## Import
`import { MenuFullscreen } from "carbon-react/lib/components/menu";`

## Source
- Export: `./components/menu`
- Props interface: `MenuFullscreenProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onClose | (ev: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement> \| KeyboardEvent) => void | Yes |  | A callback to be called when the close icon is clicked or enter is pressed when focused |  |
| children | React.ReactNode | No |  | The child elements to render |  |
| isOpen | boolean \| undefined | No |  | Sets whether the component is open or closed |  |
| startPosition | "left" \| "right" \| undefined | No |  | The start position for the component to open from |  |
| topModalOverride | boolean \| undefined | No |  | Manually override the internal modal stacking order to set this as top |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Accessible name that conveys the purpose of the menu |  |

## Examples
No Storybook examples found.