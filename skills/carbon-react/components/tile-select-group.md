---
name: carbon-component-tile-select-group
description: Carbon TileSelectGroup component props and usage examples.
---

# TileSelectGroup

## Import
`import { TileSelectGroup } from "carbon-react/lib/components/tile-select";`

## Source
- Export: `./components/tile-select`
- Props interface: `TileSelectGroupProps`
- Deprecated: Yes
- Deprecation reason: `TileSelectGroup` is deprecated with `TileSelect`. No
like-for-like replacement has been validated; use a product-specific Fusion
pattern. See the Carbon deprecation migration documentation for consumer-specific guidance.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The TileSelect components to be rendered in the group |  |
| name | string | Yes |  | The name to apply to the input - only for single select mode. |  |
| description | string \| undefined | No |  | Description to be rendered below the legend |  |
| legend | string \| undefined | No |  | The content for the TileSelectGroup Legend |  |
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
| multiSelect | boolean \| undefined | No |  | When passed as true TileSelectGroup serves only visual purpose It wraps TileSelects in fieldset element and renders the legend and description props content onChange, onBlur, value, checked and name props are meant to be passed individually on each of the TileSelects | false |
| mx | SpacingProperty | No |  |  |  |
| my | SpacingProperty | No |  |  |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | A callback triggered when one of tiles is blurred - only for single select mode. |  |
| onChange | ((ev: React.ChangeEvent<HTMLInputElement> \| TileSelectDeselectEvent) => void) \| undefined | No |  | A callback triggered when one of tiles is selected - only for single select mode. |  |
| value | string \| null \| undefined | No |  | The currently selected value - only for single select mode. |  |
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

