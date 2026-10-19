---
name: carbon-component-image
description: Carbon Image component props and usage examples.
---

# Image

Renders either an img element from src or a container with CSS background styling.

## Pitfalls

- When src is provided, supply meaningful alt text or set decorative with an empty alt value for a decorative image.
- Do not pass children when src is provided; children are supported only in background-image container mode.

## Import
`import Image from "carbon-react/lib/components/image";`

## Source
- Export: `./components/image`
- Props interface: `ImageProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| alt | string \| undefined | No |  | HTML alt property to display when an img fails to load |  |
| background | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, repeat method, and others. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background) |  |
| backgroundImage | ResponsiveValue<CSS.Property.BackgroundImage, ThemeType> \| undefined | No |  | The background-image CSS property sets one or more background images on an element. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) |  |
| backgroundPosition | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The background-position CSS property sets the initial position for each background image. The position is relative to the position layer set by background-origin. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) |  |
| backgroundRepeat | ResponsiveValue<CSS.Property.BackgroundRepeat, ThemeType> \| undefined | No |  | The background-repeat CSS property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat) |  |
| backgroundSize | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The background-size CSS property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size) |  |
| bottom | string \| undefined | No |  | Any valid CSS string for bottom |  |
| children | React.ReactNode | No |  | Children elements, will only render if component is a div element |  |
| decorative | boolean \| undefined | No |  | Prop to specify if the image is decorative | false |
| display | ResponsiveValue<CSS.Property.Display, ThemeType> \| undefined | No |  | The display CSS property defines the display type of an element, which consists of the two basic qualities of how an element generates boxes — the outer display type defining how the box participates in flow layout, and the inner display type defining how the children of the box are laid out. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/display) |  |
| height | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The height CSS property specifies the height of an element. By default, the property defines the height of the content area. If box-sizing is set to border-box, however, it instead determines the height of the border area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/height) |  |
| hidden | boolean \| undefined | No |  | HTML hidden property to indicate whether to remain hidden visually and from screen readers |  |
| left | string \| undefined | No |  | Any valid CSS string for left |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| maxHeight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The max-height CSS property sets the maximum height of an element. It prevents the used value of the height property from becoming larger than the value specified for max-height. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height) |  |
| maxWidth | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The max-width CSS property sets the maximum width of an element. It prevents the used value of the width property from becoming larger than the value specified by max-width. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| minHeight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The min-height CSS property sets the minimum height of an element. It prevents the used value of the height property from becoming smaller than the value specified for min-height. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/display) |  |
| minWidth | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The min-width CSS property sets the minimum width of an element. It prevents the used value of the width property from becoming smaller than the value specified for min-width. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width) |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| overflow | ResponsiveValue<CSS.Property.Overflow, ThemeType> \| undefined | No |  | The overflow CSS property sets what to do when an element's content is too big to fit in its block formatting context. It is a shorthand for overflow-x and overflow-y. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) |  |
| overflowX | ResponsiveValue<CSS.Property.OverflowX, ThemeType> \| undefined | No |  | The overflow-x CSS property sets what shows when content overflows a block-level element's left and right edges. This may be nothing, a scroll bar, or the overflow content. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x) |  |
| overflowY | ResponsiveValue<CSS.Property.OverflowY, ThemeType> \| undefined | No |  | The overflow-y CSS property sets what shows when content overflows a block-level element's top and bottom edges. This may be nothing, a scroll bar, or the overflow content. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y) |  |
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
| position | PositionProps \| undefined | No |  | Any valid CSS string for position |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| right | string \| undefined | No |  | Any valid CSS string for right |  |
| size | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  |
| src | string \| undefined | No |  | Any valid file path, passing this will render the component as an img element |  |
| top | string \| undefined | No |  | Any valid CSS string for top |  |
| verticalAlign | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The vertical-align CSS property specifies sets vertical alignment of an inline or table-cell box. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) |  |
| width | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The width utility parses a component's `width` prop and converts it into a CSS width declaration. - Numbers from 0-1 are converted to percentage widths. - Numbers greater than 1 are converted to pixel values. - String values are passed as raw CSS values. - And arrays are converted to responsive width styles. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
Load only the example needed for the current task; playground stories are intentionally omitted.

- [As An Img](../examples/image/as-an-img.md) — Render an informative img element with meaningful alternative text.
- [Decorative](../examples/image/decorative-story.md) — Mark a decorative img element with decorative and an empty alt value.