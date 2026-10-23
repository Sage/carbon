---
name: carbon-component-box
description: Carbon Box component props and usage examples.
---

# Box

## Import
`import Box from "carbon-react/lib/components/box";`

## Source
- Export: `./components/box`
- Props interface: `BoxProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| alignContent | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| alignItems | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| alignSelf | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| as | keyof JSX.IntrinsicElements \| React.ComponentType<any> \| undefined | No |  |  |  | Set the element rendered by the Box component. Only `div` and `span` will be supported in the future. |  |
| bottom | CSSValue \| undefined | No |  |  |  |  |  |
| boxSizing | BoxSizing \| undefined | No |  |  |  | Set the box-sizing attribute of the Box component |  |
| children | React.ReactNode | No |  |  |  | Content to be rendered inside the Box component |  |
| columnGap | Gap \| undefined | No |  |  |  | Column gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| display | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flex | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexBasis | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexDirection | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexGrow | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexShrink | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexWrap | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gap | Gap \| undefined | No |  |  |  | Gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| gridArea | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridAutoColumns | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridAutoFlow | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridAutoRows | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridColumn | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridRow | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridTemplateAreas | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridTemplateColumns | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridTemplateRows | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| height | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| hidden | boolean \| undefined | No |  |  |  | Whether the component is hidden from view. In this state, the component will not be visible to users but will remain in the HTML document |  |
| id | string \| undefined | No |  |  |  | Set the ID attribute of the Box component |  |
| justifyContent | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| justifyItems | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| justifySelf | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| left | CSSValue \| undefined | No |  |  |  |  |  |
| m | SpacingProperty | No |  |  |  |  |  |
| margin | SpacingProperty | No |  |  |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |  |  |
| marginX | SpacingProperty | No |  |  |  |  |  |
| marginY | SpacingProperty | No |  |  |  |  |  |
| maxHeight | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| maxWidth | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| mb | SpacingProperty | No |  |  |  |  |  |
| minHeight | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| minWidth | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| ml | SpacingProperty | No |  |  |  |  |  |
| mr | SpacingProperty | No |  |  |  |  |  |
| mt | SpacingProperty | No |  |  |  |  |  |
| mx | SpacingProperty | No |  |  |  |  |  |
| my | SpacingProperty | No |  |  |  |  |  |
| order | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| overflow | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| overflowWrap | OverflowWrap \| undefined | No |  |  |  | String to set Box content break strategy. Note "anywhere" is not supported in Safari |  |
| overflowX | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| overflowY | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| p | SpacingProperty | No |  |  |  |  |  |
| padding | SpacingProperty | No |  |  |  |  |  |
| paddingBottom | SpacingProperty | No |  |  |  |  |  |
| paddingLeft | SpacingProperty | No |  |  |  |  |  |
| paddingRight | SpacingProperty | No |  |  |  |  |  |
| paddingTop | SpacingProperty | No |  |  |  |  |  |
| paddingX | SpacingProperty | No |  |  |  |  |  |
| paddingY | SpacingProperty | No |  |  |  |  |  |
| pb | SpacingProperty | No |  |  |  |  |  |
| pl | SpacingProperty | No |  |  |  |  |  |
| position | string \| undefined | No |  |  |  |  |  |
| pr | SpacingProperty | No |  |  |  |  |  |
| pt | SpacingProperty | No |  |  |  |  |  |
| px | SpacingProperty | No |  |  |  |  |  |
| py | SpacingProperty | No |  |  |  |  |  |
| right | CSSValue \| undefined | No |  |  |  |  |  |
| role | string \| undefined | No |  |  |  | Set the Role attribute of the Box component |  |
| rowGap | Gap \| undefined | No |  |  |  | Row gap an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| size | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| top | CSSValue \| undefined | No |  |  |  |  |  |
| verticalAlign | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| width | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-atomic | "true" \| "false" \| undefined | No |  |  |  | Indicates whether AT will announce all, or only parts of, the changed region |  |
| aria-hidden | "true" \| "false" \| undefined | No |  |  |  | Set the container to be hidden from screen readers |  |
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No |  |  |  | Make the container an aria-live region |  |
| backgroundColor | string \| undefined | No |  | Yes | This prop is marked for deprecation and will have a longer grace period before removal. Its behavior will be maintained until removal. | Set the backgroundColor attribute of the Box component |  |
| bg | string \| undefined | No |  | Yes | This prop is marked for deprecation and will have a longer grace period before removal. Its behavior will be maintained until removal. | Set the bg attribute of the Box component |  |
| borderRadius | BorderRadiusType \| undefined | No |  | Yes | This prop is marked for deprecation. Its behavior will be maintained until removal. | Design Token for Border Radius. Note: please check that the border radius design token you are using is compatible with the Box component. |  |
| boxShadow | BoxShadowsType \| undefined | No |  | Yes | This prop is marked for deprecation. Its behavior will be maintained until removal. | Design Token for Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Box component. |  |
| color | string \| undefined | No |  | Yes | This prop is marked for deprecation and will have a longer grace period before removal. Its behavior will be maintained until removal. | Set the color attribute of the Box component |  |
| opacity | string \| number \| undefined | No |  | Yes | This prop is marked for deprecation. Its behavior will be maintained until removal. | Set the opacity attribute of the Box component |  |
| scrollVariant | ScrollVariant \| undefined | No |  | Yes | This prop is marked for deprecation. Its behavior will be maintained until removal. | Scroll styling attribute |  |

## Examples
### Spacing

**Render**

```tsx
() => {
  return (
    <Box m={3}>
      <div style={darkGreenBackground}>
        <Box p={3}>
          <Box height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
      </div>
    </Box>
  );
}
```


### Position

**Render**

```tsx
() => {
  return (
    <Box>
      <div style={scrollContainerStyle}>
        <Box width="400px" height="80px" m={2} position="sticky" top="0">
          <div style={greenBackground}>
            <Typography inverse>This box has position sticky</Typography>
            <Button buttonType="primary" destructive>
              Button
            </Button>
          </div>
        </Box>
        <Box size="500px" />
        <Box width="400px" height="80px" m={2} position="sticky" bottom="0">
          <div style={greenBackground}>
            <Typography inverse>This box has position sticky</Typography>
            <Button buttonType="primary" destructive>
              Button
            </Button>
          </div>
        </Box>
      </div>
      <Box size="500px" position="fixed" right="0">
        <div style={greenBackground}>
          <Typography inverse>This box has position fixed</Typography>
        </div>
      </Box>
    </Box>
  );
}
```


### Flex

**Render**

```tsx
() => {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="stretch"
        m="5px"
      >
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="stretch"
        height="400px"
        m="5px"
      >
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
      </Box>
    </Box>
  );
}
```


### Grid

**Render**

```tsx
() => {
  return (
    <Box>
      <Box display="grid" gap={1} gridTemplateColumns="auto auto auto">
        <Box padding={50} position="relative" gridColumn="1 / 3" gridRow="1">
          <div style={gridBlockStyle} />
        </Box>
        <Box padding={50} position="relative" gridColumn="3" gridRow="1 / 3">
          <div style={gridBlockStyle} />
        </Box>
        <Box padding={50} position="relative" gridColumn="1" gridRow="2">
          <div style={gridBlockStyle} />
        </Box>
        <Box padding={50} position="relative" gridColumn="2" gridRow="2">
          <div style={gridBlockStyle} />
        </Box>
      </Box>
      <Box
        display="grid"
        gap={1}
        gridTemplateColumns="repeat(4, [col] auto)"
        gridTemplateRows="repeat(3, [row] auto)"
        mt={50}
      >
        <Box
          padding={50}
          position="relative"
          gridColumn="col / span 2"
          gridRow="row"
        >
          <div style={gridBlockStyle} />
        </Box>
        <Box
          padding={50}
          position="relative"
          gridColumn="col 3 / span 2"
          gridRow="row"
        >
          <div style={gridBlockStyle} />
        </Box>
        <Box padding={50} position="relative" gridColumn="col" gridRow="row 2">
          <div style={gridBlockStyle} />
        </Box>
        <Box
          padding={50}
          position="relative"
          gridColumn="col 2 / span 3"
          gridRow="row 2"
        >
          <div style={gridBlockStyle} />
        </Box>
        <Box
          padding={50}
          position="relative"
          gridColumn="col / span 4"
          gridRow="row 3"
        >
          <div style={gridBlockStyle} />
        </Box>
      </Box>
    </Box>
  );
}
```


### Gap

**Render**

```tsx
() => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" columnGap={1}>
        <Box display="flex" flexDirection="column" rowGap={2}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={3}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={4}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={5}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={6}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={7}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={8}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap={4}>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
      </Box>
      <Box display="flex" gap={8}>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
      </Box>
      <Box display="flex" gap="72px">
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
      </Box>
    </Box>
  );
}
```


### Layout

**Render**

```tsx
() => {
  return (
    <Box display="block" size="150px" overflow="hidden">
      <Box width="100px" height="100px" display="inline-block" m="5px">
        <div style={greenBackground} />
      </Box>
      <Box width="100px" height="100px" display="inline-block" m="5px">
        <div style={greenBackground} />
      </Box>
      <Box width="100px" height="100px" display="inline-block" m="5px">
        <div style={greenBackground} />
      </Box>
    </Box>
  );
}
```


### OverflowWrap

**Render**

```tsx
() => {
  return (
    <Box display="inline-flex">
      <div
        style={{
          border: "solid 1px #00815D",
          width: "min-content",
          marginRight: "20px",
        }}
      >
        <Box p={1} overflowWrap="break-word" width="100px">
          WithOverflowWrap
        </Box>
      </div>
      <div style={{ border: "solid 1px #00815D", width: "min-content" }}>
        <Box p={1} width="100px">
          WithoutOverflowWrap
        </Box>
      </div>
    </Box>
  );
}
```

