# Typography

Manages text styles and content hierarchies.

**Category:** UI presentation

## Quick Start

```javascript
import Typography from "carbon-react/lib/components/typography";
```

## Designer Notes

- The Typography component provides a consistent and flexible system for managing text styles across your design.
- It includes multiple heading and body text options to accommodate various content hierarchies.
- With theme support for large screens and small screens, this helps ensure readability and brand alignment across different contexts.

## Examples

### Variants

Use the `variant` prop to render an element and creates a visual style associated with said element. The `as` prop can also be
used to override the underlying HTML element.

See: `examples/VariantsStory.md`

### Fluid

When set to `true`, the component uses fluid typography with CSS clamp() values for responsive sizing.
This allows the text to scale smoothly between breakpoints without requiring media queries.

See: `examples/FluidStory.md`

### Inverse

When set to `true`, inverts the font colour for use on darker backgrounds.
This ensures sufficient contrast and readability when the `Typography` component is placed over dark container backgrounds.

See: `examples/InverseStory.md`

### Size

The `size` prop controls the font size applied to text.
Available on the following variants: `"p"`, `"ul"`, `"ol"`, `"strong"`, `"b"`, `"sup"`, and `"sub"`. Choose between `"M"` for standard size and `"L"` for larger text.

See: `examples/SizeStory.md`

### Tint

The `tint` prop applies a colour tint to text.
Available on the following variants: `"p"`, `"ul"`, `"ol"`, `"strong"`, `"b"`, `"sup"`, and `"sub"`. Use `"default"` for standard text colour or `"alt"` for alternative text colour.

See: `examples/TintStory.md`

### Weight

The `weight` prop controls the font weight applied to text.
Available on the following variants: `"p"`, `"ul"`, `"ol"`,`"sup"`, and `"sub"`. Choose between `"regular"` for normal weight or `"medium"` for heavier emphasis.

See: `examples/WeightStory.md`

## Props

### Typography

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  |  |  | Override the variant component |  |
| children | React.ReactNode | No |  |  |  | Content to be rendered inside the Typography component |  |
| className | string \| undefined | No |  |  |  |  |  |
| display | string \| undefined | No |  |  |  | Override the variant display |  |
| fluid | boolean \| undefined | No |  |  |  | When set to `true`, uses fluid typography with CSS clamp() values for responsive sizing. | false |
| id | string \| undefined | No |  |  |  | Set the ID attribute of the Typography component |  |
| inverse | boolean \| undefined | No |  |  |  | When set to `true`, inverts the font color for use on darker backgrounds. | false |
| role | "alert" \| "status" \| undefined | No |  |  |  | Set the role of the element when it is a live region |  |
| screenReaderOnly | boolean \| undefined | No |  |  |  | Set whether it will be visually hidden NOTE: This is for screen readers only and will make a lot of the other props redundant | false |
| size | "M" \| "L" \| undefined | No |  |  |  | The size to apply to text. Only available for non-heading variants. | "M" |
| textAlign | string \| undefined | No |  |  |  | Override the text-align |  |
| textDecoration | string \| undefined | No |  |  |  | Override the variant text-decoration |  |
| textOverflow | string \| undefined | No |  |  |  | Override the text-overflow |  |
| textTransform | string \| undefined | No |  |  |  | Override the variant text-transform |  |
| tint | "default" \| "alt" \| undefined | No |  |  |  | The color tint to apply to text. Accepts "default" for standard text color or "alt" for alternative text color. Only available for non-heading variants. | "default" |
| variant | "small" \| "p" \| "sub" \| "b" \| "big" \| "em" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "ol" \| "span" \| "strong" \| "sup" \| "ul" \| "h1-large" \| "segment-header" \| "section-heading" \| "segment-header-small" \| "segment-subheader" \| "section-subheading" \| "segment-subheader-alt" \| undefined | No |  |  |  | The visual style to apply to the component. Supported variants include: h1, h2, h3, h4, h5, section-heading, section-subheading, p (default), sup, sub, strong, b, ul, ol The following variant values are deprecated with recommended alternatives: - "h1-large" -> use "h1" instead - "segment-header" -> use "section-heading" instead - "segment-header-small" -> use "section-subheading" instead - "segment-subheader" / "segment-subheader-alt" -> use "h5" instead - "span" -> use "p" instead - "small" -> use "p" with the `size` prop set to "M" - "big" -> use "h5" or "h4" depending on context, or "p" with `size` prop set to "L" - "em" -> use "strong" or "b" for semantic emphasis | "p" |
| weight | "medium" \| "regular" \| undefined | No |  |  |  | The font weight to apply to text. Only available for non-heading variants. Note: Has no effect on "strong" or "b" variants as they have fixed medium weight. | "regular" |
| whiteSpace | string \| undefined | No |  |  |  | Override the white-space |  |
| wordBreak | string \| undefined | No |  |  |  | Override the word-break |  |
| wordWrap | string \| undefined | No |  |  |  | Override the word-wrap |  |
| data-component | string \| undefined | No |  |  |  |  |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-hidden | "true" \| "false" \| undefined | No |  |  |  |  |  |
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No |  |  |  | Make the element an aria-live region |  |
| backgroundColor | string \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Override the backgroundColor style |  |  |
| bg | string \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Override the bg value shorthand for backgroundColor |  |  |
| color | string \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Override the color style. If a white colour is needed, use the `inverse` prop instead. |  |  |
| fontSize | string \| undefined | No |  | Yes | Use the new `size` prop for paragraphs or choose the appropriate variant for other variants. This prop will eventually be removed. Override the variant font-size |  |  |
| fontWeight | string \| undefined | No |  | Yes | Use the new `weight` prop for paragraphs or choose the appropriate variant for other variants. This prop will eventually be removed. Override the variant font-weight |  |  |
| isDisabled | boolean \| undefined | No |  | Yes |  |  |  |
| lineHeight | string \| undefined | No |  | Yes | Choose the appropriate variant for your use case, as each variant has its own line-height. This prop will eventually be removed. Override the variant line-height |  |  |
| listStyleType | string \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Override the list-style-type |  |  |
| opacity | string \| number \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Override the opacity value |  |  |
| truncate | boolean \| undefined | No |  | Yes | Use `textOverflow` and `whiteSpace` props instead. This prop will eventually be removed. Apply truncation |  | false |
