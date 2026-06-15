# Menu

Provides navigation for an app, which can be used via mouse or keyboard.

**Category:** Navigation

## Quick Start

```javascript
import {
  Menu,
  MenuItem,
  MenuDivider,
  MenuSegmentTitle,
  ScrollableBlock,
  MenuFullscreen,
  type MenuItemHandle,
} from "carbon-react/lib/components/menu";
```

## Examples

### Default

A horizontal `Menu` bar with `MenuItem` children. Items can navigate via `href`, trigger an `onClick`, or open a submenu.

See: `examples/DefaultStory.md`

> **Note**: To ensure a `MenuItem` is interactive, it should either have an `href`, `onClick` or `submenu` prop, or contain another focusable Carbon component like Button. Without one of these, the item will not be keyboard-focusable or interactive, affecting accessibility for keyboard and screen reader users.

### Focusing MenuItem's Programmatically

The `MenuItemHandle` type provides an imperative handle for programmatic control over `MenuItem`. 
Using a `ref`, you can access its `focus()` method to set focus on the `MenuItem` as needed.

> **Note**: The `focus()` method will only work on interactive elements.

See: `examples/ProgrammaticFocus.md`

### Selected

Use the `selected` prop on a `MenuItem` to highlight the currently active page item.

See: `examples/SelectedStory.md`

### Divider

Use `MenuDivider` between `MenuItem` components to add a visual separator.

See: `examples/DividerStory.md`

### Large divider

Use `size="large"` on `MenuDivider` for a thicker visual separator between sections.

See: `examples/LargeDividerStory.md`

### Segment title

Use `MenuSegmentTitle` to add a non-interactive section heading above a group of `MenuItem`s in a submenu.

See: `examples/SegmentTitleStory.md`

### With alternate colour variant

Set `variant="alternate"` on `MenuItem` to apply an alternate background colour, useful for grouping visually distinct items.

See: `examples/AlternateColourStory.md`

### Submenu Nodes

The `submenu` prop on `MenuItem` accepts a node, which allows the creation of complex composition for the title with **non-interactive elements only**, when the `MenuItem` has a submenu. It is recommended to also pass the 
`ariaLabel` prop when the composition is especially complex, to ensure screen readers can provide the correct context to users.

See: `examples/SubmenuNodes.md`

> **Note**: Also, if a complex composition is used, proceed with caution when using the `maxWidth` prop, the onus is now on the consumer to ensure the content of the `submenu` is properly communicated to users.

### Submenu options

A `MenuItem` with the `submenu` prop opens a dropdown list of child `MenuItem`s on hover/click. The submenu opens below by default.

See: `examples/SubmenuOptionsStory.md`

### Submenu direction left

Set `submenuDirection="left"` on a parent `MenuItem` to open its submenu to the left side, useful for right-edge items.

See: `examples/SubmenuDirectionLeftStory.md`

### With icon

Pass the `icon` prop to `MenuItem` to prepend a Carbon icon to the item label.

See: `examples/WithIconStory.md`

### No dropdown arrow on submenu

The example below has set the `showDropdownArrow` to false for the MenuItem with a submenu which means no dropdown arrow
is rendered.

See: `examples/NoDropdownArrowOnSubmenuStory.md`

### Split submenu into separate component

If you need to split out a submenu into a separate component, it must be done as shown below in order for the keyboard navigation to work as intended.

See: `examples/SplitSubmenuIntoSeparateComponentStory.md`

### Submenu icon and text alignment

In order to align text and icons within a submenu a `Box` component will need to be used to adjust the margin of the content.

See: `examples/SubmenuIconAndTextAlignment.md`

### Scrollable submenu

A scrollable submenu can be added using the `ScrollableBlock` component. This can be used for all of the submenu items, or just a selection, as shown in `Menu Item Four` below.
Note that only one `ScrollableBlock` can be used within a single submenu.

See: `examples/ScrollableSubmenuStory.md`

### Scrollable submenu with parent

This is an example of using the `parent` prop of `ScrollableBlock` to render a scrollable sublist of a parent item. The `parentVariant`
prop can be used to give it a variant that's different from that used in the `ScrollableBlock`.

Note that the result shown here, for those interacting with the page without assistive technology, is the same as that which
would be produced by leaving out the `parent` prop and putting the `Search` component inside a separate `MenuItem` just before the
`ScrollableBlock`. However the rendered HTML would be different, with the `ScrollableBlock` becoming a sublist inside its own list
item that is not connected to the Search - in this example there is a clear semantic relationship between the search input and the
scrollable list so the `parent` prop should be used to ensure screen readers make the relationship clear to their users.

See: `examples/ScrollableSubmenuWithParent.md`

### Submenu with search

Embeds a `Search` component inside a submenu using `ScrollableBlock` to filter and select items from a long list.

See: `examples/SubmenuWithSearch.md`

### Truncated titles

Menu items can be given a maximum width using the `maxWidth` prop. Text overflowing this width will be truncated.
A title attribute is added to the item when using this prop, containing the full menu item text.

See: `examples/TruncatedTitlesStory.md`

### Controlling the submenu width

By default, the submenu will have the same width as the widest `MenuItem`. This can be changed
by setting the `submenuMaxWidth` or `submenuMinWidth` prop on the submenu's parent `MenuItem` component.

Setting `submenuMaxWidth` will override the `maxWidth` prop of any `MenuItem` in the submenu. Overflowing submenu items will wrap instead of truncating.

See: `examples/ControllingTheSubmenuWidth.md`

### Responsive composition

