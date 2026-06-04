# Batch Selection

Batch Selection Component could be used to select multiple items, and apply a common action to all the items selected.

## Import

```javascript
import BatchSelection from "carbon-react/lib/components/batch-selection";
import Button from "carbon-react/lib/components/button";
import ButtonMinor from "carbon-react/lib/components/button-minor";
import IconButton from "carbon-react/lib/components/icon-button";
import Link from "carbon-react/lib/components/link";
```

## Examples

### Default usage

See: `examples/Default.md`

### On dark background

See: `examples/Dark.md`

### On light background

See: `examples/Light.md`

### On white background

See: `examples/White.md`

### Disabled

All Carbon components passed as children that can render as a button will be automatically disabled when the `disabled` prop is true.

See: `examples/Disabled.md`

## Props

### Batch Selection

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Content to be rendered after selected count |  |
| selectedCount | number | Yes |  | Number of selected elements |  |
| colorTheme | "white" \| "dark" \| "light" \| "transparent" \| undefined | No |  | Color of the background, transparent if not defined | "transparent" |
| disabled | boolean \| undefined | No |  | If true disables all user interaction | false |
| hidden | boolean \| undefined | No |  | Hidden if true |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Icon Button

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactElement<IconProps, string \| React.JSXElementConstructor<any>> | Yes |  | Icon meant to be rendered, should be an Icon component |  |
| disabled | boolean \| undefined | No |  | Set the button to disabled |  |
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
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback triggered on blur |  |
| onClick | ((e: React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback triggered on click |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback triggered on focus |  |
| onMouseEnter | ((ev: React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback triggered on mouse enter |  |
| onMouseLeave | ((ev: React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  | Callback triggered on mouse leave |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| data-component | string \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label of the icon-button component |  |
