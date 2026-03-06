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
| overflow | ResponsiveValue<CSS.Property.Overflow, ThemeType> \| undefined | No |  | The overflow CSS property sets what to do when an element's content is too big to fit in its block formatting context. It is a shorthand for overflow-x and overflow-y. [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) | "hidden" |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

