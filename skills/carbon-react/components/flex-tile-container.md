---
name: carbon-component-flex-tile-container
description: Carbon FlexTileContainer component props and usage examples.
---

# FlexTileContainer

## Import
`import { FlexTileContainer } from "carbon-react/lib/components/tile";`

## Source
- Export: `./components/tile`
- Props interface: `FlexTileContainerProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The child elements of FlexTileContainer need to be FlexTileCell components. |  |
| columnGap | Gap \| undefined | No |  | Column gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." | 2 |
| overflow | ResponsiveValue<CSSValue> \| undefined | No |  |  | "hidden" |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

