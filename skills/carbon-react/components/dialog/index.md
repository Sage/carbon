# Dialog

A dialog displays content in context without navigating the user to a different page.

It remains on screen and blocks the user workflow until the user performs an action, cancels an action, or acknowledges something.

**Category:** Modal

## Quick Start

```javascript
import Dialog, { type DialogHandle } from "carbon-react/lib/components/dialog";
```

## Related Components

- Need to refer back to the underlying page? [Try Sidebar](../sidebar/index.md).

## Examples

### Default

A `Dialog` requires an `open` prop and an `onCancel` handler. Use the `footer` prop to render action buttons at the bottom of the dialog. The call-to-action element should always be focused when the `Dialog` is closed — the example below shows how to programmatically restore focus to the trigger element for consistent behaviour across all browsers.

See: `examples/DefaultStory.md`

### With a Form

When including a `Form` inside a `Dialog`, the `Form` can manage its own sticky footer independently.

See: `examples/DefaultWithForm.md`

### Sizes

The `size` prop controls the maximum width of the dialog. The default is `"medium"`.

#### Small (540px)

See: `examples/SmallSize.md`

#### Medium (850px) — Default

See: `examples/MediumSize.md`

#### Large (1080px)

See: `examples/LargeSize.md`

#### Full Screen

See: `examples/FullScreenSize.md`

### Responsive behavior

The dialog shrinks to fit the viewport when the viewport is narrower than the dialog's maximum width. The minimum width is 288px.

See: `examples/ResponsiveBehavior.md`

### Small screen behavior

When `disableStickyOnSmallScreen` is set, the header and footer are no longer sticky on small screen devices (below 600px). On these devices the dialog also becomes full width and the dimmer is removed, improving accessibility on mobile.

See: `examples/SmallScreenBehavior.md`

### Sticky footer

Use the `stickyFooter` prop together with `footer` to keep the footer visible when dialog content scrolls.

See: `examples/StickyFooter.md`

### Sticky footer with Form

See: `examples/StickyFooterWithForm.md`

### Form linked to footer buttons

When using the Dialog's `footer` prop, the action buttons live outside the `<form>` element in the DOM. Use the `id` prop on `Form` and the `form` prop on `Button` to associate them.

See: `examples/FormLinkedToFooterButtons.md`

### With a custom height

Use the `height` prop to set a fixed height on the dialog.

See: `examples/WithHeight.md`

### With header children

Use the `headerChildren` prop to render additional content — such as action buttons — in the dialog header.

See: `examples/WithHeaderChildren.md`

### Gradient keyline

Setting `gradientKeyLine` adds a decorative gradient keyline below the dialog header.

See: `examples/GradientKeyLine.md`

### Overriding content padding

Use the `contentPadding` prop to override the default padding applied to the dialog content area.

See: `examples/WithContentPadding.md`

### Preventing focus from being restored when Dialog closes

When `restoreFocusOnClose` is `false`, focus will not be returned to the element that was focused before the `Dialog` was opened. You can instead programmatically apply focus to another element — for example, a message that has just appeared.

See: `examples/RestoreFocusOnClose.md`

### Loading content

For content that cannot be rendered immediately — such as data from an external API — use conditional rendering with the `Loader` component:

See: `examples/LoadingContent.md`

The first interactive element in the loaded content has `autoFocus` set, which is recommended so that assistive technology users are informed of the updated content.

### Overriding the first focused element

By default, when a dialog opens it focuses the first focusable element in its children. There are two ways to override this:

- Pass a ref to `focusFirstElement` to focus a specific element on open.
- Use `disableAutoFocus` and set `autoFocus` directly on the element you want focused.

To achieve this, forward a custom ref handle to the `Dialog` component using the `DialogHandle` type:

```tsx
const dialogHandle = useRef<DialogHandle>(null);

return (
  <Dialog title="Thank you for your feedback" ref={dialogHandle}>
    Your feedback helps us continually improve our software.
  </Dialog>
);
```

The handle exposes the `focus()` method of the Dialog's root DOM node:

```ts
dialogHandle.current?.focus();
```

### Allowing other elements to be focused

Use `focusableContainers` to allow elements outside the dialog's DOM subtree — such as Toast notifications — to be reachable with the keyboard while the dialog is open.

See: `examples/OtherFocusableContainers.md`

### Accessibility

If your dialog contains scrollable content, add `tabIndex="0"` to the scrollable container so keyboard users can access it:

See: `examples/WithScrollableContent.md`

## Props

