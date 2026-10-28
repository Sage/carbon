---
name: carbon-component-loader-bar
description: Carbon LoaderBar component props and usage examples.
---

# LoaderBar

## Import
`import LoaderBar from "carbon-react/lib/components/loader-bar";`

## Source
- Export: `./components/loader-bar`
- Props interface: `LoaderBarProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
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
| size | "small" \| "medium" \| "large" \| undefined | No |  | Size of the LoaderBar. | "medium" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <LoaderBar mt={2} />;
}
```


### Small

**Render**

```tsx
() => {
  return <LoaderBar size="small" mt={2} />;
}
```


### Large

**Render**

```tsx
() => {
  return <LoaderBar size="large" mt={2} />;
}
```

