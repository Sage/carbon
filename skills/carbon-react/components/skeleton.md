---
name: carbon-component-skeleton
description: Carbon Skeleton component props and usage examples.
---

# Skeleton

## Import
`import Skeleton from "carbon-react/lib/components/skeleton";`

## Source
- Export: `./components/skeleton`
- Props interface: `SkeletonProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Children content to render in the component. |  |
| disableAnimation | boolean \| undefined | No |  | Removes the animation. Also disabled when the user prefers reduced motion. |  |
| height | (string & {}) \| SkeletonHeight \| undefined | No |  | Sets a preset or custom pixel/CSS height. Presets: h1 (38px), h2 (30px), h3 (26px), h4 (23px), paragraph (21px), button (40px). |  |
| lines | number \| undefined | No |  | The number of placeholder shapes to render. |  |
| loading | boolean \| undefined | No |  | Sets loading state. |  |
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
| shape | SkeletonShape \| undefined | No |  | Sets the Skeleton shape. Legacy values remain supported for Preview compatibility. |  |
| width | string \| undefined | No |  | Sets the width of the Skeleton. Defaults to 100% (except circles, which match their height). |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <Skeleton loading />;
}
```


### With Lines

**Render**

```tsx
() => {
  return <Skeleton loading lines={6} />;
}
```


### With Children

**Render**

```tsx
() => {
  const [isLoading, setIsLoading] = useState(true);
  const handleOnClick = () => {
    setIsLoading(!isLoading);
  };
  return (
    <>
      <Skeleton loading={isLoading} lines={3}>
        This the where the children are rendered
      </Skeleton>
      <Button mt={2} onClick={handleOnClick}>
        {isLoading ? "Click to preview children" : "Click to see loading state"}
      </Button>
    </>
  );
}
```


### With Width

**Render**

```tsx
() => {
  return <Skeleton loading width="256px" />;
}
```


### With Height

**Render**

```tsx
() => {
  return <Skeleton loading height="256px" />;
}
```


### Shapes

**Render**

```tsx
() => {
  return (
    <>
      <Skeleton mb={2} loading shape="rectangle-moderate" />
      <Skeleton mb={2} loading shape="rectangle-curved" />
      <Skeleton loading shape="circle" />
    </>
  );
}
```


### Disable Animation

**Render**

```tsx
() => {
  return <Skeleton loading disableAnimation />;
}
```


### Height Presets

**Render**

```tsx
() => {
  return (
    <>
      <Skeleton loading height="h1" />
      <Skeleton loading height="h2" />
      <Skeleton loading height="h3" />
      <Skeleton loading height="h4" />
      <Skeleton loading height="paragraph" />
      <Skeleton loading height="button" />
    </>
  );
}
```

