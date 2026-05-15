---
name: carbon-component-list
description: Carbon List component props and usage examples.
---

# List

## Import
`import List from "carbon-react/lib/components/typography";`

## Source
- Export: `./components/typography`
- Props interface: `ListProps`
- Deprecated: Yes
- Deprecation reason: The List component is part of the legacy Typography system and will be removed in a future release.
Use the Typography component with `variant="ul"` or `variant="ol"` instead, or use proper semantic HTML list elements (ul, ol, li) with Typography components inside.

Example migration:
```tsx
// Before
<List>
<ListItem>Item 1</ListItem>
<ListItem>Item 2</ListItem>
</List>

// After (using Typography list variants)
<Typography variant="ul">
<Typography as="li">Item 1</Typography>
<Typography as="li">Item 2</Typography>
</Typography>

// After (using native HTML with Typography)
<ul>
<li><Typography>Item 1</Typography></li>
<li><Typography>Item 2</Typography></li>
</ul>
```

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  |  |  | Override the variant component | "ul" |
| children | React.ReactNode | No |  |  |  |  |  |
| className | string \| undefined | No |  |  |  |  |  |
| display | string \| undefined | No |  |  |  | Override the variant display |  |
| fluid | boolean \| undefined | No |  |  |  | When set to `true`, uses fluid typography with CSS clamp() values for responsive sizing. |  |
| id | string \| undefined | No |  |  |  | Set the ID attribute of the Typography component |  |
| inverse | boolean \| undefined | No |  |  |  | When set to `true`, inverts the font color for use on darker backgrounds. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| overflow | Property.Overflow \| undefined | No |  |  |  | This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015. **Syntax**: `[ visible \| hidden \| clip \| scroll \| auto ]{1,2}` **Initial value**: `visible` \| Chrome \| Firefox \| Safari \| Edge \| IE \| \| :----: \| :-----: \| :----: \| :----: \| :---: \| \| **1** \| **1** \| **1** \| **12** \| **4** \| |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| role | "alert" \| "status" \| undefined | No |  |  |  | Set the role of the element when it is a live region |  |
| screenReaderOnly | boolean \| undefined | No |  |  |  | Set whether it will be visually hidden NOTE: This is for screen readers only and will make a lot of the other props redundant |  |
| size | "M" \| "L" \| undefined | No |  |  |  | The size to apply to text. Only available for non-heading variants. |  |
| textAlign | string \| undefined | No |  |  |  | Override the text-align |  |
| textDecoration | string \| undefined | No |  |  |  | Override the variant text-decoration |  |
| textOverflow | string \| undefined | No |  |  |  | Override the text-overflow |  |
| textTransform | string \| undefined | No |  |  |  | Override the variant text-transform |  |
| tint | "default" \| "alt" \| undefined | No |  |  |  | The color tint to apply to text. Accepts "default" for standard text color or "alt" for alternative text color. Only available for non-heading variants. |  |
| variant | "p" \| "small" \| "sub" \| "b" \| "big" \| "em" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "ol" \| "span" \| "strong" \| "sup" \| "ul" \| "h1-large" \| "segment-header" \| "section-heading" \| "segment-header-small" \| "segment-subheader" \| "section-subheading" \| "segment-subheader-alt" \| undefined | No |  |  |  | The visual style to apply to the component. Supported variants include: h1, h2, h3, h4, h5, section-heading, section-subheading, p (default), sup, sub, strong, b, ul, ol The following variant values are deprecated with recommended alternatives: - "h1-large" -> use "h1" instead - "segment-header" -> use "section-heading" instead - "segment-header-small" -> use "section-subheading" instead - "segment-subheader" / "segment-subheader-alt" -> use "h5" instead - "span" -> use "p" instead - "small" -> use "p" with the `size` prop set to "M" - "big" -> use "h5" or "h4" depending on context, or "p" with `size` prop set to "L" - "em" -> use "strong" or "b" for semantic emphasis | "p" |
| weight | "medium" \| "regular" \| undefined | No |  |  |  | The font weight to apply to text. Only available for non-heading variants. Note: Has no effect on "strong" or "b" variants as they have fixed medium weight. |  |
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
| truncate | boolean \| undefined | No |  | Yes | Use `textOverflow` and `whiteSpace` props instead. This prop will eventually be removed. Apply truncation |  |  |

## Examples
No Storybook examples found.