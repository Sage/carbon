---
name: carbon-component-preview
description: Carbon Preview component props and usage examples.
---

# Preview

## Import
`import Preview from "carbon-react/lib/components/preview";`

## Source
- Export: `./components/preview`
- Props interface: `PreviewProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Children content to render in the component. |  |
| disableAnimation | boolean \| undefined | No |  | Removes Preview's animation, is true when prefer reduce-motion is on. |  |
| height | string \| undefined | No |  | Sets the height of the Preview. |  |
| lines | number \| undefined | No |  | The number of placeholder shapes to render. | 1 |
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
| shape | Shapes \| undefined | No |  | Sets the preview's shape. | "text" |
| width | string \| undefined | No |  | Sets the width of the Preview. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <Preview loading />;
}
```


### Disable Animation

**Render**

```tsx
() => {
  return <Preview loading disableAnimation />;
}
```


### Shapes

**Render**

```tsx
() => {
  return (
    <>
      <Preview mb={2} loading shape="rectangle" />
      <Preview mb={2} loading shape="rectangle-round" />
      <Preview loading shape="circle" />
    </>
  );
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
      <Preview loading={isLoading} lines={3}>
        This the where the children are rendered
      </Preview>
      <Button mt={2} onClick={handleOnClick}>
        {isLoading ? "Click to preview children" : "Click to see loading state"}
      </Button>
    </>
  );
}
```


### With Height

**Render**

```tsx
() => {
  return <Preview loading height="256px" />;
}
```


### With Lines

**Render**

```tsx
() => {
  return <Preview loading lines={6} />;
}
```


### With Width

**Render**

```tsx
() => {
  return <Preview loading width="256px" />;
}
```

