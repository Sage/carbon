# Menu

Provides navigation for an app, which can be used via mouse or keyboard.

## Import

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

See: `examples/DefaultStory.md`

### Focusing MenuItem's Programmatically

The `MenuItemHandle` type provides an imperative handle for programmatic control over `MenuItem`. 
Using a `ref`, you can access its `focus()` method to set focus on the `MenuItem` as needed.

> **Note**: The `focus()` method will only work on interactive elements.

See: `examples/ProgrammaticFocus.md`

### Selected

See: `examples/SelectedStory.md`

### Divider

See: `examples/DividerStory.md`

### Large divider

See: `examples/LargeDividerStory.md`

### Segment title

See: `examples/SegmentTitleStory.md`

### With alternate colour variant

See: `examples/AlternateColourStory.md`

### Submenu Nodes

The `submenu` prop on `MenuItem` accepts a node, which allows the creation of complex composition for the title with **non-interactive elements only**, when the `MenuItem` has a submenu. It is recommended to also pass the 
`ariaLabel` prop when the composition is especially complex, to ensure screen readers can provide the correct context to users.

See: `examples/SubmenuNodes.md`

### Submenu options

See: `examples/SubmenuOptionsStory.md`

### Submenu direction left

See: `examples/SubmenuDirectionLeftStory.md`

### With icon

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
| alignContent | ResponsiveValue<CSS.Property.AlignContent, ThemeType> \| undefined | No |  | The CSS align-content property sets how the browser distributes space between and around content items along the cross-axis of a flexbox container, and the main-axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) |  |
| alignItems | ResponsiveValue<CSS.Property.AlignItems, ThemeType> \| undefined | No |  | The CSS align-items property sets the align-self value on all direct children as a group. The align-self property sets the alignment of an item within its containing block. In Flexbox it controls the alignment of items on the Cross Axis, in Grid Layout it controls the alignment of items on the Block Axis within their grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) |  |
| alignSelf | ResponsiveValue<CSS.Property.AlignSelf, ThemeType> \| undefined | No |  | The align-self CSS property aligns flex items of the current flex line overriding the align-items value. If any of the item's cross-axis margin is set to auto, then align-self is ignored. In Grid layout align-self aligns the item inside the grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self) |  |
| flex | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The flex CSS property specifies how a flex item will grow or shrink so as to fit the space available in its flex container. This is a shorthand property that sets flex-grow, flex-shrink, and flex-basis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) |  |
| flexBasis | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  |
| flexDirection | ResponsiveValue<CSS.Property.FlexDirection, ThemeType> \| undefined | No |  | The flex-direction CSS property specifies how flex items are placed in the flex container defining the main axis and the direction (normal or reversed). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) |  |
| flexGrow | ResponsiveValue<CSS.Property.FlexGrow, ThemeType> \| undefined | No |  | The flex-grow CSS property sets the flex grow factor of a flex item main size. It specifies how much of the remaining space in the flex container should be assigned to the item (the flex grow factor). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) |  |
| flexShrink | ResponsiveValue<CSS.Property.FlexShrink, ThemeType> \| undefined | No |  | The flex-shrink CSS property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink) |  |
| flexWrap | ResponsiveValue<CSS.Property.FlexWrap, ThemeType> \| undefined | No |  | The flex-wrap CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap) |  |
| justifyContent | ResponsiveValue<CSS.Property.JustifyContent, ThemeType> \| undefined | No |  | The CSS justify-content property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) |  |
| justifyItems | ResponsiveValue<CSS.Property.JustifyItems, ThemeType> \| undefined | No |  | The CSS justify-items property defines the default justify-self for all items of the box, giving them all a default way of justifying each box along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items) |  |
| justifySelf | ResponsiveValue<CSS.Property.JustifySelf, ThemeType> \| undefined | No |  | The CSS justify-self property set the way a box is justified inside its alignment container along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self) |  |
| maxWidth | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The max-width CSS property sets the maximum width of an element. It prevents the used value of the width property from becoming larger than the value specified by max-width. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) |  |
| menuType | MenuType \| undefined | No |  | Defines the color scheme of the component | "light" |
| minWidth | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The min-width CSS property sets the minimum width of an element. It prevents the used value of the width property from becoming smaller than the value specified for min-width. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width) |  |
| order | ResponsiveValue<CSS.Property.Order, ThemeType> \| undefined | No |  | The order CSS property sets the order to lay out an item in a flex or grid container. Items in a container are sorted by ascending order value and then by their source code order. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/order) |  |
| overflow | ResponsiveValue<CSS.Property.Overflow, ThemeType> \| undefined | No |  | The overflow CSS property sets what to do when an element's content is too big to fit in its block formatting context. It is a shorthand for overflow-x and overflow-y. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) |  |
| overflowX | ResponsiveValue<CSS.Property.OverflowX, ThemeType> \| undefined | No |  | The overflow-x CSS property sets what shows when content overflows a block-level element's left and right edges. This may be nothing, a scroll bar, or the overflow content. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x) |  |
| verticalAlign | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The vertical-align CSS property specifies sets vertical alignment of an inline or table-cell box. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) |  |
| width | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The width utility parses a component's `width` prop and converts it into a CSS width declaration. - Numbers from 0-1 are converted to percentage widths. - Numbers greater than 1 are converted to pixel values. - String values are passed as raw CSS values. - And arrays are converted to responsive width styles. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### MenuItem

No props metadata found.

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

No props metadata found.

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