### Dialog

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| open | boolean | Yes |  |  |  | Sets the open state of the modal |  |
| ariaRole | string \| undefined | No |  |  |  | The ARIA role to be applied to the modal |  |
| bespokeFocusTrap | ((ev: KeyboardEvent, firstElement?: HTMLElement, lastElement?: HTMLElement) => void) \| undefined | No |  |  |  | Function to replace focus trap |  |
| children | React.ReactNode | No |  |  |  | Child elements |  |
| className | string \| undefined | No |  |  |  |  |  |
| closeButtonDataProps | Pick<TagProps, "data-element" \| "data-role"> \| undefined | No |  |  |  | Data tag prop bag for close Button |  |
| contentPadding | ContentPaddingInterface \| undefined | No |  |  |  | Padding to be set on the Dialog content |  |
| contentRef | React.ForwardedRef<HTMLDivElement> \| undefined | No |  |  |  | Reference to the scrollable content element |  |
| disableAutoFocus | boolean \| undefined | No |  |  |  |  |  |
| disableEscKey | boolean \| undefined | No |  |  |  | Determines if the Esc Key closes the modal |  |
| disableFocusTrap | boolean \| undefined | No |  |  |  |  |  |
| disableStickyOnSmallScreen | boolean \| undefined | No |  |  |  | When true, header and sticky footer become unstickied for accessibility on small screen devices. On small screen devices, the dialog becomes full width and has no dimmer. |  |
| enableBackgroundUI | boolean \| undefined | No |  |  |  | Determines if the background is disabled when the modal is open |  |
| focusableContainers | React.RefObject<HTMLElement>[] \| undefined | No |  |  |  | an optional array of refs to containers whose content should also be reachable by tabbing from the dialog |  |
| focusableSelectors | string \| undefined | No |  |  |  | Optional selector to identify the focusable elements, if not provided a default selector is used |  |
| focusFirstElement | HTMLElement \| React.RefObject<HTMLElement> \| null \| undefined | No |  |  |  | Optional reference to an element meant to be focused on open |  |
| footer | React.ReactNode | No |  |  |  | Footer content to be rendered at the bottom of the dialog |  |
| gradientKeyLine | boolean \| undefined | No |  |  |  | Adds a gradient keyline to the dialog header |  |
| greyBackground | boolean \| undefined | No |  |  |  | Change the background color of the content to grey |  |
| headerChildren | React.ReactNode | No |  |  |  | Container for components to be displayed in the header |  |
| height | string \| undefined | No |  |  |  | Allows developers to specify a specific height for the dialog. |  |
| help | string \| undefined | No |  |  |  | Adds Help tooltip to Header |  |
| onCancel | ((ev: React.KeyboardEvent<HTMLElement> \| KeyboardEvent \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | A custom close event handler |  |
| restoreFocusOnClose | boolean \| undefined | No |  |  |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. |  |
| role | string \| undefined | No |  |  |  | The ARIA role to be applied to the Dialog container |  |
| showCloseIcon | boolean \| undefined | No |  |  |  | Determines if the close icon is shown |  |
| size | "auto" \| Size \| "extra-small" \| "medium-small" \| "medium-large" \| "extra-large" \| "maximise" \| undefined | No |  |  |  | Size — accepts both legacy values (extra-small, medium-small, etc.) and new values (small, medium, large, fullscreen). |  |
| stickyFooter | boolean \| undefined | No |  |  |  | Makes the footer stick to the bottom of the dialog when content scrolls |  |
| subtitle | React.ReactNode | No |  |  |  | Subtitle displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to subtitle prop. |  |
| title | React.ReactNode | No |  |  |  | Title displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to title prop. |  |
| topModalOverride | boolean \| undefined | No |  |  |  | Manually override the internal modal stacking order to set this as top |  |
| data-component | string \| undefined | No |  |  |  |  |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Prop to specify the aria-describedby property of the Dialog component |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label of the Dialog component. To be used only when the title prop is not defined, and the component is not labelled by any internal element. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the Dialog component To be used when the title prop is a custom React Node, or the component is labelled by an internal element other than the title. |  |
| disableClose | boolean \| undefined | No |  | Yes |  |  |  |
| disableContentPadding | boolean \| undefined | No |  | Yes | Use `contentPadding` instead. |  |  |
| fullscreen | boolean \| undefined | No |  | Yes | Use `size="fullscreen"` instead. |  |  |
| highlightVariant | string \| undefined | No |  | Yes | Use `gradientKeyLine` instead. |  |  |
| pagesStyling | boolean \| undefined | No |  | Yes |  |  |  |

## Ref methods

`Dialog`'s forwarded ref exposes the following imperative methods:

| Method Name | Description                                            |
| ----------- | ------------------------------------------------------ |
| `focus()`   | Programmatically focuses the root container of Dialog. |
