# Toast

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated notification component that renders a temporary message overlay anchored to the viewport. Supports multiple variants (`success`, `info`, `neutral`, `error`, `warning`, `notice`, `notification`), configurable horizontal and vertical alignment, auto-dismiss with a timeout, stacking via `targetPortalId`, and an optional dismiss button.

**Category:** Feedback

## Quick Start

To use toast, import the `Toast` and pass the content as children.

```javascript
import Toast from "carbon-react/lib/components/toast";
```

## Examples

### Controlled

```javascript
const MyComponent = () => (
  <Toast
    variant="info"
    id="toast-quick-start"
    open={isOpen}
    onDismiss={onDismissClick}
  >
    {children}
  </Toast>
);
```

It can be used as a uncontrolled component.

### Uncontrolled

```javascript
const MyComponent = () => (
  <Toast variant="info" id="toast-quick-start">
    {children}
  </Toast>
);
```

## Props

### Toast

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The rendered children of the component. |  |
| align | AlignOptions \| undefined | No |  | Sets the horizontal alignment of the component. |  |
| alignY | AlignYOptions \| undefined | No |  | Sets the vertical alignment of the component |  |
| closeButtonDataProps | Pick<TagProps, "data-element" \| "data-role"> \| undefined | No |  | Data tag prop bag for close Button |  |
| disableAutoFocus | boolean \| undefined | No |  | Disables auto focus functionality when the Toast has a close icon |  |
| id | string \| undefined | No |  | Custom id |  |
| maxWidth | string \| undefined | No |  | Maximum toast width |  |
| onDismiss | ((ev?: KeyboardEvent \| React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback for when dismissed. |  |
| open | boolean \| undefined | No |  | Determines if the Toast is open. |  |
| targetPortalId | string \| undefined | No |  | Target Portal ID where the Toast will render |  |
| timeout | string \| number \| undefined | No |  | Time for Toast to remain on screen |  |
| variant | ToastVariants \| undefined | No |  | Sets Toast variant |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
