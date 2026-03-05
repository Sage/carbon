---
name: carbon-component-loader-spinner
description: Carbon LoaderSpinner component props and usage examples.
---

# LoaderSpinner

## Import
`import { LoaderSpinner } from "carbon-sage/lib/components/loader-spinner";`

## Source
- Export: `./components/loader-spinner`
- Props interface: `LoaderSpinnerProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| animationTime | number \| undefined | No |  | The total animation time (in seconds). Default animation is time `1` second. For any gradient variants the default animation time is `2` seconds |  |
| hasMotion | boolean \| undefined | No |  | If set to `false` all motion will be suspended | true |
| isTracked | boolean \| undefined | No |  | If set to `true` the animation type will become tracked, this is used specifically for when wait times are predictable | false |
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
| showSpinnerLabel | boolean \| undefined | No |  | If set to `false` no visual label will be displayed, however a visually hidden label will still be available for assistive technologies | true |
| size | "small" \| "medium" \| "large" \| "extra-small" \| "extra-large" \| undefined | No |  | The size prop allows a specific size to be set, ranging from `extra-small` to `extra-large` | "medium" |
| spinnerLabel | string \| undefined | No |  | Use the spinnerLabel prop to override the default `"Loading..."` label with any custom string |  |
| variant | "gradient-grey" \| "gradient-white" \| "action" \| "inverse" \| "neutral" \| undefined | No |  | The variant prop can be used to change the appearance of the component. Typically both the outer and inner spinner will change color, however there will still be sufficient contrast between them | "action" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => (
  <Box display="flex">
    <LoaderSpinner />
  </Box>
)
```


### Override Spinner Label

**Render**

```tsx
() => (
  <Box display="flex">
    <LoaderSpinner mx="3" spinnerLabel="Processing..." variant="action" />
    <LoaderSpinner mx="3" spinnerLabel="Saving..." variant="neutral" />
    <LoaderSpinner
      mx="3"
      spinnerLabel="Loading... This can take a few seconds... Or a few minutes..."
      variant="action"
    />
  </Box>
)
```


### Sizes

**Render**

```tsx
() => {
  return (
    <Box display="flex" alignItems="baseline">
      {sizes.map((size) => (
        <LoaderSpinner mx="20px" key={size} size={size} />
      ))}
    </Box>
  );
}
```


### Show Spinner Label

**Render**

```tsx
() => (
  <Box display="flex">
    <LoaderSpinner showSpinnerLabel={false} />
  </Box>
)
```


### Variants

**Render**

```tsx
() => (
  <Box display="flex">
    <LoaderSpinner mx="3" showSpinnerLabel={false} variant="action" />
    <LoaderSpinner mx="3" showSpinnerLabel={false} variant="neutral" />
    <Box backgroundColor="black">
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="inverse" />
    </Box>
    <Box backgroundColor="lightgrey">
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="gradient-grey" />
    </Box>
    <Box backgroundColor="lightgrey">
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="gradient-white" />
    </Box>
  </Box>
)
```


### Label Color

**Render**

```tsx
() => (
  <Box display="flex" backgroundColor="black" height="80px" width="220px" p={2}>
    <LoaderSpinner mx="3" variant="inverse" />
    <LoaderSpinner mx="3" variant="gradient-white" />
  </Box>
)
```


### Has Motion

**Render**

```tsx
() => (
  <Box display="flex">
    <LoaderSpinner mx="3" hasMotion={false} />
    <LoaderSpinner mx="3" variant="gradient-grey" hasMotion={false} />
  </Box>
)
```


### Is Tracked

**Render**

```tsx
() => (
  <Box display="flex">
    <LoaderSpinner isTracked />
  </Box>
)
```


### Animation Time

**Render**

```tsx
() => (
  <Box display="flex">
    <LoaderSpinner mx="3" animationTime={5} />
    <LoaderSpinner mx="3" variant="gradient-grey" animationTime={5} />
    <LoaderSpinner mx="3" isTracked animationTime={5} />
  </Box>
)
```

