# Popover Container

A floating panel that appears when a trigger element is clicked. Use it for contextual controls — filters, quick actions or small forms — that should appear inline without navigating away from the page.

**Category:** UI presentation

## Quick Start

```javascript
import PopoverContainer, { type PopoverContainerHandle } from "carbon-react/lib/components/popover-container";
```

## Examples

### Default

A `PopoverContainer` opened by clicking the trigger button. Content is rendered as `children`. Controlled `open` state is optional.

See: `examples/Default.md`

### With title

Use the `title` prop to set a title within the `PopoverContainer`.

**Please note you should supply an `onClose` when controlling the `open` state in order for the `PopoverContainer` to close when clicking outside of the wrapper element**

See: `examples/Title.md`

### Right Aligned/Open Left

Use the `position` prop to open the `PopoverContainer` to the left, this is useful if your open button is to the right
of the screen.

**Please note you should supply an `onClose` when controlling the `open` state in order for the `PopoverContainer` to close when clicking outside of the wrapper element**

See: `examples/RightPosition.md`

### Center Aligned

Use `position="center"` to center the `PopoverContainer` below the trigger element. This positioning is ideal when your trigger element is centrally located and you want the popover to appear directly underneath it, maintaining visual alignment.
The center position automatically calculates the optimal placement to keep the popover centered relative to its trigger, while ensuring it stays within the viewport boundaries.

See: `examples/CenterPosition.md`

### Border Radius

Use the `borderRadius` prop to customise the corner rounding of the `PopoverContainer`.

See: `examples/BorderRadius.md`

### Offset

Use the `offset` prop to control the distance between the `PopoverContainer` and its trigger element.

See: `examples/Offset.md`

### Cover Button

Use the `shouldCoverButton` prop to hide the open button when the `PopoverContainer` is open.

**Please note you should supply an `onClose` when controlling the `open` state in order for the `PopoverContainer` to close when clicking outside of the wrapper element**

See: `examples/CoverButton.md`

### Custom Open/Close Button

Use the `renderOpenComponent` and `renderCloseComponent` to render your own open or close buttons.

These props use a render prop pattern - https://reactjs.org/docs/render-props.html

See: `examples/RenderProps.md`

### Controlled

You can use the `open`, `onOpen` and `onClose` props to control the open state of the `PopoverContainer`.

**Please note you should supply an `onClose` when controlling the `open` state in order for the `PopoverContainer` to close when clicking outside of the wrapper element**

See: `examples/Controlled.md`

### Complex content

You can easily use many different components to create your own composition.

**Please note you should supply an `onClose` when controlling the `open` state in order for the `PopoverContainer` to close when clicking outside of the wrapper element**

See: `examples/Complex.md`

### Filter component

If you want to use the `PopoverContainer` to create for example `Filter` component.
You can do it easily in this way:

**Please note you should supply an `onClose` when controlling the `open` state in order for the `PopoverContainer` to close when clicking outside of the wrapper element**

See: `examples/Filter.md`

### Animation Disabled

It is possible to disable the animations applied to the `PopoverContainer` by setting the `disableAnimation` prop to `true`.

See: `examples/DisableAnimation.md`

### Focusing the open button programmatically

`PopoverContainer`'s ref exposes a `focusButton` function that can be called to programmatically focus the open button. This can be useful when closing or submitting a Form within `PopoverContainer`.

**Please note you should supply an `onClose` when controlling the `open` state in order for the `PopoverContainer` to close when clicking outside of the wrapper element**

See: `examples/FocusButton.md`

## Props

### Popover Container

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| ariaDescribedBy | string \| undefined | No |  | The id of the element that describe the dialog. |  |
| borderRadius | BoxProps["borderRadius"] | No |  | Sets the border radius of the popover container |  |
| children | React.ReactNode | No |  | The content of the popover-container |  |
| closeButtonAriaLabel | string \| undefined | No |  | Close button aria label |  |
| closeButtonDataProps | Pick<TagProps, "data-element" \| "data-role"> \| undefined | No |  | Data tag prop bag for close Button |  |
| containerAriaLabel | string \| undefined | No |  | Container aria label |  |
| disableAnimation | boolean \| undefined | No |  | Disables the animation for the component |  |
| hasFullWidth | boolean \| undefined | No |  | Flag to enable fullWidth Button styles |  |
| offset | number \| undefined | No |  | The popover offset from the reference element |  |
| onClose | ((ev: React.KeyboardEvent<HTMLElement> \| React.MouseEvent<HTMLElement> \| React.FocusEvent<HTMLElement> \| Event) => void) \| undefined | No |  | Callback fires when close icon clicked |  |
| onOpen | ((ev: React.KeyboardEvent<HTMLElement> \| React.MouseEvent<HTMLElement>) => void) \| undefined | No |  | Callback fires when open component is clicked |  |
| open | boolean \| undefined | No |  | if `true` the popover-container is open |  |
| openButtonAriaLabel | string \| undefined | No |  | Open button aria label |  |
| position | Position \| undefined | No |  | Sets rendering position of dialog |  |
| renderCloseComponent | ((args: RenderCloseProps) => JSX.Element) \| undefined | No |  | A function that will render the close component `({data-element, tabIndex, onClick, ref, aria-label}) => ()` |  |
| renderOpenComponent | ((args: RenderOpenProps) => JSX.Element) \| undefined | No |  | A function that will render the open component `({tabIndex, isOpen, data-element, onClick, ref, aria-label}) => ()` |  |
| shouldCoverButton | boolean \| undefined | No |  | if `true` the popover-container will cover open button |  |
| title | string \| undefined | No |  | Sets the popover container dialog header name |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Props passed through renderOpenComponent

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onClick | (ev: React.KeyboardEvent<HTMLElement> \| React.MouseEvent<HTMLElement>) => void | Yes |  |  |  |
| ref | React.RefObject<HTMLButtonElement> | Yes |  |  |  |
| tabIndex | number | Yes |  |  |  |
| aria-expanded | boolean | Yes |  |  |  |
| aria-haspopup | "dialog" | Yes |  |  |  |
| id | string \| undefined | No |  |  |  |
| isOpen | boolean \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  |  |  |
| data-popover-container-button | string \| undefined | No |  |  |  |
| aria-label | string \| undefined | No |  |  |  |

### Props passed through renderCloseComponent

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onClick | (ev: React.KeyboardEvent<HTMLElement> \| React.MouseEvent<HTMLElement>) => void | Yes |  |  |  |
| ref | React.RefObject<HTMLButtonElement> | Yes |  |  |  |
| tabIndex | number | Yes |  |  |  |
| aria-label | string | Yes |  |  |  |
| closeButtonDataProps | Pick<TagProps, "data-element" \| "data-role"> \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  |  |  |

## Ref methods

`PopoverContainer`'s forwarded ref exposes the following imperative methods:

| Method Name     | Description                               |
| --------------- | ----------------------------------------- |
| `focusButton()` | Programmatically focuses the open button. |
