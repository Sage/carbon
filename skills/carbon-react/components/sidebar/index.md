# Sidebar

## Import

```javascript
import Sidebar from "carbon-react/lib/components/sidebar";
```

## Related Components

- Simple task in context? [Try Dialog](../dialog/index.md).

## Examples

### Default

The call-to-action element should always be focused when the `Sidebar` is closed. However, in some instances it may not receive focus
due to specific browser design choices. The below example shows how to programmatically focus the call-to-action element when the `Sidebar` is closed
to ensure behaviour is consistent across all browsers.

See: `examples/DefaultStory.md`

### Preventing focus from being restored when Sidebar closes

When the `restoreFocusOnClose` prop is `false`, focus will not be restored to the element that was focused before the `Sidebar` was opened.
Focus can instead be programmatically applied to another element if appropriate.

See: `examples/RestoreFocusOnCloseStory.md`

### Custom padding around content

See: `examples/CustomPaddingAroundContent.md`

### With header

See: `examples/WithHeader.md`

### With dark header

See: `examples/WithDarkHeader.md`

### With header and subheader

See: `examples/WithHeaderAndSubheader.md`

### With scroll

If sidebar content does not fit the sidebar, scroll will appear. Default scroll theme is "light".

See: `examples/WithScroll.md`

### With Typography

See: `examples/WithTypography.md`

### Allowing other elements to be focused

Using the `focusableContainers` prop allows elements that are not DOM children of the Sidebar to be reachable with the keyboard while the Sidebar is open.
This may occasionally be useful with things like Toasts where they persist on the page until dismissed by clicking a close icon.
(In the example below, try clicking the cancel and/or save buttons and notice how you can navigate across one or both toasts as well as the sidebar using the keyboard.)

See: `examples/OtherFocusableContainers.md`

### Custom width

It is possible to set a custom width for the `Sidebar` via the `width` [prop](#props).
Setting this prop will override the preset width value defined via the `size` prop.

See: `examples/CustomWidth.md`

### With header and footer padding overridden

See: `examples/WithHeaderAndFooterPadding.md`

### Top modal override

When multiple modals are open on a page Carbon manages the order internally so that the last one mounted in the DOM
is treated as the top one and the focus trap is set on it. However, this can potentially
create unexpected issues if the loading of the dialogs isn't synchronous. In order to guarantee that a given
modal is treated as top set the `topModalOverride` prop. Please note that in the scenario where this prop is
set on multiple modals, the last one mounted with it will be treated as top.

See: `examples/TopModalOverride.md`

## Props

### Sidebar

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| open | boolean | Yes |  | Sets the open state of the modal |  |
| bespokeFocusTrap | ((ev: KeyboardEvent, firstElement?: HTMLElement, lastElement?: HTMLElement) => void) \| undefined | No |  | Function to replace focus trap |  |
| children | React.ReactNode | No |  | Modal content |  |
| className | string \| undefined | No |  |  |  |
| closeButtonDataProps | Pick<TagProps, "data-element" \| "data-role"> \| undefined | No |  | Data tag prop bag for close Button |  |
| disableAutoFocus | boolean \| undefined | No |  |  |  |
| disableEscKey | boolean \| undefined | No |  | Determines if the Esc Key closes the modal |  |
| enableBackgroundUI | boolean \| undefined | No |  | Set this prop to false to hide the translucent background when the dialog is open. |  |
| focusableContainers | React.RefObject<HTMLElement>[] \| undefined | No |  | an optional array of refs to containers whose content should also be reachable by tabbing from the sidebar |  |
| focusableSelectors | string \| undefined | No |  | Optional selector to identify the focusable elements, if not provided a default selector is used |  |
| focusFirstElement | React.MutableRefObject<HTMLElement \| null> \| undefined | No |  | Optional reference to an element meant to be focused on open |  |
| header | React.ReactNode | No |  | Node that will be used as sidebar header. |  |
| headerPadding | PaddingProps | No |  | Padding to be set on the Sidebar header |  |
| headerVariant | "dark" \| "light" \| undefined | No |  | Header background variant for the sidebar. |  |
| hidden | boolean \| undefined | No |  |  |  |
| onCancel | ((ev: React.KeyboardEvent<HTMLElement> \| KeyboardEvent \| React.MouseEvent<HTMLElement>) => void) \| undefined | No |  | A custom close event handler |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| position | "left" \| "right" \| undefined | No |  | Sets the position of sidebar, either left or right. |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| restoreFocusOnClose | boolean \| undefined | No |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. |  |
| role | string \| undefined | No |  | The ARIA role to be applied to the component container |  |
| size | "small" \| "medium" \| "large" \| "extra-small" \| "medium-small" \| "medium-large" \| "extra-large" \| undefined | No |  | Sets the size of the sidebar when open. |  |
| subHeader | React.ReactNode | No |  | Node that will be used as sidebar subheader. |  |
| subHeaderPadding | PaddingProps | No |  | Padding to be set on the Sidebar subheader |  |
| topModalOverride | boolean \| undefined | No |  | Manually override the internal modal stacking order to set this as top |  |
| width | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The width utility parses a component's `width` prop and converts it into a CSS width declaration. - Numbers from 0-1 are converted to percentage widths. - Numbers greater than 1 are converted to pixel values. - String values are passed as raw CSS values. - And arrays are converted to responsive width styles. |  |
| widthAnimation | boolean \| undefined | No |  | Enables width animation when the sidebar width changes. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  | Prop to specify the aria-describedby property of the component |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label of the component. To be used only when the header prop is not defined, and the component is not labelled by any internal element. |  |
| aria-labelledby | string \| undefined | No |  | Prop to specify the aria-labelledby property of the component To be used when the header prop is a custom React Node, or the component is labelled by an internal element other than the header. |  |
