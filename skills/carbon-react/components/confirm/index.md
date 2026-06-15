# Confirm

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated modal dialog that asks the user to confirm or cancel an action. Renders a title, optional subtitle, body content, and configurable Confirm/Cancel buttons. Use `Dialog` for new implementations.

**Category:** Modal

## Quick Start

```javascript
import Confirm from "carbon-react/lib/components/confirm";
```

## Related Components

- Longer message which stays on-screen? [Try Message](../message/index.md).
- Longer, time sensitive message that must be dismissed? Try Toast.
- Error or warning message that interrupts activity? Try Alert.
- Simple task in context? [Try Dialog](../dialog/index.md).

## Examples

### Default

Basic confirm dialog with title, subtitle, body text and default Confirm/Cancel buttons.

See: `examples/Default.md`

### Single action

Hide the cancel button by omitting `onCancel` to show only the Confirm action.

See: `examples/SingleAction.md`

### Destructive cancel button

Style the cancel button as destructive (red) using the `cancelButtonDestructive` prop.

See: `examples/CancelButtonDestructive.md`

### Destructive confirm button

Style the confirm button as destructive (red) using the `confirmButtonDestructive` prop. Use this for irreversible actions.

See: `examples/ConfirmButtonDestructive.md`

### Disable confirm button

Use `disableConfirm` to prevent the user from confirming until a prerequisite condition is met.

See: `examples/DisableConfirm.md`

### Disable cancel button

Use `disableCancel` to prevent the user from dismissing the dialog.

See: `examples/DisableCancel.md`

### Change cancel button type

Allows to set variant which is supported in `<Button />` and it will be applied to the `cancel` button

See: `examples/CancelButtonType.md`

### Change confirm button type

Allows to set variant which is supported in `<Button />` and it will be applied to the `confirm` button

See: `examples/ConfirmButtonType.md`

### Change buttons icons

Add icons to the confirm and cancel buttons using `confirmButtonIconType` and `cancelButtonIconType`.

See: `examples/ButtonsIcons.md`

### Confirm button loading

Set `isLoadingConfirm` to show a spinner in the confirm button while an async operation is in progress.

See: `examples/IsLoadingConfirm.md`

### Confirm with Custom Data Tags

Demonstrates applying custom `data-*` attributes to the dialog and its buttons for test automation selectors.

See: `examples/DefaultWithCustomDataTags.md`

## Props

