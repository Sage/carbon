---
name: carbon-component-loader-star
description: Carbon LoaderStar component props and usage examples.
---

# LoaderStar

## Import
`import LoaderStar from "carbon-sage/lib/components/loader-star";`

## Source
- Export: `./components/loader-star`
- Props interface: `LoaderStarProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| loaderStarLabel | string \| undefined | No |  | The loaderStarLabel prop allows a specific label to be set. This label will be present if the user has `reduce-motion` enabled and will also be available to assistive technologies. By default the label will be `Loading...`. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return <LoaderStar />;
}
```

