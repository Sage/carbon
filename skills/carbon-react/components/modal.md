---
name: carbon-component-modal
description: Carbon Modal component props and usage examples.
---

# Modal

## Import
`import Modal from "carbon-react/lib/components/modal";`

## Source
- Export: `./components/modal`
- Props interface: `ModalProps`
- Deprecated: Yes
- Deprecation reason: `Modal` is deprecated. Please use `Dialog` instead.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| open | boolean | Yes |  | Sets the open state of the modal |  |
| ariaRole | string \| undefined | No |  | The ARIA role to be applied to the modal |  |
| children | React.ReactNode | No |  | Modal content |  |
| className | string \| undefined | No |  |  |  |
| disableClose | boolean \| undefined | No |  | Determines if the Dialog can be closed |  |
| disableEscKey | boolean \| undefined | No |  | Determines if the Esc Key closes the modal |  |
| enableBackgroundUI | boolean \| undefined | No |  | Determines if the background is disabled when the modal is open |  |
| onCancel | ((ev: React.KeyboardEvent<HTMLElement> \| KeyboardEvent) => void) \| undefined | No |  | A custom close event handler |  |
| restoreFocusOnClose | boolean \| undefined | No |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. |  |
| topModalOverride | boolean \| undefined | No |  | Manually override the internal modal stacking order to set this as top |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
No Storybook examples found.