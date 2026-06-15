# Link

Navigates the user to another location.

**Category:** Navigation

## Quick Start

Import `Link` into the project.

```javascript
import Link from "carbon-react/lib/components/link";
```

To use Link with a routing library see our documentation on this here: [Usage with routing](../?path=/docs/documentation-usage-with-routing--docs).

## Examples

### Default

By default an anchor element will be rendered.

`target` and `rel` props will be passed down to the anchor element when provided.

See: `examples/Default.md`

### Underline

By default, the `Link` component will always render with an underline.

Setting the `underline` prop to `"hover"` will only show the underline when the user hovers over the link.

See: `examples/WithUnderlineOnlyOnHover.md`

Setting the `underline` prop to `"never"` removes the underline from the link.

**Please note**: Without the underline, context must be provided to the user to indicate that the text is a link.

See: `examples/WithNoUnderline.md`

### Icon

You can render an icon alongside the `Link` text by passing a valid icon to the `icon` prop.
To see the list of available icons, please refer to the [Icon documentation](../icon/index.md).

You can control the position of the icon using the `iconAlign` prop.

See: `examples/WithIcon.md`

### Skip Link

A skip link allows users to bypass repetitive content and navigate directly to the main content of the page.

To render a skip link, set the `isSkipLink` prop to true. The `href` prop should point to the ID of part of the page the user will be skipping to.
Once the user Tabs into the page, the skip link will become visible. When the user activates the link, they will be taken to the target location.

You can use the `link.skipLinkLabel` translation key to override the default label for the skip link.

See: `examples/AsSkipLink.md`

### Sizes

Setting the `linkSize` prop to either `medium` or `large` will change the font size accordingly.

See: `examples/LinkSize.md`

### Bold

Setting the `bold` prop to true will render the `Link` text in bold.

See: `examples/Bold.md`

### Variants

You can use the `variant` prop to change the visual style of the Link. Available variants are `typical`, `negative` and `subtle`.

See: `examples/Variants.md`

### Inverse

You can use the `inverse` prop to render the `Link` with the inverse color scheme.

See: `examples/Inverse.md`

### onClick

A custom `onClick` function can be passed to the Link component to render it as a button instead of an anchor.

**Please note**: using the `onClick` prop with no `href` is bad for accessibility, as the output looks like a link but behaves like an HTML button.
If the `onClick` performs an on-page action, so you want a genuine button, please consider using the [Button component](../button/index.md) instead so that the styles match the semantics.
If the `onClick` function performs navigation, an `href` prop is necessary either instead or in addition, so that an HTML `<a>` tag is used instead.
See for example our [React Router docs](../../references/docs/usage-with-routing.md), where we use `Link` with `onClick` to
perform client-side routing, but still provide the `href` to render an HTML link rather than a button.

See: `examples/WithOnClick.md`

## Props

### Link

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ariaLabel | string \| undefined | No |  |  |  | Aria label for accessibility purposes |  |
| bold | boolean \| undefined | No |  |  |  | Sets the link style to bold |  |
| children | React.ReactNode | No |  |  |  | Child content to render in the link. |  |
| className | string \| undefined | No |  |  |  |  |  |
| hasFocus | boolean \| undefined | No |  |  |  |  |  |
| href | string \| undefined | No |  |  |  | An href for an anchor tag. |  |
| icon | IconType \| undefined | No |  |  |  | An icon to display next to the link. |  |
| iconAlign | "left" \| "right" \| undefined | No |  |  |  | Which side of the link to the render the link. |  |
| inverse | boolean \| undefined | No |  |  |  | Sets the colour styling when component is rendered on a dark background |  |
| isSkipLink | boolean \| undefined | No |  |  |  | Allows to create skip link |  |
| linkSize | "medium" \| "large" \| undefined | No |  |  |  | Sets the correct link size |  |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when the mouse is clicked. |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLAnchorElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when a key is pressed. |  |
| onMouseDown | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when a mouse down event triggers. |  |
| rel | string \| undefined | No |  |  |  | allows to set rel property in <a> tag |  |
| removeAriaLabelOnIcon | boolean \| undefined | No |  |  |  |  |  |
| target | string \| undefined | No |  |  |  | Target property in which link should open ie: _blank, _self, _parent, _top |  |
| underline | "always" \| "hover" \| "never" \| undefined | No |  |  |  | Specifies when the link underline should be displayed. |  |
| variant | Variants \| undefined | No |  |  |  | Allows link styling to be updated for light or dark backgrounds |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| disabled | boolean \| undefined | No |  | Yes | The disabled state of the link. This prop is deprecated and will soon be removed. |  |  |
| isDarkBackground | boolean \| undefined | No |  | Yes | The 'isDarkBackground' prop in Link is deprecated and will soon be removed. Please use 'inverse' prop instead. |  |  |
| tooltipMessage | string \| undefined | No |  | Yes | The tooltipMessage prop in Link is deprecated and will soon be removed. | [Legacy] A message to display as a tooltip to the link. |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | The tooltipPosition prop in Link is deprecated and will soon be removed. | [Legacy] Positions the tooltip with the link. |  |
