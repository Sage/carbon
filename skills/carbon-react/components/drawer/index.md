# Drawer

A collapsible side panel that sits alongside the main page content. The `sidebar` prop holds the panel content; the main children are always visible. Unlike `Dialog` or `Sidebar`, the drawer is non-modal and does not trap focus.

**Category:** UI presentation

## Quick Start

```javascript
import Drawer from "carbon-react/lib/components/drawer";
```

## Examples

### Default

To use `Drawer`, pass the main content as children and the drawer content via the `sidebar` prop as any valid React node.

See: `examples/Default.md`

### Height

By default the height of the component is set to `100%`, to set a custom height use the `height` prop.

See: `examples/Height.md`

### Sidebar Width

By default, the width of the drawer when expanded is set to `30vw`, with a min-width of `288px` and a max-width of `760px`. 
To set a custom width to the drawer, use the `expandedWidth` prop.

See: `examples/SidebarWidth.md`

### With Title

To render a title within the `Drawer`, use the `title` prop and pass any valid React node.

The `aria-labelledby` attribute will be automatically applied to the sidebar when the title prop is provided.

See: `examples/WithTitle.md`

### With Footer

To render a footer within the `Drawer`, use the `footer` prop and pass any valid React node.

See: `examples/WithFooter.md`

### Sticky Header & Footer

To render the title and/or footer as sticky, you can use the `stickyHeader` and `stickyFooter` props.

See: `examples/StickyHeaderAndFooter.md`

### Sidebar Aria Label

To give the sidebar an accessible label when not providing a `title` please use the `sidebarAriaLabel` prop.

See: `examples/SidebarAriaLabel.md`

### Background Color

To set a custom background color for the drawer sidebar, use the `backgroundColor` prop.

See: `examples/WithBackgroundColor.md`

### Controlled

To control the visibility of the drawer, you can use the `expanded` prop.

See: `examples/Controlled.md`

## Props

### Drawer

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | Main content to display |  |
| backgroundColor | string \| undefined | No |  |  |  | Sets color of sidebar's background |  |
| expanded | boolean \| undefined | No |  |  |  | Sets the expansion state of the Drawer if component is meant to be used as controlled |  |
| expandedWidth | string \| undefined | No |  |  |  | The width of the expanded sidebar | "30vw" |
| footer | React.ReactNode | No |  |  |  | Content to display inside of a footer |  |
| height | string \| undefined | No |  |  |  | Sets the height of the component | "100%" |
| onChange | ((e: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>, isExpanded: boolean) => void) \| undefined | No |  |  |  | Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) |  |
| sidebar | React.ReactNode | No |  |  |  | Drawer sidebar content |  |
| sidebarAriaLabel | string \| undefined | No |  |  |  | Specify an aria-label for the Drawer sidebar |  |
| stickyFooter | boolean \| undefined | No |  |  |  | Makes the footer of the drawer sticky. Footer prop must also be set. |  |
| stickyHeader | boolean \| undefined | No |  |  |  | Makes the header of the drawer sticky. Title prop must also be set. |  |
| title | React.ReactNode | No |  |  |  | Sets the heading of the drawer |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Specify an aria-label for the Drawer component |  |
| animationDuration | string \| undefined | No |  | Yes | This prop will soon be removed. | Duration of a animation | "400ms" |
| defaultExpanded | boolean \| undefined | No |  | Yes | This prop will soon be removed, please use the `expanded` prop instead. | Set the default state of expansion of the Drawer if component is meant to be used as uncontrolled |  |
| showControls | boolean \| undefined | No |  | Yes | This prop will soon be removed, this component is now intended to be non-dismissible. | Enables expand/collapse button that controls drawer |  |
