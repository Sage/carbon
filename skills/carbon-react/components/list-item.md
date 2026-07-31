---
name: carbon-component-list-item
description: Carbon ListItem component props and usage examples.
---

# ListItem

## Import
`import ListItem from "carbon-react/lib/components/typography";`

## Source
- Export: `./components/typography`
- Props interface: `ListItemProps`
- Deprecated: Yes
- Deprecation reason: The ListItem component is part of the legacy Typography system and will be removed in a future release.
Use Typography with `as="li"` instead, or use semantic HTML li elements with Typography components inside.
You can use the `as` prop on Typography to inherit list styling while using Typography's text styling capabilities.

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  |  |  | Override the variant component |  |
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
| overflow | Property.Overflow \| undefined | No |  |  |  | The **`overflow`** CSS shorthand property sets the desired behavior for an element's overflow — i.e. when an element's content is too big to fit in its block formatting context — in both directions. **Syntax**: `[ visible \| hidden \| clip \| scroll \| auto ]{1,2}` **Initial value**: `visible` \| Chrome \| Firefox \| Safari \| Edge \| IE \| \| :----: \| :-----: \| :----: \| :----: \| :---: \| \| **1** \| **1** \| **1** \| **12** \| **4** \| |  |
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