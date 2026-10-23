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
| m | SpacingProperty | No |  |  |  |
| margin | SpacingProperty | No |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |
| marginX | SpacingProperty | No |  |  |  |
| marginY | SpacingProperty | No |  |  |  |
| mb | SpacingProperty | No |  |  |  |
| ml | SpacingProperty | No |  |  |  |
| mr | SpacingProperty | No |  |  |  |
| mt | SpacingProperty | No |  |  |  |
| mx | SpacingProperty | No |  |  |  |
| my | SpacingProperty | No |  |  |  |
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


### With Lines

**Render**

```tsx
() => {
  return <Preview loading lines={6} />;
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


### With Width

**Render**

```tsx
() => {
  return <Preview loading width="256px" />;
}
```


### With Height

**Render**

```tsx
() => {
  return <Preview loading height="256px" />;
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


### Disable Animation

**Render**

```tsx
() => {
  return <Preview loading disableAnimation />;
}
```

