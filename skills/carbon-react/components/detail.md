---
name: carbon-component-detail
description: Carbon Detail component props and usage examples.
---

# Detail

## Import
`import Detail from "carbon-react/lib/components/detail";`

## Source
- Export: `./components/detail`
- Props interface: `DetailProps`
- Deprecated: Yes
- Deprecation reason: `Detail` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | The rendered children of the component. |  |
| className | string \| undefined | No |  |  |  |
| footnote | string \| undefined | No |  | A small detail to display under the main content. |  |
| icon | IconType \| undefined | No |  | The type of icon to use. |  |
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
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => (
  <Detail>This is where the children will live.</Detail>
)
```


### Detail inside Card

**Render**

```tsx
() => (
  <Card width="300px">
    <Box pt="16px">
      <Detail>This example of Detail just has children.</Detail>
    </Box>
    <Divider type="horizontal" />
    <Box pt="8px">
      <Detail footnote="This is a footnote">
        This example of Detail has children and also a footnote.
      </Detail>
    </Box>
    <Divider type="horizontal" />
    <Box pb="16px">
      <Detail icon="settings" footnote="This is a footnote">
        Where as this example of Detail has a footnote and icon.
      </Detail>
    </Box>
  </Card>
)
```


### Detail inside Tile

**Render**

```tsx
() => (
  <Tile width="60%">
    <TileContent pt="16px">
      <Detail>This example of Detail just has children.</Detail>
    </TileContent>
    <TileContent pt="8px">
      <Detail footnote="This is a footnote">
        This example of Detail has children and also a footnote.
      </Detail>
    </TileContent>
    <TileContent pb="16px">
      <Detail icon="settings" footnote="This is a footnote">
        Where as this example of Detail has a footnote and icon.
      </Detail>
    </TileContent>
  </Tile>
)
```


### Detail with footnote

**Render**

```tsx
() => (
  <Detail footnote="This is a footnote.">
    This is where the children will live.
  </Detail>
)
```


### Detail with icon

**Render**

```tsx
() => (
  <Detail icon="bin" footnote="This is a footnote.">
    This is where the children will live.
  </Detail>
)
```

