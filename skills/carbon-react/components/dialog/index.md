# Dialog

A dialog box overlaid on top of any page.

## Import

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

See: `examples/SmallSizeAndMediumSizeAndLargeSizeAndFullScreenSize.md`

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

### Allowing other elements to be focused

Use `focusableContainers` to allow elements outside the dialog's DOM subtree — such as Toast notifications — to be reachable with the keyboard while the dialog is open.

See: `examples/OtherFocusableContainers.md`

### Accessibility

If your dialog contains scrollable content, add `tabIndex="0"` to the scrollable container so keyboard users can access it:

See: `examples/WithScrollableContent.md`

## Ref methods

`Dialog`'s forwarded ref exposes the following imperative methods:

| Method Name | Description                                            |
| ----------- | ------------------------------------------------------ |
| `focus()`   | Programmatically focuses the root container of Dialog. |
