# Profile

A profile represents a person, user, or organization. It displays a portrait and some details.

**Category:** Feedback

## Quick Start

```javascript
import Profile from "carbon-react/lib/components/profile";
```

## Examples

### Default

The `email` prop automatically surfaces the `href` attribute with `mailto:`. This will enable
users to send a new email within their default email program to the email address.

See: `examples/Default.md`

### with darkBackground

The `darkBackground` prop can be passed to apply a dark background to `Profile`.
The `Box` component has been used to apply width, height and roundness.

See: `examples/DarkBackground.md`

### Src

To use an image, simply pass any valid image URL as a `src` prop.

See: `examples/Src.md`

### Sizes

Available size variants for the profile avatar and text, set via the `size` prop.

See: `examples/Sizes.md`

### With margin

Margins can be applied to the `Profile` component using styled-system.

See: `examples/WithMargin.md`

### Responsive Example

Demonstrates changing `Profile` props (e.g. size) at different viewport breakpoints. Best viewed in full-screen Canvas mode.

See: `examples/Responsive.md`

### With custom Portrait background colour

To change the background colour of the avatar, pass the `backgroundColor` prop to the component. This prop accepts any valid hex code color or design system token.

See the [Portrait](../portrait/index.md) component for more information.

See: `examples/WithCustomPortraitBackgroundColor.md`

### With custom Portrait foreground colour

To change the foreground colour of the avatar, pass the `foregroundColor` prop to the component. This prop accepts any valid hex code color or design system token

See the [Portrait](../portrait/index.md) component for more information.

See: `examples/WithCustomPortraitForegroundColor.md`

## Props

### Profile

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| alt | string \| undefined | No |  | The `alt` HTML string. |  |
| backgroundColor | string \| undefined | No |  | The hex code of the background colour to be passed to the avatar |  |
| className | string \| undefined | No |  |  |  |
| darkBackground | boolean \| undefined | No |  | Use a dark background. |  |
| email | string \| undefined | No |  | Define the email to use. |  |
| foregroundColor | string \| undefined | No |  | The hex code of the foreground colour to be passed to the avatar. Must be used in conjunction with `backgroundColor` |  |
| initials | string \| undefined | No |  | Define initials to display image. |  |
| name | string \| undefined | No |  | Define the name to display. |  |
| size | "S" \| "M" \| "L" \| "XL" \| "XS" \| "ML" \| "XXL" \| undefined | No |  | Allow to setup size for the component |  |
| src | string \| undefined | No |  | Custom source URL |  |
| text | string \| undefined | No |  | Define read-only text to display. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
