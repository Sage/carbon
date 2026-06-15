# Navigation Bar

This component is used as a wrapper for the Menu component when used as a navigation layout.

**Category:** Navigation

## Quick Start

```javascript
import NavigationBar from "carbon-react/lib/components/navigation-bar";
```

## Examples

### Default - Light Theme

A `NavigationBar` with the default `"light"` theme, wrapping a `Menu` with navigation items.

See: `examples/Default.md`

### Dark Theme

Set `navigationType="dark"` for a dark-background navigation bar.

See: `examples/DarkTheme.md`

### White Theme

Set `navigationType="white"` for a white-background navigation bar.

See: `examples/WhiteTheme.md`

### Black Theme

Set `navigationType="black"` for a black-background navigation bar.

See: `examples/BlackTheme.md`

### Example with menu

A typical composition: `NavigationBar` wrapping a `Menu` with `MenuItem` children including submenu items.

See: `examples/ExampleWithMenu.md`

### Loading State

If `isLoading={true}` the children will not be visible

See: `examples/IsLoading.md`

### With custom spacing

The spacing props (see prop table below) accept either a number between 1 and 8 that is then multiplied by `8px` or any
valid CSS string.

See: `examples/WithCustomSpacing.md`

### Set content max width using Box

Wrap the `Menu` in a `Box` with `maxWidth` to constrain the navigation content width while the bar spans the full viewport.

See: `examples/ContentMaxWidthBox.md`

### Position

#### Sticky

The `position` prop can be set to `sticky` to make the navigation bar stick to the top or bottom of its nearest scrolling ancestor.
Then the `orientation` relative to the top/bottom can be offset using the `offset` prop.

See: `examples/Sticky.md`

#### Fixed

The `position` prop can be set to `fixed` to make the navigation bar fix to the viewport. Then the `orientation` relative to the
top/bottom can be offset using the `offset` prop.

See: `examples/Fixed.md`

## Props

### Navigation Bar

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| ariaLabel | string \| undefined | No |  | HTML aria-label attribute |  |
| children | React.ReactNode | No |  | Content of the component |  |
| isGlobal | boolean \| undefined | No |  |  |  |
| isLoading | boolean \| undefined | No |  | If 'true' the children will not be visible | false |
| navigationType | NavigationType \| undefined | No |  | Color scheme of navigation component | "light" |
| offset | string \| undefined | No |  | Defines the offset of navigation bar | "0px" |
| orientation | Orientation \| undefined | No |  | Defines whether the navigation bar should be positioned top or bottom |  |
| position | Position \| undefined | No |  | Defines whether the navigation bar should be positioned fixed or sticky |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
