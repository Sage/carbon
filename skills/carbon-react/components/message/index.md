# Message

Presents a static message which stays on screen.

**Category:** Feedback

## Quick Start

```javascript
import Message from "carbon-react/lib/components/message";
```

## Examples

### Default

To use `Message`, you can pass any valid content as children.

See: `examples/Default.md`

### With Close Button

You can make the `Message` dismissible by providing an `onDismiss` handler, which will render a close button on the top right corner of the component.
To change the `aria-label` of the close button, you can use the `closeButtonAriaLabel` prop or make use of the `message.closeButtonAriaLabel` translation key.

See: `examples/WithCloseButton.md`

### Programmatic Focus and Aria-Live Regions

Programmatic focus should only be used for "error" messages to ensure users are immediately aware of critical issues.
This can be done by programmatically moving focus to the `Message` component when an error appears to ensure users are aware of the newly rendered content and that it is announced by screen readers.

**Note:** The `Message` component will not render with a focus outline when focused programmatically, this is done intentionally as the container is not meant to be interacted with directly.

For non-error messages, we recommend using aria-live regions to announce messages to screen reader users. Aria-live regions should be rendered to the page on load and remain present in the DOM.
Place messages within the aria-live region to ensure they are announced automatically without requiring focus management.
This approach works well for success, warning, info, and other non-critical message variants that should be announced but do not require immediate focus.

See: `examples/ProgrammaticFocus.md`

### With Title

A custom title can be set via the `title` prop, this prop accepts a string or any valid React node.

See: `examples/WithTitle.md`

### Variants

The `Message` component supports several variants to convey different types of messages. You can set the variant using the `variant` prop.
The type of message will be announced by screen readers along with the content, the announcement for each variant can be customized using the provided translation keys.

See: `examples/Variant.md`

#### Subtle Variants

See: `examples/SubtleVariant.md`

### Large size

You can use the `size` prop to change the size of the `Message` to "large".

See: `examples/SizeLarge.md`

## Props

### Message

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | Content to be rendered within the Message. |  |
| closeButtonAriaLabel | string \| undefined | No |  |  |  | Set custom aria-label for component's close button. |  |
| id | string \| undefined | No |  |  |  | Set custom id to component root. |  |
| onDismiss | ((e: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered on dismiss, will render the close button. |  |
| open | boolean \| undefined | No |  |  |  | Flag to determine if the message is rendered. |  |
| size | "medium" \| "large" \| undefined | No |  |  |  | Set the component's size. |  |
| title | React.ReactNode | No |  |  |  | Set message title. |  |
| variant | MessageVariant \| undefined | No |  |  |  | Set the component's variant. |  |
| width | string \| undefined | No |  |  |  | Set the component's width, accepts any valid css string. Please note the component has a max-width of 720px. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| showCloseIcon | boolean \| undefined | No |  | Yes | Please use the `onDismiss` prop to determine whether the close button is rendered instead. | Flag to determine if the close button is rendered. |  |
| transparent | boolean \| undefined | No |  | Yes | The transparent prop is deprecated and will be removed in a future release, please use the subtle variants instead. | Set transparent styling. |  |
