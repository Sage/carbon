---
name: carbon-component-typography
description: Carbon Typography component props and usage examples.
---

# Typography

## Import
`import Typography from "carbon-react/lib/components/typography";`

## Source
- Export: `./components/typography`
- Props interface: `TypographyProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  |  |  | Override the variant component |  |
| children | React.ReactNode | No |  |  |  | Content to be rendered inside the Typography component |  |
| className | string \| undefined | No |  |  |  |  |  |
| color | string \| undefined | No |  |  |  | Override the text color using typography token options. Supported values are: `neutral`, `subtle`, `caution`, `info`, `negative`, and `positive`. Legacy aliases `"default"` and `"alt"` map to `"neutral"` and `"subtle"` respectively. |  |
| display | string \| undefined | No |  |  |  | Override the variant display |  |
| fluid | boolean \| undefined | No |  |  |  | When set to `true`, uses fluid typography with CSS clamp() values for responsive sizing. | false |
| id | string \| undefined | No |  |  |  | Set the ID attribute of the Typography component |  |
| inverse | boolean \| undefined | No |  |  |  | When set to `true`, inverts the font color for use on darker backgrounds. | false |
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
| screenReaderOnly | boolean \| undefined | No |  |  |  | Set whether it will be visually hidden NOTE: This is for screen readers only and will make a lot of the other props redundant | false |
| size | "M" \| "L" \| undefined | No |  |  |  | The size to apply to text. Only available for non-heading variants. | "M" |
| textAlign | string \| undefined | No |  |  |  | Override the text-align |  |
| textDecoration | string \| undefined | No |  |  |  | Override the variant text-decoration |  |
| textOverflow | string \| undefined | No |  |  |  | Override the text-overflow |  |
| textTransform | string \| undefined | No |  |  |  | Override the variant text-transform |  |
| variant | "p" \| "small" \| "sub" \| "b" \| "big" \| "em" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "ol" \| "span" \| "strong" \| "sup" \| "ul" \| "h1-large" \| "segment-header" \| "section-heading" \| "segment-header-small" \| "segment-subheader" \| "section-subheading" \| "segment-subheader-alt" \| undefined | No |  |  |  | The visual style to apply to the component. Supported variants include: h1, h2, h3, h4, h5, section-heading, section-subheading, p (default), sup, sub, strong, b, ul, ol The following variant values are deprecated with recommended alternatives: - "h1-large" -> use "h1" instead - "segment-header" -> use "section-heading" instead - "segment-header-small" -> use "section-subheading" instead - "segment-subheader" / "segment-subheader-alt" -> use "h5" instead - "span" -> use "p" instead - "small" -> use "p" with the `size` prop set to "M" - "big" -> use "h5" or "h4" depending on context, or "p" with `size` prop set to "L" - "em" -> use "strong" or "b" for semantic emphasis | "p" |
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
| fontSize | string \| undefined | No |  | Yes | Use the new `size` prop for paragraphs or choose the appropriate variant for other variants. This prop will eventually be removed. Override the variant font-size |  |  |
| fontWeight | string \| undefined | No |  | Yes | Use the new `weight` prop for paragraphs or choose the appropriate variant for other variants. This prop will eventually be removed. Override the variant font-weight |  |  |
| isDisabled | boolean \| undefined | No |  | Yes |  |  |  |
| lineHeight | string \| undefined | No |  | Yes | Choose the appropriate variant for your use case, as each variant has its own line-height. This prop will eventually be removed. Override the variant line-height |  |  |
| listStyleType | string \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Override the list-style-type |  |  |
| opacity | string \| number \| undefined | No |  | Yes | This prop no longer has any effect. This prop will eventually be removed. Override the opacity value |  |  |
| tint | "default" \| "alt" \| undefined | No |  | Yes | Use `color` instead. |  | "default" |
| truncate | boolean \| undefined | No |  | Yes | Use `textOverflow` and `whiteSpace` props instead. This prop will eventually be removed. Apply truncation |  | false |

## Examples
### Variants

**Render**

```tsx
() => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p">Paragraph (Default)</Typography>
    <Typography variant="h1">Heading Level 1</Typography>
    <Typography variant="h2">Heading Level 2</Typography>
    <Typography variant="h3">Heading Level 3</Typography>
    <Typography variant="h4">Heading Level 4</Typography>
    <Typography variant="h5">Heading Level 5</Typography>
    <Typography variant="section-heading">Section Heading</Typography>
    <Typography variant="section-subheading">Section Subheading</Typography>
    <Typography variant="strong">Strong Text</Typography>
    <Typography variant="b">Bold Text</Typography>
    <Typography variant="p">
      This text contains <Typography variant="sup">superscript</Typography>{" "}
      content
    </Typography>
    <Typography variant="p">
      This text contains <Typography variant="sub">subscript</Typography>{" "}
      content
    </Typography>
    <Typography variant="ul">
      <li>Unordered List</li>
      <li>Unordered List</li>
      <li>Unordered List</li>
    </Typography>
    <Typography variant="ol">
      <li>Ordered List</li>
      <li>Ordered List</li>
      <li>Ordered List</li>
    </Typography>
  </Box>
)
```


### Fluid

**Render**

```tsx
() => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography fluid variant="p">
      Paragraph (Default)
    </Typography>
    <Typography fluid variant="h1">
      Heading Level 1
    </Typography>
    <Typography fluid variant="h2">
      Heading Level 2
    </Typography>
    <Typography fluid variant="h3">
      Heading Level 3
    </Typography>
    <Typography fluid variant="h4">
      Heading Level 4
    </Typography>
    <Typography fluid variant="h5">
      Heading Level 5
    </Typography>
    <Typography fluid variant="section-heading">
      Segment Header
    </Typography>
    <Typography fluid variant="section-subheading">
      Segment Subheader
    </Typography>
    <Typography fluid variant="strong">
      Strong Text
    </Typography>
    <Typography fluid variant="b">
      Bold Text
    </Typography>
    <Typography fluid variant="p">
      This text contains{" "}
      <Typography fluid variant="sup">
        superscript
      </Typography>{" "}
      content
    </Typography>
    <Typography fluid variant="p">
      This text contains{" "}
      <Typography fluid variant="sub">
        subscript
      </Typography>{" "}
      content
    </Typography>
    <Typography fluid variant="ul">
      <li>Unordered List</li>
      <li>Unordered List</li>
      <li>Unordered List</li>
    </Typography>
    <Typography fluid variant="ol">
      <li>Ordered List</li>
      <li>Ordered List</li>
      <li>Ordered List</li>
    </Typography>
  </Box>
)
```


### Inverse

**Render**

```tsx
() => (
  <Box
    backgroundColor="black"
    display="flex"
    flexDirection="column"
    gap={2}
    p={2}
  >
    <Typography variant="p" inverse>
      Paragraph (Default)
    </Typography>
    <Typography variant="h1" inverse>
      Heading Level 1
    </Typography>
    <Typography variant="h2" inverse>
      Heading Level 2
    </Typography>
    <Typography variant="h3" inverse>
      Heading Level 3
    </Typography>
    <Typography variant="h4" inverse>
      Heading Level 4
    </Typography>
    <Typography variant="h5" inverse>
      Heading Level 5
    </Typography>
    <Typography variant="section-heading" inverse>
      Segment Header
    </Typography>
    <Typography variant="section-subheading" inverse>
      Segment Subheader
    </Typography>
    <Typography variant="strong" inverse>
      Strong Text
    </Typography>
    <Typography variant="b" inverse>
      Bold Text
    </Typography>
    <Typography variant="p" inverse>
      This text contains{" "}
      <Typography variant="sup" inverse>
        superscript
      </Typography>{" "}
      content
    </Typography>
    <Typography variant="p" inverse>
      This text contains{" "}
      <Typography variant="sub" inverse>
        subscript
      </Typography>{" "}
      content
    </Typography>
    <Typography variant="ul" inverse>
      <li>Unordered List</li>
      <li>Unordered List</li>
      <li>Unordered List</li>
    </Typography>
    <Typography variant="ol" inverse>
      <li>Ordered List</li>
      <li>Ordered List</li>
      <li>Ordered List</li>
    </Typography>
  </Box>
)
```


### Size

**Render**

```tsx
() => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p" size="M">
      M size paragraph text
    </Typography>
    <Typography variant="p" size="L">
      L size paragraph text
    </Typography>
    <Typography variant="strong" size="M">
      Strong M
    </Typography>
    <Typography variant="strong" size="L">
      Strong L
    </Typography>
    <Typography variant="b" size="M">
      Bold M
    </Typography>
    <Typography variant="b" size="L">
      Bold L
    </Typography>
    <Typography variant="p" size="M">
      Text with{" "}
      <Typography variant="sup" size="M">
        superscript
      </Typography>{" "}
      M
    </Typography>
    <Typography variant="p" size="L">
      Text with{" "}
      <Typography variant="sup" size="L">
        superscript
      </Typography>{" "}
      L
    </Typography>
    <Typography variant="p" size="M">
      Text with{" "}
      <Typography variant="sub" size="M">
        subscript
      </Typography>{" "}
      M
    </Typography>
    <Typography variant="p" size="L">
      Text with{" "}
      <Typography variant="sub" size="L">
        subscript
      </Typography>{" "}
      L
    </Typography>
    <Typography variant="ul" size="M">
      <li>Unordered List M</li>
      <li>Unordered List M</li>
      <li>Unordered List M</li>
    </Typography>
    <Typography variant="ul" size="L">
      <li>Unordered List L</li>
      <li>Unordered List L</li>
      <li>Unordered List L</li>
    </Typography>
    <Typography variant="ol" size="M">
      <li>Ordered List M</li>
      <li>Ordered List M</li>
      <li>Ordered List M</li>
    </Typography>
    <Typography variant="ol" size="L">
      <li>Ordered List L</li>
      <li>Ordered List L</li>
      <li>Ordered List L</li>
    </Typography>
  </Box>
)
```


### Color

**Render**

```tsx
() => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="h1" color="neutral">
      H1 neutral
    </Typography>
    <Typography variant="h2" color="subtle">
      H2 subtle
    </Typography>
    <Typography variant="h3" color="caution">
      H3 caution
    </Typography>
    <Typography variant="section-heading" color="info">
      Section heading info
    </Typography>
    <Typography variant="section-subheading" color="positive">
      Section subheading positive
    </Typography>
    <Typography variant="p" color="neutral">
      Neutral paragraph text
    </Typography>
    <Typography variant="p" color="subtle">
      Subtle paragraph text
    </Typography>
    <Typography variant="strong" color="caution">
      Strong caution
    </Typography>
    <Typography variant="strong" color="info">
      Strong info
    </Typography>
    <Typography variant="b" color="negative">
      Bold negative
    </Typography>
    <Typography variant="b" color="positive">
      Bold positive
    </Typography>
    <Typography variant="p" color="caution">
      Text with{" "}
      <Typography variant="sup" color="caution">
        superscript
      </Typography>{" "}
      caution
    </Typography>
    <Typography variant="p" color="info">
      Text with{" "}
      <Typography variant="sup" color="info">
        superscript
      </Typography>{" "}
      info
    </Typography>
    <Typography variant="p" color="negative">
      Text with{" "}
      <Typography variant="sub" color="negative">
        subscript
      </Typography>{" "}
      negative
    </Typography>
    <Typography variant="p" color="positive">
      Text with{" "}
      <Typography variant="sub" color="positive">
        subscript
      </Typography>{" "}
      positive
    </Typography>
    <Typography variant="ul" color="subtle">
      <li>Unordered List Subtle</li>
      <li>Unordered List Subtle</li>
      <li>Unordered List Subtle</li>
    </Typography>
    <Typography variant="ul" color="caution">
      <li>Unordered List Caution</li>
      <li>Unordered List Caution</li>
      <li>Unordered List Caution</li>
    </Typography>
    <Typography variant="ol" color="info">
      <li>Ordered List Info</li>
      <li>Ordered List Info</li>
      <li>Ordered List Info</li>
    </Typography>
    <Typography variant="ol" color="positive">
      <li>Ordered List Positive</li>
      <li>Ordered List Positive</li>
      <li>Ordered List Positive</li>
    </Typography>
  </Box>
)
```


### Weight

**Render**

```tsx
() => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p" weight="regular">
      Regular weight paragraph text
    </Typography>
    <Typography variant="p" weight="medium">
      Medium weight paragraph text
    </Typography>
    <Typography variant="strong" weight="regular">
      Strong Regular
    </Typography>
    <Typography variant="strong" weight="medium">
      Strong Medium
    </Typography>
    <Typography variant="b" weight="regular">
      Bold Regular
    </Typography>
    <Typography variant="b" weight="medium">
      Bold Medium
    </Typography>
    <Typography variant="p" weight="regular">
      Text with{" "}
      <Typography variant="sup" weight="regular">
        superscript
      </Typography>{" "}
      regular
    </Typography>
    <Typography variant="p" weight="medium">
      Text with{" "}
      <Typography variant="sup" weight="medium">
        superscript
      </Typography>{" "}
      medium
    </Typography>
    <Typography variant="p" weight="regular">
      Text with{" "}
      <Typography variant="sub" weight="regular">
        subscript
      </Typography>{" "}
      regular
    </Typography>
    <Typography variant="p" weight="medium">
      Text with{" "}
      <Typography variant="sub" weight="medium">
        subscript
      </Typography>{" "}
      medium
    </Typography>
    <Typography variant="ul" weight="regular">
      <li>Unordered List Regular</li>
      <li>Unordered List Regular</li>
      <li>Unordered List Regular</li>
    </Typography>
    <Typography variant="ul" weight="medium">
      <li>Unordered List Medium</li>
      <li>Unordered List Medium</li>
      <li>Unordered List Medium</li>
    </Typography>
    <Typography variant="ol" weight="regular">
      <li>Ordered List Regular</li>
      <li>Ordered List Regular</li>
      <li>Ordered List Regular</li>
    </Typography>
    <Typography variant="ol" weight="medium">
      <li>Ordered List Medium</li>
      <li>Ordered List Medium</li>
      <li>Ordered List Medium</li>
    </Typography>
  </Box>
)
```

