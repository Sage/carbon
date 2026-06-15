# Adaptive Sidebar

The `AdaptiveSidebar` component is a non-floating, non-modal sidebar that can be used to display content on the side of the screen. It can be opened and
closed by the user, and can be used to display additional information or actions.

**Category:** Modal

## Quick Start

To use the adaptive sidebar, import `AdaptiveSidebar` into your project. All content within the `AdaptiveSidebar` component is determined by the user; by
default, the component will be empty, allowing for complete control of layout, etc.

As the `AdaptiveSidebar` can be rendered as a modal, it is **strongly** recommended that the component is given an accessible name.
This can be generated via the `aria-label` or `aria-labelledby` attributes.

```javascript
import AdaptiveSidebar from "carbon-react/lib/components/adaptive-sidebar";
```

## Examples

### Default

The `AdaptiveSidebar` component should be used as a sibling component; place it directly after the component you want to be the main content of the page;
it is recommended that both are placed in an inline container, such as a `Box` component with the `display: flex | inline-flex` and `flexDirection: row`
props. Content must be passed to the `AdaptiveSidebar` component as children.

See: `examples/Basic.md`

The example below demonstrates the recommended usage of the `AdaptiveSidebar` component. The sidebar is placed directly after the main content, and both are
wrapped in a `Box` component with the `display: flex` and `flexDirection: row` props. The sidebar is opened and closed by clicking the button in the main
content. Within the sidebar, there is a button that closes the sidebar, alongside some example content.

See: `examples/Default.md`

### Complex

The following example demonstrates a more complex use case for the `AdaptiveSidebar` component. In this example, the sidebar is controlled via a menu item
click in the nav bar, and positions itself accordingly. This example is best viewed in a canvas.

See: `examples/Complex.md`

### With Custom Width

The width of the `AdaptiveSidebar` component can be customised by passing a `width` prop. The width can be set to a specific value, or omitted to use the
default width (320px).

See: `examples/WithCustomWidth.md`

### With Custom Height

By default, the height of the `AdaptiveSidebar` component is set to `100%`. This can be customised by passing a `height` prop. The height can be set to a
specific value, or omitted to use the default height. If content extends beyond the height of the sidebar, a scrollbar will be rendered. The following example
has been styled in such a way that the custom height is easily visible; as such, no styling will be present if a custom height is specified.

See: `examples/WithCustomHeight.md`

### Background Variants

The `AdaptiveSidebar` component supports one of three background variants: `app`, `black` and `white`, which are set via the `backgroundColor` prop. When set, the
foreground color will be automatically set to the directly-contrasting color (i.e. white-on-black, black-on-white). If not provided, the default background
variant is `white`.

See: `examples/BackgroundVariants.md`

### With Adaptive Breakpoint

The `AdaptiveSidebar` component will operate in the sibling manner outline above until the viewport width is less than the `adaptiveBreakpoint` prop value.
At this point, the sidebar will be rendered as a dialog sidebar, and focus will be trapped within it until closed. The following example is best viewed in a
canvas.

See: `examples/WithAdaptiveBreakpoint.md`

### Render As Modal

There may be cases where the `AdaptiveSidebar` component should always be rendered as a dialog sidebar, regardless of the viewport width. This can be achieved
by setting the `renderAsModal` prop to `true`. The following example is best viewed in a canvas.

See: `examples/RenderAsModal.md`

### With Custom Border Color

By default, no separator is rendered between the main content and the sidebar. If a visual separator is required, a custom border color can be set by passing
a `borderColor` prop. The following example demonstrates the use of a custom border color.

See: `examples/WithCustomBorderColor.md`

### Hidden

By using the `hidden` prop, the `AdaptiveSidebar` component can be hidden from view. This is useful for cases where the sidebar should not be displayed, but
the component should still be rendered in the DOM. The following example demonstrates the use of the `hidden` prop. The sidebar is closed by default, and can
be opened by clicking the "Open" button in the main content. The sidebar can be closed by clicking the "Close" button within the sidebar itself, or hidden by
clicking the "Hide" button in the sidebar itself. The sidebar can be revealed again by clicking the "Show" button in the main content.

See: `examples/Hidden.md`

## Props

### AdaptiveSidebar

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| open | boolean | Yes |  | Whether the sidebar is open or closed |  |
| adaptiveBreakpoint | number \| undefined | No |  | The breakpoint (in pixels) at which the sidebar will convert to a dialog-based sidebar | 768 |
| animationTimeout | number \| undefined | No |  | The time in milliseconds for the sidebar to animate |  |
| backgroundColor | "white" \| "black" \| "app" \| undefined | No |  | The background color of the sidebar | "white" |
| borderColor | string \| undefined | No |  | The color to use for the left-hand border of the sidebar. Should be a design token e.g. `--colorsUtilityYang100` | "none" |
| children | React.ReactNode | No |  | The content of the sidebar |  |
| height | string \| undefined | No |  | The height of the sidebar, relative to the wrapping component | "100%" |
| hidden | boolean \| undefined | No |  | Whether the sidebar is hidden from view. In this state, the adaptive sidebar will continue to receive updates, etc. but will not be visible to users | false |
| renderAsModal | boolean \| undefined | No |  | Whether to render the sidebar as a modal component instead of as an inline sidebar | false |
| restoreFocusOnClose | boolean \| undefined | No |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. | false |
| width | string \| undefined | No |  | The width of the sidebar | "320px" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label of the component, applied when the component is rendered as a modal |  |
| aria-labelledby | string \| undefined | No |  | Prop to specify the aria-labelledby property of the component, applied when the component is rendered as a modal |  |
