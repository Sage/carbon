---
name: carbon-component-flex-tile-cell
description: Carbon FlexTileCell component props and usage examples.
---

# FlexTileCell

## Import
`import { FlexTileCell } from "carbon-react/lib/components/tile";`

## Source
- Export: `./components/tile`
- Props interface: `FlexTileCellProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | The content to render within the responsive cell. |  |
| alignContent | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| alignItems | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| alignSelf | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| as | keyof JSX.IntrinsicElements \| React.ComponentType<any> \| undefined | No |  |  |  | Set the element rendered by the Box component. Only `div` and `span` will be supported in the future. |  |
| bottom | CSSValue \| undefined | No |  |  |  |  |  |
| boxSizing | BoxSizing \| undefined | No |  |  |  | Set the box-sizing attribute of the Box component |  |
| columnGap | Gap \| undefined | No |  |  |  | Column gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| display | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flex | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexBasis | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  | "160px" |
| flexDirection | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| flexGrow | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  | 1 |
| flexShrink | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  | 0 |
| flexWrap | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gap | Gap \| undefined | No |  |  |  | Gap, an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| gridArea | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridAutoColumns | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridAutoFlow | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridAutoRows | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridColumn | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridRow | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridTemplateAreas | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridTemplateColumns | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| gridTemplateRows | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| height | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| hidden | boolean \| undefined | No |  |  |  | Whether the component is hidden from view. In this state, the component will not be visible to users but will remain in the HTML document |  |
| id | string \| undefined | No |  |  |  | Set the ID attribute of the Box component |  |
| justifyContent | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| justifyItems | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| justifySelf | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| left | CSSValue \| undefined | No |  |  |  |  |  |
| m | SpacingProperty | No |  |  |  |  |  |
| margin | SpacingProperty | No |  |  |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |  |  |
| marginX | SpacingProperty | No |  |  |  |  |  |
| marginY | SpacingProperty | No |  |  |  |  |  |
| maxHeight | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| maxWidth | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| mb | SpacingProperty | No |  |  |  |  |  |
| minHeight | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| minWidth | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| ml | SpacingProperty | No |  |  |  |  |  |
| mr | SpacingProperty | No |  |  |  |  |  |
| mt | SpacingProperty | No |  |  |  |  |  |
| mx | SpacingProperty | No |  |  |  |  |  |
| my | SpacingProperty | No |  |  |  |  |  |
| order | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| overflow | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| overflowWrap | OverflowWrap \| undefined | No |  |  |  | String to set Box content break strategy. Note "anywhere" is not supported in Safari |  |
| overflowX | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| overflowY | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| p | SpacingProperty | No |  |  |  |  |  |
| padding | SpacingProperty | No |  |  |  |  |  |
| paddingBottom | SpacingProperty | No |  |  |  |  |  |
| paddingLeft | SpacingProperty | No |  |  |  |  |  |
| paddingRight | SpacingProperty | No |  |  |  |  |  |
| paddingTop | SpacingProperty | No |  |  |  |  |  |
| paddingX | SpacingProperty | No |  |  |  |  |  |
| paddingY | SpacingProperty | No |  |  |  |  |  |
| pb | SpacingProperty | No |  |  |  |  |  |
| pl | SpacingProperty | No |  |  |  |  |  |
| position | string \| undefined | No |  |  |  |  |  |
| pr | SpacingProperty | No |  |  |  |  |  |
| pt | SpacingProperty | No |  |  |  |  |  |
| px | SpacingProperty | No |  |  |  |  |  |
| py | SpacingProperty | No |  |  |  |  |  |
| right | CSSValue \| undefined | No |  |  |  |  |  |
| role | string \| undefined | No |  |  |  | Set the Role attribute of the Box component |  |
| rowGap | Gap \| undefined | No |  |  |  | Row gap an integer multiplier of the base spacing constant (8px) or any valid CSS string." |  |
| size | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| top | CSSValue \| undefined | No |  |  |  |  |  |
| verticalAlign | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| width | ResponsiveValue<CSSValue> \| undefined | No |  |  |  |  |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-atomic | "true" \| "false" \| undefined | No |  |  |  | Indicates whether AT will announce all, or only parts of, the changed region |  |
| aria-hidden | "true" \| "false" \| undefined | No |  |  |  | Set the container to be hidden from screen readers |  |
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No |  |  |  | Make the container an aria-live region |  |
| backgroundColor | string \| undefined | No |  | Yes | This prop is marked for deprecation and will have a longer grace period before removal. Its behavior will be maintained until removal. | Set the backgroundColor attribute of the Box component |  |
| bg | string \| undefined | No |  | Yes | This prop is marked for deprecation and will have a longer grace period before removal. Its behavior will be maintained until removal. | Set the bg attribute of the Box component |  |
| borderRadius | BorderRadiusType \| undefined | No |  | Yes | This prop is marked for deprecation. Its behavior will be maintained until removal. | Design Token for Border Radius. Note: please check that the border radius design token you are using is compatible with the Box component. |  |
| boxShadow | BoxShadowsType \| undefined | No |  | Yes | This prop is marked for deprecation. Its behavior will be maintained until removal. | Design Token for Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Box component. |  |
| color | string \| undefined | No |  | Yes | This prop is marked for deprecation and will have a longer grace period before removal. Its behavior will be maintained until removal. | Set the color attribute of the Box component |  |
| opacity | string \| number \| undefined | No |  | Yes | This prop is marked for deprecation. Its behavior will be maintained until removal. | Set the opacity attribute of the Box component |  |
| scrollVariant | ScrollVariant \| undefined | No |  | Yes | This prop is marked for deprecation. Its behavior will be maintained until removal. | Scroll styling attribute |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

