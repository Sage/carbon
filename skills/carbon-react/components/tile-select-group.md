---
name: carbon-component-tile-select-group
description: Carbon TileSelectGroup component props and usage examples.
---

# TileSelectGroup

## Import
`import { TileSelectGroup } from "carbon-sage/lib/components/tile-select";`

## Source
- Export: `./components/tile-select`
- Props interface: `TileSelectGroupProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | The TileSelect components to be rendered in the group |  |
| name | string | Yes |  | The name to apply to the input - only for single select mode. |  |
| description | string \| undefined | No |  | Description to be rendered below the legend |  |
| legend | string \| undefined | No |  | The content for the TileSelectGroup Legend |  |
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
| multiSelect | boolean \| undefined | No |  | When passed as true TileSelectGroup serves only visual purpose It wraps TileSelects in fieldset element and renders the legend and description props content onChange, onBlur, value, checked and name props are meant to be passed individually on each of the TileSelects | false |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
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