### Confirm

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onConfirm | (ev: React.MouseEvent<HTMLButtonElement>) => void | Yes |  |  |  | A custom event handler when a confirmation takes place |  |
| open | boolean | Yes |  |  |  | Sets the open state of the modal |  |
| cancelButtonDataProps | TagProps \| undefined | No |  |  |  | Data tag prop bag for cancelButton |  |
| cancelButtonDestructive | boolean \| undefined | No |  |  |  | Apply destructive style to the cancel button | false |
| cancelButtonIconPosition | "before" \| "after" \| undefined | No |  |  |  | Defines a cancel button Icon position related to the children: "before" \| "after" |  |
| cancelButtonIconType | IconType \| undefined | No |  |  |  | Defines an Icon type within the cancel button (see Icon for options) |  |
| cancelButtonType | "primary" \| "secondary" \| "tertiary" \| "darkBackground" \| undefined | No |  |  |  | Color variants for new business themes: "primary" \| "secondary" \| "tertiary" \| "darkBackground" | "secondary" |
| cancelLabel | string \| undefined | No |  |  |  | Customise the cancel button label |  |
| children | React.ReactNode | No |  |  |  | Child elements |  |
| closeButtonDataProps | Pick<TagProps, "data-element" \| "data-role"> \| undefined | No |  |  |  | Data tag prop bag for close Button |  |
| confirmButtonDataProps | TagProps \| undefined | No |  |  |  | Data tag prop bag for confirmButton |  |
| confirmButtonDestructive | boolean \| undefined | No |  |  |  | Apply destructive style to the confirm button | false |
| confirmButtonIconPosition | "before" \| "after" \| undefined | No |  |  |  | Defines a cancel button Icon position related to the children: "before" \| "after" |  |
| confirmButtonIconType | IconType \| undefined | No |  |  |  | Defines an Icon type within the confirm button (see Icon for options) |  |
| confirmButtonType | "primary" \| "secondary" \| "tertiary" \| "darkBackground" \| undefined | No |  |  |  | Color variants for new business themes: "primary" \| "secondary" \| "tertiary" \| "darkBackground" | "primary" |
| confirmLabel | string \| undefined | No |  |  |  | Customise the confirm button label |  |
| contentRef | React.ForwardedRef<HTMLDivElement> \| undefined | No |  |  |  | Reference to the scrollable content element |  |
| disableAutoFocus | boolean \| undefined | No |  |  |  |  |  |
| disableCancel | boolean \| undefined | No |  |  |  | Makes cancel button disabled |  |
| disableConfirm | boolean \| undefined | No |  |  |  | Makes confirm button disabled |  |
| disableEscKey | boolean \| undefined | No |  |  |  | Determines if the Esc Key closes the modal |  |
| disableStickyOnSmallScreen | boolean \| undefined | No |  |  |  | When true, header and sticky footer become unstickied for accessibility on small screen devices. On small screen devices, the dialog becomes full width and has no dimmer. |  |
| focusFirstElement | HTMLElement \| React.RefObject<HTMLElement> \| null \| undefined | No |  |  |  | Optional reference to an element meant to be focused on open |  |
| footer | React.ReactNode | No |  |  |  | Footer content to be rendered at the bottom of the dialog |  |
| gradientKeyLine | boolean \| undefined | No |  |  |  | Adds a gradient keyline to the dialog header |  |
| greyBackground | boolean \| undefined | No |  |  |  | Change the background color of the content to grey |  |
| headerChildren | React.ReactNode | No |  |  |  | Container for components to be displayed in the header |  |
| height | string \| undefined | No |  |  |  | Allows developers to specify a specific height for the dialog. |  |
| iconType | "error" \| "warning" \| undefined | No |  |  |  | Defines an Icon type within the button (see Icon for options) |  |
| isLoadingConfirm | boolean \| undefined | No |  |  |  | Adds isLoading state into confirm button |  |
| onCancel | ((ev: React.KeyboardEvent<HTMLElement> \| KeyboardEvent \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | A custom close event handler |  |
| restoreFocusOnClose | boolean \| undefined | No |  |  |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. |  |
| showCloseIcon | boolean \| undefined | No |  |  |  | Determines if the close icon is shown | false |
| size | "auto" \| Size \| "extra-small" \| "medium-small" \| "medium-large" \| "extra-large" \| "maximise" \| undefined | No |  |  |  | Size — accepts both legacy values (extra-small, medium-small, etc.) and new values (small, medium, large, fullscreen). | "extra-small" |
| stickyFooter | boolean \| undefined | No |  |  |  | Makes the footer stick to the bottom of the dialog when content scrolls |  |
| subtitle | React.ReactNode | No |  |  |  | Subtitle displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to subtitle prop. |  |
| title | React.ReactNode | No |  |  |  | Title displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to title prop. |  |
| topModalOverride | boolean \| undefined | No |  |  |  | Manually override the internal modal stacking order to set this as top |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Prop to specify the aria-describedby property of the Dialog component |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label of the Dialog component. To be used only when the title prop is not defined, and the component is not labelled by any internal element. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the Dialog component To be used when the title prop is a custom React Node, or the component is labelled by an internal element other than the title. |  |
| disableContentPadding | boolean \| undefined | No |  | Yes | Use `contentPadding` instead. |  |  |
| fullscreen | boolean \| undefined | No |  | Yes | Use `size="fullscreen"` instead. |  |  |
| highlightVariant | string \| undefined | No |  | Yes | Use `gradientKeyLine` instead. |  |  |
| pagesStyling | boolean \| undefined | No |  | Yes |  |  |  |
