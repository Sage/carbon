---
name: carbon-component-scrollable-block
description: Carbon ScrollableBlock component props and usage examples.
---

# ScrollableBlock

## Import
`import { ScrollableBlock } from "carbon-sage/lib/components/menu";`

## Source
- Export: `./components/menu`
- Props interface: `ScrollableBlockProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Children elements |  |
| height | string \| number \| undefined | No |  | A custom height to be applied to the component. |  |
| parent | React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| undefined | No |  | the element, if any, displayed at the top of the block to be its semantic "parent", but not part of the scrollable section |  |
| parentVariant | VariantType \| undefined | No |  | the colour variant for the parent element, if different from the variant of the block |  |
| variant | VariantType \| undefined | No |  | set the colour variant for a menuType | "default" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