This story is best viewed in the `canvas` view and by adjusting the size of the window to see the various Menu compositions
at the different breakpoints.

See: `examples/ResponsiveCompositionStory.md`

### Fullscreen view

This story is best viewed in the `canvas` view and by adjusting the size of the window. The fullscreen menu behaviour will
trigger when the screen size is smaller than `1200px`. Please note the `MenuItem`s are intended to have a width that fills the viewport,
as such any `maxWidth` value passed will not be set when they are children of `MenuFullscreen`.

The call-to-action `MenuItem` should always be focused when the `MenuFullscreen` is closed. However, in some instances it may not receive focus
due to specific browser design choices.

See: `examples/FullscreenViewStory.md`

### Full-screen Menu with segment styling

When using the `alternate` variant for a `MenuItem` that is a child of a `MenuSegmentTitle`, the menu item  will automatically
update its styling to match the segment title. Note that this only applies to the `MenuItem` instances within a normal `Menu` component;
when found within a `MenuFullscreen` component, the `alternate` variant will not be styled differently.

This story is best viewed in the `canvas` view.

See: `examples/MenuFullscreenWithSegmentStyling.md`

## Props

### Menu

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Children elements |  |
| menuType | MenuType \| undefined | No |  | Defines the color scheme of the component | "light" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### MenuItem

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| ariaCurrent | boolean \| "location" \| "page" \| "time" \| "true" \| "false" \| "step" \| "date" \| undefined | No |  | Marks the element as the current item within a navigation context. |  |
| ariaLabel | string \| undefined | No |  | If no text is provided an ariaLabel should be given to facilitate accessibility. |  |
| as | "div" \| undefined | No |  |  |  |
| children | React.ReactNode | No |  |  |  |
| clickToOpen | boolean \| undefined | No |  | When set the submenu opens by click instead of hover |  |
| href | string \| undefined | No |  | The href to use for the menu item. |  |
| icon | IconType \| undefined | No |  | Either prop `icon` must be defined or this node must have children. |  |
| maxWidth | MaxWidthProps["maxWidth"] | No |  | Sets the maxWidth of the MenuItem, setting this on a non-submenu item will truncate any text/content that may overflow |  |
| onClick | ((event: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | onClick handler |  |
| onKeyDown | ((event: React.KeyboardEvent<HTMLAnchorElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  | onKeyDown handler |  |
| onSubmenuClose | (() => void) \| undefined | No |  | Callback triggered when submenu closes. Only valid with submenu prop |  |
| onSubmenuOpen | (() => void) \| undefined | No |  | Callback triggered when submenu opens. Only valid with submenu prop |  |
| overrideColor | boolean \| undefined | No |  |  |  |
| rel | string \| undefined | No |  | The rel attribute to be used for the underlying <a> tag |  |
| selected | boolean \| undefined | No |  | Is the menu item the currently selected item. |  |
| showDropdownArrow | boolean \| undefined | No |  | Flag to display the dropdown arrow when an item has a submenu |  |
| submenu | React.ReactNode | No |  | A title for the menu item that has a submenu. |  |
| submenuDirection | string \| undefined | No |  | Defines which direction the submenu will hang eg. left/right |  |
| submenuMaxWidth | string \| undefined | No |  | Sets the maximum width for the item's submenu when it is opened. This prop is only applicable if the item has a submenu. Overrides the maximum width of any items within the submenu. Accepts any valid CSS width value (e.g. "200px", "50%"). |  |
| submenuMinWidth | string \| undefined | No |  | Sets a minimum width for the item's submenu when it is opened. Accepts any valid CSS width value (e.g. "200px", "50%"). This prop is only applicable if the item has a submenu. |  |
| target | string \| undefined | No |  | The target to use for the menu item. |  |
| variant | VariantType \| undefined | No |  | set the colour variant for a menuType |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### ScrollableBlock

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Children elements |  |
| height | string \| number \| undefined | No |  | A custom height to be applied to the component. |  |
| parent | React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| undefined | No |  | the element, if any, displayed at the top of the block to be its semantic "parent", but not part of the scrollable section |  |
| parentVariant | VariantType \| undefined | No |  | the colour variant for the parent element, if different from the variant of the block |  |
| variant | VariantType \| undefined | No |  | set the colour variant for a menuType | "default" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### MenuDivider

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| size | "large" \| "default" \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### MenuSegmentTitle

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| text | string | Yes |  |  |  |
| as | "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| undefined | No |  | Set the heading level for the segment title |  |
| children | React.ReactNode | No |  |  |  |
| segmentWrapperProps | TagProps \| undefined | No |  | Data tag prop bag for segmented children |  |
| variant | VariantType \| undefined | No |  | Set the colour variant for a menuType |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### MenuFullscreen

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onClose | (ev: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement> \| KeyboardEvent) => void | Yes |  | A callback to be called when the close icon is clicked or enter is pressed when focused |  |
| children | React.ReactNode | No |  | The child elements to render |  |
| isOpen | boolean \| undefined | No |  | Sets whether the component is open or closed |  |
| startPosition | "left" \| "right" \| undefined | No |  | The start position for the component to open from |  |
| topModalOverride | boolean \| undefined | No |  | Manually override the internal modal stacking order to set this as top |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Accessible name that conveys the purpose of the menu |  |

## Ref methods

`MenuItem`'s forwarded ref exposes the following imperative methods:

| Method Name | Description                               |
| ----------- | ----------------------------------------- |
| `focus()`   | Programmatically focuses the MenuItem.    |
