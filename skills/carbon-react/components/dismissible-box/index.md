# DismissibleBox

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated container with a close button that hides its content when dismissed. Use `Message` or a custom dismissible pattern in new implementations.

**Category:** UI presentation

## Quick Start

```javascript
import DismissibleBox from "carbon-react/lib/components/dismissible-box";
```

## Examples

### Default - Light variant

A dismissible container with light background, a thick left border highlight and a close button (×) in the top-right corner.

See: `examples/LightVariant.md`

### Dark variant

Set `variant="dark"` for a dark-background dismissible container, suitable for use on light page backgrounds.

See: `examples/DarkVariant.md`

### With no left border highlight

By default the component will be rendered with a thicker left border highlight, use the `hasBorderLeftHighlight` to opt-out
of this functionality.

See: `examples/WithNoLeftBorderHighlight.md`

### Width overridden

It is also possible to override the `width` of the component: by default it will fill any available space.

See: `examples/WidthOverridden.md`

## Props

### DismissibleBox

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onClose | (e: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void | Yes |  | Callback to be called when the close icon button is clicked |  |
| as | keyof JSX.IntrinsicElements \| React.ComponentType<any> \| undefined | No |  |  |  |
| borderRadius | BorderRadiusType \| undefined | No |  | Design Token for Border Radius. Note: please check that the border radius design token you are using is compatible with the Box component. | "borderRadius100" |
| boxShadow | BoxShadowsType \| undefined | No |  | Design Token for Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Box component. |  |
| boxSizing | BoxSizing \| undefined | No |  | Set the box-sizing attribute of the Box component |  |
| children | React.ReactNode | No |  | The content to render in the component |  |
| className | string \| undefined | No |  |  |  |
| closeButtonDataProps | TagProps \| undefined | No |  | Data tag prop bag for close Button |  |
| color | string \| undefined | No |  | Set the color attribute of the Box component |  |
| columnGap | Gap \| undefined | No |  | Column gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| gap | Gap \| undefined | No |  | Gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| hasBorderLeftHighlight | boolean \| undefined | No |  | Flag to control whether the thicker left border highlight should be rendered |  |
| hidden | boolean \| undefined | No |  | Whether the component is hidden from view. In this state, the component will not be visible to users but will remain in the HTML document |  |
| id | string \| undefined | No |  | Set the ID attribute of the Box component |  |
| opacity | string \| number \| undefined | No |  | Set the opacity attribute of the Box component |  |
| overflowWrap | OverflowWrap \| undefined | No |  | String to set Box content break strategy. Note "anywhere" is not supported in Safari |  |
| role | string \| undefined | No |  | Set the Role attribute of the Box component |  |
| rowGap | Gap \| undefined | No |  | Row gap an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| scrollVariant | ScrollVariant \| undefined | No |  | Scroll styling attribute |  |
| tabIndex | number \| undefined | No |  |  |  |
| variant | "dark" \| "light" \| undefined | No |  | Set the base color variant |  |
| width | string \| number \| undefined | No |  | Use this prop to override the default width. Numbers from 0-1 are converted to percentage widths. Numbers greater than 1 are converted to pixel values. String values are passed as raw CSS values. And arrays are converted to responsive width styles. If theme.sizes is defined, the width prop will attempt to pick up values from the theme. Please note this component has a minWidth of 600px |  |
| data-component | string \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-atomic | "true" \| "false" \| undefined | No |  | Indicates whether AT will announce all, or only parts of, the changed region |  |
| aria-hidden | "true" \| "false" \| undefined | No |  | Set the container to be hidden from screen readers |  |
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No |  | Make the container an aria-live region |  |
