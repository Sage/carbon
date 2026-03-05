---
name: carbon-component-box
description: Carbon Box component props and usage examples.
---

# Box

## Import
`import Box from "carbon-sage/lib/components/box";`

## Source
- Export: `./components/box`
- Props interface: `BoxProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| alignContent | ResponsiveValue<CSS.Property.AlignContent, ThemeType> \| undefined | No |  | The CSS align-content property sets how the browser distributes space between and around content items along the cross-axis of a flexbox container, and the main-axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) |  |
| alignItems | ResponsiveValue<CSS.Property.AlignItems, ThemeType> \| undefined | No |  | The CSS align-items property sets the align-self value on all direct children as a group. The align-self property sets the alignment of an item within its containing block. In Flexbox it controls the alignment of items on the Cross Axis, in Grid Layout it controls the alignment of items on the Block Axis within their grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) |  |
| alignSelf | ResponsiveValue<CSS.Property.AlignSelf, ThemeType> \| undefined | No |  | The align-self CSS property aligns flex items of the current flex line overriding the align-items value. If any of the item's cross-axis margin is set to auto, then align-self is ignored. In Grid layout align-self aligns the item inside the grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self) |  |
| as | keyof JSX.IntrinsicElements \| React.ComponentType<any> \| undefined | No |  |  |  |
| backgroundColor | string \| undefined | No |  | Set the backgroundColor attribute of the Box component |  |
| bg | string \| undefined | No |  | Set the bg attribute of the Box component |  |
| borderRadius | BorderRadiusType \| undefined | No |  | Design Token for Border Radius. Note: please check that the border radius design token you are using is compatible with the Box component. |  |
| bottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The bottom CSS property participates in specifying the vertical position of a positioned element. It has no effect on non-positioned elements. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/top) |  |
| boxShadow | BoxShadowsType \| undefined | No |  | Design Token for Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Box component. |  |
| boxSizing | BoxSizing \| undefined | No |  | Set the box-sizing attribute of the Box component |  |
| children | React.ReactNode | No |  | Content to be rendered inside the Box component |  |
| className | string \| undefined | No |  |  |  |
| color | string \| undefined | No |  | Set the color attribute of the Box component |  |
| columnGap | Gap \| undefined | No |  | Column gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| display | ResponsiveValue<CSS.Property.Display, ThemeType> \| undefined | No |  | The display CSS property defines the display type of an element, which consists of the two basic qualities of how an element generates boxes — the outer display type defining how the box participates in flow layout, and the inner display type defining how the children of the box are laid out. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/display) |  |
| flex | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The flex CSS property specifies how a flex item will grow or shrink so as to fit the space available in its flex container. This is a shorthand property that sets flex-grow, flex-shrink, and flex-basis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) |  |
| flexBasis | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  |
| flexDirection | ResponsiveValue<CSS.Property.FlexDirection, ThemeType> \| undefined | No |  | The flex-direction CSS property specifies how flex items are placed in the flex container defining the main axis and the direction (normal or reversed). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) |  |
| flexGrow | ResponsiveValue<CSS.Property.FlexGrow, ThemeType> \| undefined | No |  | The flex-grow CSS property sets the flex grow factor of a flex item main size. It specifies how much of the remaining space in the flex container should be assigned to the item (the flex grow factor). [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) |  |
| flexShrink | ResponsiveValue<CSS.Property.FlexShrink, ThemeType> \| undefined | No |  | The flex-shrink CSS property sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink) |  |
| flexWrap | ResponsiveValue<CSS.Property.FlexWrap, ThemeType> \| undefined | No |  | The flex-wrap CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap) |  |
| gap | Gap \| undefined | No |  | Gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| gridArea | ResponsiveValue<CSS.Property.GridArea, ThemeType> \| undefined | No |  | The grid-area CSS property is a shorthand property for grid-row-start, grid-column-start, grid-row-end and grid-column-end, specifying a grid item’s size and location within the grid row by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the edges of its grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area) |  |
| gridAutoColumns | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The grid-auto-columns CSS property specifies the size of an implicitly-created grid column track. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns) |  |
| gridAutoFlow | ResponsiveValue<CSS.Property.GridAutoFlow, ThemeType> \| undefined | No |  | The grid-auto-flow CSS property controls how the auto-placement algorithm works, specifying exactly how auto-placed items get flowed into the grid. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) |  |
| gridAutoRows | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The grid-auto-rows CSS property specifies the size of an implicitly-created grid row track. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows) |  |
| gridColumn | ResponsiveValue<CSS.Property.GridColumn, ThemeType> \| undefined | No |  | The grid-column CSS property is a shorthand property for grid-column-start and grid-column-end specifying a grid item's size and location within the grid column by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start and inline-end edge of its grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column) |  |
| gridRow | ResponsiveValue<CSS.Property.GridRow, ThemeType> \| undefined | No |  | The grid-row CSS property is a shorthand property for grid-row-start and grid-row-end specifying a grid item’s size and location within the grid row by contributing a line, a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start and inline-end edge of its grid area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row) |  |
| gridTemplateAreas | ResponsiveValue<CSS.Property.GridTemplateAreas, ThemeType> \| undefined | No |  | The grid-template-areas CSS property specifies named grid areas. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) |  |
| gridTemplateColumns | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The grid-template-columns CSS property defines the line names and track sizing functions of the grid columns. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) |  |
| gridTemplateRows | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The grid-template-rows CSS property defines the line names and track sizing functions of the grid rows. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/row-template-rows) |  |
| height | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The height CSS property specifies the height of an element. By default, the property defines the height of the content area. If box-sizing is set to border-box, however, it instead determines the height of the border area. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/height) |  |
| hidden | boolean \| undefined | No |  | Whether the component is hidden from view. In this state, the component will not be visible to users but will remain in the HTML document |  |
| id | string \| undefined | No |  | Set the ID attribute of the Box component |  |
| justifyContent | ResponsiveValue<CSS.Property.JustifyContent, ThemeType> \| undefined | No |  | The CSS justify-content property defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) |  |
| justifyItems | ResponsiveValue<CSS.Property.JustifyItems, ThemeType> \| undefined | No |  | The CSS justify-items property defines the default justify-self for all items of the box, giving them all a default way of justifying each box along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items) |  |
| justifySelf | ResponsiveValue<CSS.Property.JustifySelf, ThemeType> \| undefined | No |  | The CSS justify-self property set the way a box is justified inside its alignment container along the appropriate axis. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self) |  |
| left | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The left CSS property participates in specifying the horizontal position of a positioned element. It has no effect on non-positioned elements. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/left) |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| maxHeight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The max-height CSS property sets the maximum height of an element. It prevents the used value of the height property from becoming larger than the value specified for max-height. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height) |  |
| maxWidth | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The max-width CSS property sets the maximum width of an element. It prevents the used value of the width property from becoming larger than the value specified by max-width. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| minHeight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The min-height CSS property sets the minimum height of an element. It prevents the used value of the height property from becoming smaller than the value specified for min-height. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/display) |  |
| minWidth | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The min-width CSS property sets the minimum width of an element. It prevents the used value of the width property from becoming smaller than the value specified for min-width. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width) |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| opacity | string \| number \| undefined | No |  | Set the opacity attribute of the Box component |  |
| order | ResponsiveValue<CSS.Property.Order, ThemeType> \| undefined | No |  | The order CSS property sets the order to lay out an item in a flex or grid container. Items in a container are sorted by ascending order value and then by their source code order. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/order) |  |
| overflow | ResponsiveValue<CSS.Property.Overflow, ThemeType> \| undefined | No |  | The overflow CSS property sets what to do when an element's content is too big to fit in its block formatting context. It is a shorthand for overflow-x and overflow-y. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) |  |
| overflowWrap | OverflowWrap \| undefined | No |  | String to set Box content break strategy. Note "anywhere" is not supported in Safari |  |
| overflowX | ResponsiveValue<CSS.Property.OverflowX, ThemeType> \| undefined | No |  | The overflow-x CSS property sets what shows when content overflows a block-level element's left and right edges. This may be nothing, a scroll bar, or the overflow content. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x) |  |
| overflowY | ResponsiveValue<CSS.Property.OverflowY, ThemeType> \| undefined | No |  | The overflow-y CSS property sets what shows when content overflows a block-level element's top and bottom edges. This may be nothing, a scroll bar, or the overflow content. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y) |  |
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
| position | ResponsiveValue<CSS.Property.Position, ThemeType> \| undefined | No |  | The position CSS property specifies how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/position) |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| right | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The right CSS property participates in specifying the horizontal position of a positioned element. It has no effect on non-positioned elements. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/right) |  |
| role | string \| undefined | No |  | Set the Role attribute of the Box component |  |
| rowGap | Gap \| undefined | No |  | Row gap an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| scrollVariant | ScrollVariant \| undefined | No |  | Scroll styling attribute |  |
| size | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  |
| tabIndex | number \| undefined | No |  |  |  |
| top | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The top CSS property participates in specifying the vertical position of a positioned element. It has no effect on non-positioned elements. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/top) |  |
| verticalAlign | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The vertical-align CSS property specifies sets vertical alignment of an inline or table-cell box. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) |  |
| width | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | The width utility parses a component's `width` prop and converts it into a CSS width declaration. - Numbers from 0-1 are converted to percentage widths. - Numbers greater than 1 are converted to pixel values. - String values are passed as raw CSS values. - And arrays are converted to responsive width styles. |  |
| data-component | string \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-hidden | "true" \| "false" \| undefined | No |  | Set the container to be hidden from screen readers |  |
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No |  | Make the container an aria-live region |  |

## Examples
### Spacing

**Render**

```tsx
() => {
  return (
    <Box m={3} p={3} bg="secondary">
      <Box height="100px" bg="primary" />
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
      <Box
        display="inline-block"
        size="350px"
        overflow="auto"
        scrollVariant="light"
        mr="20px"
        bg="secondary"
      >
        <Box
          width="400px"
          height="80px"
          m={2}
          bg="primary"
          position="sticky"
          top="0"
        >
          <Typography color="white">This box has position sticky</Typography>
          <Button buttonType="primary" destructive>
            Button
          </Button>
        </Box>
        <Box size="500px" />
        <Box
          width="400px"
          height="80px"
          m={2}
          bg="primary"
          position="sticky"
          bottom="0"
        >
          <Typography color="white">This box has position sticky</Typography>
          <Button buttonType="primary" destructive>
            Button
          </Button>
        </Box>
      </Box>
      <Box size="500px" position="fixed" right="0" bg="primary">
        <Box>
          <Typography color="white">This box has position fixed</Typography>
        </Box>
      </Box>
    </Box>
  );
}
```


### Color

**Render**

```tsx
() => {
  return (
    <Box m={3} p={3} bg="secondary">
      <Box width="100px" height="100px" bg="primary" color="yellow">
        This is some sample text
      </Box>
    </Box>
  );
}
```


### Box Shadow

**Render**

```tsx
() => {
  return (
    <Box m={3} p={3} height="100px" bg="secondary" boxShadow="boxShadow200" />
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
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="stretch"
        height="400px"
        m="5px"
      >
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
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
        <Box padding={50} bg="primary" gridColumn="1 / 3" gridRow="1" />
        <Box padding={50} bg="primary" gridColumn="3" gridRow="1 / 3" />
        <Box padding={50} bg="primary" gridColumn="1" gridRow="2" />
        <Box padding={50} bg="primary" gridColumn="2" gridRow="2" />
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
          bg="primary"
          gridColumn="col / span 2"
          gridRow="row"
        />
        <Box
          padding={50}
          bg="primary"
          gridColumn="col 3 / span 2"
          gridRow="row"
        />
        <Box padding={50} bg="primary" gridColumn="col" gridRow="row 2" />
        <Box
          padding={50}
          bg="primary"
          gridColumn="col 2 / span 3"
          gridRow="row 2"
        />
        <Box
          padding={50}
          bg="primary"
          gridColumn="col / span 4"
          gridRow="row 3"
        />
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
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={3}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={4}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={5}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={6}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={7}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={8}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
      </Box>
      <Box display="flex" gap={4}>
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box display="flex" gap={8}>
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box display="flex" gap="72px">
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
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
      <Box
        width="100px"
        height="100px"
        bg="primary"
        display="inline-block"
        m="5px"
      />
      <Box
        width="100px"
        height="100px"
        bg="primary"
        display="inline-block"
        m="5px"
      />
      <Box
        width="100px"
        height="100px"
        bg="primary"
        display="inline-block"
        m="5px"
      />
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


### Scroll

**Render**

```tsx
() => {
  return (
    <div>
      <Box
        display="inline-block"
        size="150px"
        overflow="auto"
        scrollVariant="light"
        mr="20px"
      >
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
      </Box>
      <Box backgroundColor="rgb(0, 26, 37)" display="inline-block">
        <Box
          display="inline-block"
          size="150px"
          overflow="auto"
          scrollVariant="dark"
        >
          <Box
            width="100px"
            height="100px"
            bg="primary"
            display="inline-block"
            m="5px"
          />
          <Box
            width="100px"
            height="100px"
            bg="primary"
            display="inline-block"
            m="5px"
          />
          <Box
            width="100px"
            height="100px"
            bg="primary"
            display="inline-block"
            m="5px"
          />
        </Box>
      </Box>
    </div>
  );
}
```


### Rounded Corners

**Render**

```tsx
() => {
  const radiusTokens: BoxProps["borderRadius"][] = [
    "borderRadius000",
    "borderRadius010",
    "borderRadius025",
    "borderRadius050",
    "borderRadius100",
    "borderRadius200",
    "borderRadius400",
    "borderRadiusCircle",
  ];

  return (
    <Box display="flex" justifyContent="space-between">
      {radiusTokens.map((token) => (
        <Box
          key={`${token}-example`}
          backgroundColor="primary"
          height="100px"
          width="100px"
          borderRadius={token}
        />
      ))}
    </Box>
  );
}
```

