---
name: carbon-component-tile
description: Carbon Tile component props and usage examples.
---

# Tile

## Import
`import { Tile } from "carbon-react/lib/components/tile";`

## Source
- Export: `./components/tile`
- Props interface: `TileProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | The content to render within the tile. Each child will be wrapped with a TileContent wrapper, which allows any individual child component to take a percentage-based width prop, dictating the percentage of the tile width it will take up. Width will have no effect on a child component if the tile orientation is set to 'vertical'. |  |
| hasOutline | boolean \| undefined | No |  |  |  | Adds an outline to the tile to increase its visual prominence | true |
| height | string \| number \| undefined | No |  |  |  | Set a percentage-based height for the whole Tile component, relative to its parent. |  |
| inverse | boolean \| undefined | No |  |  |  | Inverts the tile colors for use on dark backgrounds for the 'standard' and 'alt' variants |  |
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
| roundness | Roundness \| LegacyRoundness \| undefined | No |  |  |  | Sets the level of roundness of the corners. Values can be `"curved"` or `"moderate"`. **Deprecated**: legacy values `"default"`, `"large"`, and `"small"` are deprecated and should not be used. | "curved" |
| statusKeyline | string \| undefined | No |  |  |  | Sets the status keyline to indicate the status of the content within the tile |  |
| variant | TileVariants \| DeprecatedTileVariants \| undefined | No |  |  |  | Sets the theme of the tile | "standard" |
| width | string \| number \| undefined | No |  |  |  | Set a percentage-based width for the whole Tile component, relative to its parent. If unset or zero, this will default to 100%. | "100%" |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| borderVariant | "default" \| "info" \| "selected" \| "caution" \| "negative" \| "positive" \| undefined | No |  | Yes | The `borderVariant` prop has been deprecated and will be removed in a future version. Use the `outline` prop instead. | Sets the border variant that should be used |  |
| borderWidth | "borderWidth100" \| "borderWidth200" \| "borderWidth300" \| "borderWidth400" \| "borderWidth600" \| "borderWidth000" \| undefined | No |  | Yes | The `borderWidth` prop is depreacted and will be removed in a future version. | Sets the border width by using these design tokens |  |
| highlightVariant | string \| undefined | No |  | Yes | The `highlightVariant` prop has been deprecated and will be removed in a future version. Use the `statusKeyline` prop instead. | Sets the highlight variant |  |
| orientation | "horizontal" \| "vertical" \| undefined | No |  | Yes | The `orientation` prop has been deprecated and will be removed in a future version. | The orientation of the tile - set to either horizontal or vertical |  |

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <Tile width={530}>
      <Box width="30%">Test Body One</Box>
      <Box width="40%">Test Body Two</Box>
      <Box width="30%">Test Body Three</Box>
    </Tile>
  );
}
```


### Without Outline

**Render**

```tsx
() => {
  return (
    <Tile hasOutline={false}>
      <Box width="30%">Test Body One</Box>
      <Box width="40%">Test Body Two</Box>
      <Box width="30%">Test Body Three</Box>
    </Tile>
  );
}
```


### Roundness

**Render**

```tsx
() => {
  return (
    <>
      <Tile roundness="moderate" mb={3}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile roundness="curved">
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
}
```


### With TileFooter

**Render**

```tsx
() => {
  return (
    <Box>
      <Tile px={0} pb={0} width={400}>
        <Box>
          <Box px={3}>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
          <TileFooter variant="selected">
            Example text
            <Icon
              size="small"
              type="success"
              ml="var(--global-space-comp-s)"
              color="var(--container-action-label-footer-activated)"
            />
          </TileFooter>
        </Box>
      </Tile>
      <Box my={3} />
      <Tile px={0} pb={0} width={400}>
        <Box>
          <Box px={3}>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
          <TileFooter variant="active">Example text</TileFooter>
        </Box>
      </Tile>
    </Box>
  );
}
```


### Custom Widths

**Render**

```tsx
() => {
  return (
    <Box>
      <Tile variant="tile" width="75%" roundness="moderate">
        <Box>Test Body</Box>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" width={1 / 4} roundness="moderate">
        <Box>Test Body</Box>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" width={150} roundness="moderate">
        <Box>Test Body</Box>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" roundness="moderate">
        <Box width="30%">Test Body One</Box>
        <Box width={150}>Test Body Two</Box>
        <Box width={1 / 4}>Test Body Three</Box>
      </Tile>
    </Box>
  );
}
```


### Custom Heights

**Render**

