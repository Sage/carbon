# Card

A container for interactive content and controls related to a single subject.

**Category:** UI presentation

## Quick start

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

Standard `Card` with `spacing="medium"` (default), containing `CardRow` and `CardFooter` sub-components to organise content.

See: `examples/DefaultStory.md`

### Small spacing

Set `spacing="small"` for a more compact card with reduced internal padding.

See: `examples/SmallSpacing.md`

### Large spacing

Set `spacing="large"` for a more spacious card with increased internal padding.

See: `examples/LargeSpacing.md`

### With large roundness on corners

Set `roundness="large"` to apply larger border-radius corners to the card.

See: `examples/WithExtraRoundness.md`

### With width provided

Use the `width` prop to constrain the card to a specific pixel or percentage width.

See: `examples/WithWidthProvided.md`

### Interactive

The card is "interactive" when you pass either or both of `onClick` and `href` props.
Passing just an `onClick` prop will render a `button` element within the `Card`.
Passing an `href` (with or without an `onClick`) will render an `a`nchor element.
Setting the `draggable` prop will negate both `onClick` and `href` prop values and will render a `div` instead.

See: `examples/Interactive.md`

### With custom box shadow

Override the default shadow using the `customCardShadow` prop with a `boxShadow` design-token value.

See: `examples/WithCustomBoxShadow.md`

### Different `<CardRow />` padding

Pass padding props (`p`, `px`, `py`, etc.) directly to `CardRow` to override its default spacing.

See: `examples/DifferentCardRowPadding.md`

### Different `<CardFooter />` padding

Pass padding props to `CardFooter` to override the default footer spacing.

See: `examples/DifferentCardFooterPadding.md`

### More `<CardFooter />` examples

Shows various `CardFooter` content layouts including icon buttons, text and link combinations.

See: `examples/MoreExamplesOfCardFooter.md`

### With string as child

A plain text string can be passed as the direct child of `Card` without using `CardRow` or `CardFooter`.

See: `examples/WithStringAsChild.md`

### With custom height

Use the `height` prop to constrain the card to a specific height; content that exceeds it will scroll.

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
| variant | "default" \| "transparent" \| undefined | No |  | Specify styling variant to render | "default" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
