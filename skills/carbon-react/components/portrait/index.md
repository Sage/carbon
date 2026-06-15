# Portrait

A portrait visually represents a person, user, or organization. Use initials rather than an avatar if you prefer.

**Category:** UI presentation

## Quick Start

```javascript
import Portrait from "carbon-react/lib/components/portrait";
```

## Examples

### Default

By default, the `Portrait` will render a circle with a user icon.

See: `examples/Default.md`

### Initials

The `Portrait` component can also render initials in place of the icon if the `initials` prop is provided.

See: `examples/Initials.md`

### Src

To use an image instead of the default icon or initials, pass any valid image URL via the `src` prop.

See: `examples/Src.md`

### IconType

`Portrait` allows you to specify an icon, which will be shown if the `src` or `initials` props are omitted.

See: `examples/IconType.md`

### Sizes

The `Portrait` component can be rendered in a variety of sizes by passing the desired size as the `size` prop.

See: `examples/Sizes.md`

### Shapes

The `Portrait` component can be rendered in a variety of shapes by passing the desired shape as the `shape` prop.

See: `examples/Shapes.md`

### (Deprecated) Dark background

The `darkBackground` props has been deprecated and it will be removed in a future version. Please use `variant` prop instead.

The `Portrait` component can be rendered with a dark background by passing the `darkBackground` prop.

See: `examples/DarkBackground.md`

### With margin

Margins can be applied to the `Portrait` component using styled-system.

See: `examples/WithMargin.md`

### (Deprecated) Custom colors

The `backgroundColor` and `foregroundColor` props have been deprecated and they will be removed in a future version. Please use the `variant` prop instead.

The `Portrait` component provides a set of props that allow for custom foreground and background colors
to be applied. These props are `backgroundColor` and `foregroundColor`, and both accept a HEX color code or
[design system token](https://zeroheight.com/2ccf2b601/p/217e24-design-tokens/b/870b8a).

Using these props will override the default colors of the `Portrait` component. They will also bypass the
`darkBackground` prop; setting it alongside `backgroundColor` or `foregroundColor` will have no effect.

When a `backgroundColor` is provided, the `foregroundColor` will be automatically set to a contrasting color.
This is calculated internally to ensure accessibility standards are met. If a custom `foregroundColor` is provided,
this value will be used instead of the calculated one; please ensure that the color contrast is sufficient and that
the component remains accessible.

See: `examples/CustomColors.md`

### Variants

Use the variant prop to change the visual style of the Portrait. If multiple styling props are provided at the same time (for example, darkBackground and variant), variant takes precedence over the other styling props.

See: `examples/Variants.md`

## Props

### Portrait

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| alt | string \| undefined | No |  |  |  | The `alt` HTML string. |  |
| className | string \| undefined | No |  |  |  |  |  |
| iconType | IconType \| undefined | No |  |  |  | Icon to be rendered as a fallback. | "individual" |
| initials | string \| undefined | No |  |  |  | The initials to render in the Portrait. |  |
| name | string \| undefined | No |  |  |  |  |  |
| onClick | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Prop for `onClick` events. |  |
| shape | PortraitShapes \| undefined | No |  |  |  | The shape of the Portrait. | "circle" |
| size | PortraitSizes \| undefined | No |  |  |  | The size of the Portrait. | "M" |
| src | string \| undefined | No |  |  |  | A custom image URL. |  |
| variant | PortraitVariant \| undefined | No |  |  |  | Color variant |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| backgroundColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | The hex code of the background colour |  |
| darkBackground | boolean \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | Use a dark background. | false |
| foregroundColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | The hex code of the foreground colour. This will only take effect if use in conjunction with `backgroundColor` | undefined |
| tooltipBgColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Override background color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipFontColor | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Override font color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipId | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] The id attribute to use for the tooltip |  |
| tooltipIsVisible | boolean \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Whether to to show the Tooltip |  |
| tooltipMessage | React.ReactNode | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] The message to be displayed within the tooltip |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Sets position of the tooltip |  |
| tooltipSize | "medium" \| "large" \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Defines the size of the tooltip content |  |
| tooltipType | string \| undefined | No |  | Yes | This prop is deprecated and will be removed in a future release. | [Legacy] Defines the message type |  |
