# Card

A container for interactive content and controls related to a single subject.

## Import

```javascript
import {
  Card,
  CardRow,
  CardFooter,
  CardColumn,
} from "carbon-react/lib/components/card";
```

## Examples

### Default - medium spacing

See: `examples/DefaultStory.md`

### Small spacing

See: `examples/SmallSpacing.md`

### Large spacing

See: `examples/LargeSpacing.md`

### With large roundness on corners

See: `examples/WithExtraRoundness.md`

### With width provided

See: `examples/WithWidthProvided.md`

### Interactive

The card is "interactive" when you pass either or both of `onClick` and `href` props.
Passing just an `onClick` prop will render a `button` element within the `Card`.
Passing an `href` (with or without an `onClick`) will render an `a`nchor element.
Setting the `draggable` prop will negate both `onClick` and `href` prop values and will render a `div` instead.

See: `examples/Interactive.md`

### With custom box shadow

See: `examples/WithCustomBoxShadow.md`

### Different `<CardRow />` padding

See: `examples/DifferentCardRowPadding.md`

### Different `<CardFooter />` padding

See: `examples/DifferentCardFooterPadding.md`

### More `<CardFooter />` examples

See: `examples/MoreExamplesOfCardFooter.md`

### With string as child

See: `examples/WithStringAsChild.md`

### With custom height

See: `examples/WithCustomHeight.md`

## Props

### Card

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Child nodes |  |
| boxShadow | BoxShadowsType \| undefined | No |  | Design token for custom Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Card component. |  |
| draggable | boolean \| undefined | No |  | Flag to indicate if card is draggable |  |
| footer | React.ReactNode | No |  | The footer to render underneath the Card content |  |
| height | string \| undefined | No |  | Height of the component (any valid CSS value) |  |
| hoverBoxShadow | BoxShadowsType \| undefined | No |  | Design token for custom Box Shadow on hover. One of `onClick` or `href` props must be true. Note: please check that the box shadow design token you are using is compatible with the Card component. |  |
| href | string \| undefined | No |  | The path to navigate to. Renders an anchor element when passed and no draggable prop set |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| onClick | ((event: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLDivElement> \| React.KeyboardEvent<HTMLAnchorElement> \| React.KeyboardEvent<HTMLDivElement>) => void) \| undefined | No |  | Action to be executed when card is clicked or enter pressed. Renders a button when passed and no draggable or href props set |  |
| rel | string \| undefined | No |  | String for rel property when card has an href prop set |  |
| roundness | "large" \| "default" \| undefined | No |  | Sets the level of roundness of the corners, "default" is 8px and "large" is 16px | "default" |
| spacing | "small" \| "medium" \| "large" \| undefined | No |  | Size of card for applying padding | "medium" |
| target | string \| undefined | No |  | Target property in which link should open ie: _blank, _self, _parent, _top |  |
| width | string \| undefined | No |  | Style value for width of card | "500px" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Prop to specify an aria-label for the component |  |

### CardRow

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Child nodes |  |
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
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### CardColumn

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| align | "left" \| "right" \| "center" | Yes | left \| right \| center | Text alignment of the card section text | "center" |
| children | React.ReactNode | Yes |  | Child elements |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### CardFooter

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Child nodes |  |
| roundness | "large" \| "default" | Yes | large \| default | Sets the level of roundness of the corners, "default" is 8px and "large" is 16px |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
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
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| variant | "default" \| "transparent" \| undefined | No |  | Specify styling variant to render | "default" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