```tsx
() => {
  return (
    <Box display="flex" flexDirection="row" height="550px" gap="8px">
      <Tile variant="tile" height="35%" width="150px" roundness="moderate">
        <Box>
          <Box flexDirection="column">
            <Typography display="block" variant="strong">
              Title
            </Typography>
            Content
          </Box>
        </Box>
      </Tile>
      <Tile variant="tile" height="50%" width="150px" roundness="moderate">
        <Box flexDirection="column">
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
        </Box>
      </Tile>
      <Tile variant="tile" height="75%" width="150px" roundness="moderate">
        <Box flexDirection="column">
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
          <Box>Content</Box>
        </Box>
      </Tile>
      <Tile variant="tile" height="100%" width="150px" roundness="moderate">
        <Box flexDirection="column">
          <Box>
            <Typography display="block" variant="strong">
              Title
            </Typography>
            Content
          </Box>
          <Box>Content</Box>
          <Box>Content</Box>
        </Box>
      </Tile>
    </Box>
  );
}
```


### Standard

**Render**

```tsx
() => {
  return (
    <>
      <Tile variant="standard" roundness="moderate" my={2}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile variant="standard" mb={3} hasOutline={false} roundness="moderate">
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
}
```


### Standard Inverse

**Render**

```tsx
() => {
  return (
    <Box backgroundColor="#2e2e2e" p={2}>
      <Tile variant="standard" roundness="moderate" inverse mb={2}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile variant="standard" hasOutline={false} roundness="moderate" inverse>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </Box>
  );
}
```


### Alt

**Render**

```tsx
() => {
  return (
    <>
      <Tile variant="alt" mb={3} roundness="moderate">
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile variant="alt" mb={3} hasOutline={false} roundness="moderate">
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
}
```


### Alt Inverse

**Render**

```tsx
() => {
  return (
    <Box backgroundColor="#2e2e2e" p={2}>
      <Tile variant="alt" inverse roundness="moderate" mb={2}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile variant="alt" inverse roundness="moderate" hasOutline={false}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </Box>
  );
}
```


### Positive

**Render**

```tsx
() => {
  return (
    <>
      <Tile variant="positive" mb={3}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
}
```


### Negative

**Render**

```tsx
() => {
  return (
    <>
      <Tile variant="negative" mb={3}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
}
```


### Unavailable

**Render**

```tsx
() => {
  return (
    <>
      <Tile variant="unavailable" mb={3}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
}
```


### With Different Padding and Margin

**Render**

```tsx
() => {
  return (
    <>
      <Tile p={0} m={0} variant="tile" width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
      <Tile p={1} m={1} variant="tile" width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
      <Tile p={2} m={2} variant="tile" width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
      <Tile p={3} m={3} variant="tile" width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
      <Tile p={4} m={4} variant="tile" width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
      <Tile p={5} m={5} variant="tile" width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
    </>
  );
}
```


### With Definition List Default

**Render**

```tsx
() => {
  return (
    <Tile width="95%">
      <Dl>
        <Dt>Drink</Dt>
        <Dd>Coffee</Dd>
        <Dt>Brew Method</Dt>
        <Dd>Stove Top Moka Pot</Dd>
        <Dt>Brand of Coffee</Dt>
        <Dd>Magic Coffee Beans</Dd>
        <Dt>Website</Dt>
        <Dd>
          <Link href="www.sage.com">Magic Coffee Beans' Website</Link>
        </Dd>
        <Dt>Email</Dt>
        <Dd>
          <Link href="magic@coffeebeans.com">magic@coffeebeans.com</Link>
        </Dd>
        <Dt>Main and Registered Address</Dt>
        <Dd mb="4px">Magic Coffee Beans,</Dd>
        <Dd mb="4px">In The Middle of Our Street,</Dd>
        <Dd mb="4px">Madness,</Dd>
        <Dd mb="4px">CO4 3VE</Dd>
        <Dd>
          <Button
            buttonType="tertiary"
            iconType="link"
            iconPosition="after"
            href="https://goo.gl/maps/GMReLoBpbn9mdZVZ7"
          >
            View in Google Maps
          </Button>
        </Dd>
      </Dl>
    </Tile>
  );
}
```


### With Definition List and Custom Width

**Render**

```tsx
() => {
  return (
    <Tile width="95%">
      <Dl w={40}>
        <Dt>Drink</Dt>
        <Dd>Coffee</Dd>
        <Dt>Brew Method</Dt>
        <Dd>Stove Top Moka Pot</Dd>
        <Dt>Brand of Coffee</Dt>
        <Dd>Magic Coffee Beans</Dd>
        <Dt>Website</Dt>
        <Dd>
          <Link href="www.sage.com">Magic Coffee Beans' Website</Link>
        </Dd>
        <Dt>Email</Dt>
        <Dd>
          <Link href="magic@coffeebeans.com">magic@coffeebeans.com</Link>
        </Dd>
        <Dt>Main and Registered Address</Dt>
        <Dd mb="4px">Magic Coffee Beans,</Dd>
        <Dd mb="4px">In The Middle of Our Street,</Dd>
        <Dd mb="4px">Madness,</Dd>
        <Dd mb="4px">CO4 3VE</Dd>
        <Dd>
          <Button
            buttonType="tertiary"
            iconType="link"
            iconPosition="after"
            href="https://goo.gl/maps/GMReLoBpbn9mdZVZ7"
          >
            View in Google Maps
          </Button>
        </Dd>
      </Dl>
    </Tile>
  );
}
```


