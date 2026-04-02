---
name: carbon-component-icon-button
description: Carbon IconButton component props and usage examples.
---

# IconButton

## Import
`import IconButton from "carbon-react/lib/components/icon-button";`

## Source
- Export: `./components/icon-button`
- Props interface: `IconButtonProps`
- Deprecated: Yes
- Deprecation reason: `IconButton` has been deprecated. See the Carbon documentation for migration details.

## Props
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

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="home" />
    </IconButton>
  );
}
```


### Disabled

**Render**

```tsx
() => {
  return (
    <IconButton disabled aria-label="icon-button" onClick={() => {}}>
      <Icon type="home" />
    </IconButton>
  );
}
```


### With Tooltip

**Render**

```tsx
() => {
  return (
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="home" tooltipMessage="Hey I'm a tooltip!" />
    </IconButton>
  );
}
```

