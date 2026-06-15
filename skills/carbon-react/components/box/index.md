# Box

Basic component that gives access to a number of styling options. Should be used to achieve more precise layouts when required. Gives access to Spacing, Color, Layout and FlexBox attributes. Acts as a styled `div` (or any element via `as`) that accepts CSS-in-JS styled-system props.

**Category:** UI presentation

## Quick Start

```javascript
import Box from "carbon-react/lib/components/box";
```

## Examples

### Spacing

Apply margin (`m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`) and padding (`p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`) using numbered scale tokens.

See: `examples/Spacing.md`

### Position

Use the `position` prop to set CSS positioning (`"static"`, `"relative"`, `"absolute"`, `"fixed"`, `"sticky"`).

See: `examples/Position.md`

### Color

Set `bg` for background color and `color` for text color using design tokens or CSS color values.

See: `examples/Color.md`

### Box Shadow

Use the `boxShadow` prop with a design-token value (e.g. `"boxShadow200"`) to apply a shadow.

See: `examples/BoxShadow.md`

### Flex

Set `display="flex"` (or `"inline-flex"`) and use flexbox props such as `flexDirection`, `alignItems`, `justifyContent`, `flexWrap`, `flex`, `alignSelf`, `order`.

See: `examples/Flex.md`

### Grid

Set `display="grid"` and use grid props such as `gridTemplateColumns`, `gridTemplateRows`, `gridColumn`, `gridRow`, `gridArea`, `gridAutoFlow`.

See: `examples/grid.md`

### Gap

The `Box` component also supports the `gap`, `column-gap` and `row-gap` properties when its `display` property is set to either
`flex`, `inline-flex`, `grid` or `inline-grid`.

See: `examples/Gap.md`

### Layout

Control size with `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`, `size`, and visibility with `display`, `overflow`, `verticalAlign`.

See: `examples/Layout.md`

### OverflowWrap

Use the `overflowWrap` prop to apply `overflow-wrap: break-word` to the content within the `Box` wrapper.

See: `examples/OverflowWrap.md`

### Scroll

Use the `scrollVariant` prop to indicate which theme scrollbar you would like to display. Use `light` or `dark` values to display as below. This will still require the use of the `overflow` prop and only displays in Chrome or Safari.
If no `scrollVariant` prop is set then the scroll bar will resort to the browser default.

See: `examples/Scroll.md`

### Rounded corners

Use the `borderRadius` to set the radius on the corners of the `Box`.

See: `examples/RoundedCorners.md`

## Props

### Box

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| as | keyof JSX.IntrinsicElements \| React.ComponentType<any> \| undefined | No |  |  |  |
| backgroundColor | string \| undefined | No |  | Set the backgroundColor attribute of the Box component |  |
| bg | string \| undefined | No |  | Set the bg attribute of the Box component |  |
| borderRadius | BorderRadiusType \| undefined | No |  | Design Token for Border Radius. Note: please check that the border radius design token you are using is compatible with the Box component. |  |
| boxShadow | BoxShadowsType \| undefined | No |  | Design Token for Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Box component. |  |
| boxSizing | BoxSizing \| undefined | No |  | Set the box-sizing attribute of the Box component |  |
| children | React.ReactNode | No |  | Content to be rendered inside the Box component |  |
| className | string \| undefined | No |  |  |  |
| color | string \| undefined | No |  | Set the color attribute of the Box component |  |
| columnGap | Gap \| undefined | No |  | Column gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| gap | Gap \| undefined | No |  | Gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| hidden | boolean \| undefined | No |  | Whether the component is hidden from view. In this state, the component will not be visible to users but will remain in the HTML document |  |
| id | string \| undefined | No |  | Set the ID attribute of the Box component |  |
| opacity | string \| number \| undefined | No |  | Set the opacity attribute of the Box component |  |
| overflowWrap | OverflowWrap \| undefined | No |  | String to set Box content break strategy. Note "anywhere" is not supported in Safari |  |
| role | string \| undefined | No |  | Set the Role attribute of the Box component |  |
| rowGap | Gap \| undefined | No |  | Row gap an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| scrollVariant | ScrollVariant \| undefined | No |  | Scroll styling attribute |  |
| tabIndex | number \| undefined | No |  |  |  |
| data-component | string \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-atomic | "true" \| "false" \| undefined | No |  | Indicates whether AT will announce all, or only parts of, the changed region |  |
| aria-hidden | "true" \| "false" \| undefined | No |  | Set the container to be hidden from screen readers |  |
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No |  | Make the container an aria-live region |  |
