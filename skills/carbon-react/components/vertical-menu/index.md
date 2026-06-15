# VerticalMenu

Provides a vertical navigation for an app, which can be used via mouse or keyboard.

**Category:** Navigation

## Quick Start

```javascript
import {
  VerticalMenu,
  VerticalMenuItem,
  VerticalMenuFullScreen,
  VerticalMenuTrigger,
} from "carbon-react/lib/components/vertical-menu";
```

## Examples

### Default

Renders a vertical menu with navigation items. Use `VerticalMenuItem` for each entry. Set `href` or `onClick` to make items navigable or actionable.

See: `examples/Default.md`

### Item With OnClick Handler

```javascript
import { VerticalMenuItemClickEvent } from "carbon-react/lib/components/vertical-menu";
```

You can use the `onClick` prop to specify a function that will be called when the `VerticalMenuItem` component is clicked. The value of the `onClick` prop should be a valid function.

See: `examples/ItemWithOnClickHandler.md`

### With custom width and height

Set `width` and `height` on `VerticalMenu` to override the default full-height sidebar dimensions, constraining the menu to a fixed size.

See: `examples/CustomWidthAndHeight.md`

### Adornment

The `adornment` prop of `VerticalMenuItem` component can be used to pass a component that will be rendered on the right hand side of the title.
This prop also accepts a render function which accepts `isOpen` as a parameter. This can be used to conditionally render an icon based on the open state of the menu.

See: `examples/Adornment.md`

### Active

Same as `adornment`, the `active` prop of `VerticalMenuItem` component can be used to pass a boolean value to indicate if the menu item is active or not.
This prop also accepts a render function which accepts `isOpen` as a parameter.

See: `examples/Active.md`

### Custom item padding

Use the `py` prop on `VerticalMenuItem` to adjust the vertical padding of each item, controlling the row height and spacing density.

See: `examples/CustomItemPadding.md`

### Custom item margin

Use the `mx` prop on `VerticalMenuItem` to add horizontal margin inside the menu, giving items a card-like inset appearance.

See: `examples/CustomItemMargin.md`

### Custom item height

Set `height` on `VerticalMenuItem` to enforce a fixed minimum row height, useful for ensuring consistent touch targets.

See: `examples/CustomItemHeight.md`

### With custom component

The `component` prop of `VerticalMenuItem` component can be used to pass a custom component.
It can be used to render the item as a `Link` component from a router library like `react-router`.

See: `examples/CustomComponent.md`

### Full Screen

This story is best viewed in the `canvas` view and by adjusting the size of the window. The fullscreen menu behaviour will
trigger when the screen size is smaller than `1200px`. Also take note that in full screen mode the `VerticalMenuItems` are always open.
The `VerticalMenuTrigger` component is intended to be used to trigger opening the `VerticalMenuFullScreen`.

See: `examples/FullScreen.md`

## Props

### VerticalMenu

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Content of the menu - VerticalMenuItem |  |
| height | string \| undefined | No |  | Height of the menu | "100%" |
| width | string \| undefined | No |  | Width of the menu | "322px" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | An aria-label attribute for the menu |  |
| aria-labelledby | string \| undefined | No |  | An aria-labelledby attribute for the menu |  |

### VerticalMenuItem

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| title | string | Yes |  | Title of the menu item |  |
| active | boolean \| ((isOpen: boolean) => boolean) \| undefined | No |  | Whether the menu item is active or not |  |
| adornment | React.ReactNode \| ((isOpen: boolean) => React.ReactNode) | No |  | Adornment of the menu item meant to be rendered on the right side |  |
| ariaCurrent | boolean \| "location" \| "page" \| "time" \| "true" \| "false" \| "step" \| "date" \| undefined | No |  | Marks the element as the current item within a navigation context. |  |
| children | React.ReactNode | No |  | Children of the menu item - another level of VerticalMenuItems |  |
| component | T \| undefined | No |  | Optional component to render instead of the default div, useful for rendering router link components |  |
| customIcon | React.ReactNode | No |  | Custom icon to be displayed. Takes precedence over `iconType` if both are specified. |  |
| defaultOpen | boolean \| undefined | No |  | Default open state of the component | false |
| height | string \| undefined | No |  | Height of the menu item | "56px" |
| href | string \| undefined | No |  | Href, when passed the menu item will be rendered as an anchor tag |  |
| iconType | IconType \| undefined | No |  | The Carbon icon to be displayed. Defers to `customIcon` if both are defined. |  |
| onClick | ((event: VerticalMenuItemClickEvent) => void) \| undefined | No |  | A custom click handler to run when the menu item is clicked |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### VerticalMenuFullScreen

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Content of the menu - VerticalMenuItem |  |
| isOpen | boolean | Yes |  | Whether the menu is open or not |  |
| onClose | (ev: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement> \| KeyboardEvent) => void | Yes |  | A callback to be called when the close icon is clicked or enter is pressed when focused |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | An aria-label attribute for the menu |  |
| aria-labelledby | string \| undefined | No |  | An aria-labelledby attribute for the menu |  |

### VerticalMenuTrigger

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | string | Yes |  | Title of the menu trigger |  |
| onClick | (ev: React.MouseEvent<HTMLButtonElement>) => void | Yes |  | Callback passed to the menu trigger |  |
| height | string \| undefined | No |  | Height of the menu trigger | "40px" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
