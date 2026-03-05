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
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  | Override the variant component |  |
| backgroundColor | string \| undefined | No |  | Override the backgroundColor style |  |
| bg | string \| undefined | No |  | Override the bg value shorthand for backgroundColor |  |
| children | React.ReactNode | No |  | Content to be rendered inside the Typography component |  |
| className | string \| undefined | No |  |  |  |
| color | string \| undefined | No |  | Override the color style | "blackOpacity90" |
| display | string \| undefined | No |  | Override the variant display |  |
| fontSize | string \| undefined | No |  | Override the variant font-size |  |
| fontWeight | string \| undefined | No |  | Override the variant font-weight |  |
| id | string \| undefined | No |  | Set the ID attribute of the Typography component |  |
| isDisabled | boolean \| undefined | No |  |  |  |
| lineHeight | string \| undefined | No |  | Override the variant line-height |  |
| listStyleType | string \| undefined | No |  | Override the list-style-type |  |
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
| opacity | string \| number \| undefined | No |  | Override the opacity value |  |
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
| role | "alert" \| "status" \| undefined | No |  | Set the role of the element when it is a live region |  |
| screenReaderOnly | boolean \| undefined | No |  | Set whether it will be visually hidden NOTE: This is for screen readers only and will make a lot of the other props redundant |  |
| textAlign | string \| undefined | No |  | Override the text-align |  |
| textDecoration | string \| undefined | No |  | Override the variant text-decoration |  |
| textOverflow | string \| undefined | No |  | Override the text-overflow |  |
| textTransform | string \| undefined | No |  | Override the variant text-transform |  |
| truncate | boolean \| undefined | No |  | Apply truncation |  |
| variant | "p" \| "small" \| "sub" \| "b" \| "big" \| "em" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "ol" \| "span" \| "strong" \| "sup" \| "ul" \| "h1-large" \| "segment-header" \| "segment-header-small" \| "segment-subheader" \| "segment-subheader-alt" \| undefined | No |  | The visual style to apply to the component | "p" |
| whiteSpace | string \| undefined | No |  | Override the white-space |  |
| wordBreak | string \| undefined | No |  | Override the word-break |  |
| wordWrap | string \| undefined | No |  | Override the word-wrap |  |
| data-component | string \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-hidden | "true" \| "false" \| undefined | No |  |  |  |
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No |  | Make the element an aria-live region |  |

## Examples
### Variants

**Render**

```tsx
() => (
  <>
    <Typography variant="h1-large">Heading Level 1 Large</Typography>
    <Typography variant="h1">Heading Level 1</Typography>
    <Typography variant="h1" as="h2">
      Heading Level 1 as H2
    </Typography>
    <Typography variant="h2">Heading Level 2</Typography>
    <Typography variant="h3">Heading Level 3</Typography>
    <Typography variant="h4">Heading Level 4</Typography>
    <Typography variant="h5">Heading Level 5</Typography>
    <Typography variant="segment-header">Segment Header</Typography>
    <Typography variant="segment-header-small">Segment Header Small</Typography>
    <Typography variant="segment-subheader">Segment Subheader</Typography>
    <Typography variant="segment-subheader-alt">
      Segment Subheader Alternative
    </Typography>
    <Typography variant="h1" color="blackOpacity74">
      Black Opacity 74
    </Typography>
    <Typography variant="h1" color="blackOpacity65">
      Black Opacity 65
    </Typography>
    <Typography variant="h1" color="blackOpacity55">
      Black Opacity 55
    </Typography>
    <Typography variant="p">
      This is standard text, it is the default variant if you do not supply a
      variant prop. It has no special importance, but it does have a default
      margin bottom. You have to provide your own margin and padding to all
      other variants.
    </Typography>
    <Typography variant="p">
      If you want to{" "}
      <Typography variant="b">draw attention to content</Typography>, and that
      content has the same importance as standard text you should use the
      &quot;b&quot; variant.
    </Typography>
    <Typography variant="strong" display="block" mb={1}>
      Only when the text is more important should you use the strong variant.
    </Typography>
    <Typography variant="p">
      When you want to <Typography variant="em">stress emphasis</Typography> use
      the &quot;em&quot; variant. If you are using the variant for styling
      purposes{" "}
      <Typography variant="em" as="i">
        ensure you override the element
      </Typography>
    </Typography>
    <Typography variant="small" display="block" mb={1}>
      The small variant renders a small element, which is used for small print.
      The small variant also has a smaller appearance.
    </Typography>
    <Typography variant="big" display="block" mb={1}>
      The big variant uses larger font-face to draw attention but content has
      the same importance as standard text.
    </Typography>
    <Typography variant="span">
      The span variant, which is an inline element, can be used just as you
      would normally expect.
    </Typography>
    <Typography variant="p">
      The 1<Typography variant="sup">st</Typography>, 2
      <Typography variant="sup">nd</Typography> are examples of superscript.
    </Typography>
    <Typography variant="p">
      H<Typography variant="sub">2</Typography>O is an example of subscript
    </Typography>
  </>
)
```


### Truncate

**Render**

```tsx
() => (
  <>
    <Box height={80} width={350} backgroundColor="yellow">
      <Typography truncate>
        The is an example of using the truncate prop with a block element.
      </Typography>
    </Box>
    <Box height={80} width={350} backgroundColor="red">
      <Typography truncate variant="b" display="block">
        The is an example of using the truncate prop with an inline element.
        Changing the display type to be a block element allows it to actually
        truncate.
      </Typography>
    </Box>
    <Box height={80} width={350} backgroundColor="lightblue">
      <Typography truncate textOverflow="clip">
        The is an example of using the truncate prop with custom text-overflow.
      </Typography>
    </Box>
  </>
)
```


### Screen Reader Only

**Render**

```tsx
() => (
  <>
    <Typography>
      This is regular text, that can be seen, but under it is visually hidden
      text. Check the source to see it or use a screen reader.
    </Typography>
    <Typography screenReaderOnly>
      This text is visually hidden and will only be read out by a screen reader.
    </Typography>
  </>
)
```


### Lists

**Render**

```tsx
() => (
  <>
    <Typography>Unordered List</Typography>
    <List>
      <ListItem>
        Milk <Typography variant="b">2L</Typography>{" "}
        <Typography variant="em">Skimmed</Typography>
      </ListItem>
      <ListItem>
        Bread <Typography variant="b">500g</Typography>
      </ListItem>
      <ListItem>
        Sugar <Typography variant="b">1Kg</Typography>
      </ListItem>
    </List>

    <Typography>Ordered List</Typography>
    <List as="ol">
      <ListItem>
        Milk <Typography variant="b">2L</Typography>{" "}
        <Typography variant="em">Skimmed</Typography>
      </ListItem>
      <ListItem>
        Bread <Typography variant="b">500g</Typography>
      </ListItem>
      <ListItem>
        Sugar <Typography variant="b">1Kg</Typography>
      </ListItem>
    </List>
  </>
)
```


### List Item Inheritance

**Render**

```tsx
() => (
  <>
    <Typography>Default</Typography>
    <List>
      <ListItem>item 1</ListItem>
      <ListItem>item 2</ListItem>
      <ListItem>item 3</ListItem>
    </List>

    <Typography>Big</Typography>
    <List variant="big">
      <ListItem>item 1</ListItem>
      <ListItem>item 2</ListItem>
      <ListItem>item 3</ListItem>
    </List>

    <Typography>Small</Typography>
    <List variant="small">
      <ListItem>item 1</ListItem>
      <ListItem>item 2</ListItem>
      <ListItem>item 3</ListItem>
    </List>
  </>
)
```