### Responsive Tile

**Render**

```tsx
() => {
  return (
    <Tile m={0} py={0} roundness="moderate">
      <FlexTileContainer>
        <FlexTileCell py={2}>
          <FlexTileDivider />
          Test Body One
        </FlexTileCell>
        <FlexTileCell py={2}>
          <FlexTileDivider />
          Test Body Two
        </FlexTileCell>
        <FlexTileCell py={2}>
          <FlexTileDivider />
          Test Body Three With a very very long text
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
}
```


### Responsive Tile with Custom Gaps

**Render**

```tsx
() => {
  return (
    <>
      <Tile my={1} py={0} roundness="moderate">
        <FlexTileContainer>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body One</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body Two</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">
              Test Body Three With a very very long text
            </Box>
          </FlexTileCell>
        </FlexTileContainer>
      </Tile>
      <Tile my={1} py={0} roundness="moderate">
        <FlexTileContainer columnGap={6}>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body One</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body Two</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">
              Test Body Three With a very very long text
            </Box>
          </FlexTileCell>
        </FlexTileContainer>
      </Tile>
    </>
  );
}
```


### Responsive Tile with Fixed Width for Cells

**Render**

```tsx
() => {
  return (
    <Tile my={1} py={0} roundness="moderate">
      <FlexTileContainer>
        <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed fit-content
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="80px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 80px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="120px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 120px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="160px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 160px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="200px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 200px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="240px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 240px
          </Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
}
```


### Responsive Tile with Flex Width for Cells

**Render**

```tsx
() => {
  return (
    <Tile my={1} py={0} roundness="moderate">
      <FlexTileContainer>
        <FlexTileCell flexBasis="80px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 80px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="120px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 120px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="160px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="200px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 200px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="240px" py={2} maxWidth="400px">
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 240px - maxWidth 400px
          </Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
}
```


### Responsive Tile with Proportionate Widths

**Render**

```tsx
() => {
  return (
    <Tile my={1} py={0} roundness="moderate">
      <FlexTileContainer>
        <FlexTileCell flexGrow={1} py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px normal
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={2} py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px wide
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={3} py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px extra-wide
          </Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
}
```


### Responsive Tile with Align Content

**Render**

```tsx
() => {
  return (
    <Tile my={1} py={0} roundness="moderate">
      <FlexTileContainer>
        <FlexTileCell justifyContent="flex-start" py={2}>
          <FlexTileDivider />
          <Box>Align left</Box>
        </FlexTileCell>
        <FlexTileCell justifyContent="flex-end" py={2}>
          <FlexTileDivider />
          <Box>Align right</Box>
        </FlexTileCell>
        <FlexTileCell justifyContent="center" py={2}>
          <FlexTileDivider />
          <Box>Align center</Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
}
```


### Responsive with Overflow Visible

**Render**

```tsx
() => {
  return (
    <Tile m={0} p={0} roundness="moderate">
      <FlexTileContainer overflow="visible">
        <FlexTileCell py={2}>Test Body One</FlexTileCell>
        <FlexTileCell py={2}>Test Body Two</FlexTileCell>
        <FlexTileCell py={2}>
          Test Body Three With a very very long text
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
}
```


### Status Keylines

**Render**

```tsx
() => {
  return (
    <>
      <Tile statusKeyline="informational" roundness="moderate">
        <Box>informational</Box>
      </Tile>
      <br />
      <Tile statusKeyline="positive" roundness="moderate">
        <Box>positive</Box>
      </Tile>
      <br />
      <Tile statusKeyline="warning" roundness="moderate">
        <Box>warning</Box>
      </Tile>
      <br />
      <Tile statusKeyline="negative" roundness="small">
        <Box>negative</Box>
      </Tile>
      <br />
      <Tile statusKeyline="neutral" roundness="moderate">
        <Box>neutral</Box>
      </Tile>
      <br />
      <Tile statusKeyline="important" roundness="moderate">
        <Box>important</Box>
      </Tile>
      <br />
      <Tile statusKeyline="ai" roundness="moderate">
        <Box>ai</Box>
      </Tile>
    </>
  );
}
```

