# Badge

## Import

```javascript
import Badge from "carbon-react/lib/components/badge";
```

## Examples

### Default

To render a `Badge`, pass the `counter` prop with a number or string value.

If the value is a number greater than `999`, it will be displayed as `999+`.
If the value is a string, the displayed value will be limited to 4 characters, therefore please ensure to format the string accordingly.

If the `counter` prop is not provided or its value is `0`, the `Badge` will not render.

See: `examples/Default.md`

### With Children

To position a `Badge` relative to another component, for example a `Button`, you can pass it as a child of `Badge`.

Please make sure you associate the `Badge` to the component it relates to, this can be done by setting the `Badge`'s `id` to the child component's `aria-describedby`.

See: `examples/WithChildren.md`

### Sizes

You can use the `size` prop to change the size of the `Badge` to "small", "medium" (default), or "large".

The "small" size will not visually display the `counter` value, however the prop will still be needed for the badge to render.

See: `examples/Sizes.md`

### Subtle Variant

By default, the `Badge` is rendered as the "typical" variant, however you can use the `variant` prop to change the appearance to "subtle".

See: `examples/SubtleVariant.md`

### Inverse

You can use the `inverse` prop to render the `Badge` with the inverse color scheme.

See: `examples/Inverse.md`

### (Deprecated) Badge with onClick

See: `examples/WithOnClick.md`

### (Deprecated) Custom Color

You can use the `color` prop to override the default color of the component.

See: `examples/CustomColor.md`

## Props

### Badge

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | The badge will be positioned relative to this element |  |
| counter | string \| number \| undefined | No |  |  |  | The number rendered in the badge component | 0 |
| id | string \| undefined | No |  |  |  | Unique identifier for the component. |  |
| inverse | boolean \| undefined | No |  |  |  | Set the style of the Badge to inverse | false |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of the badge | "medium" |
| variant | "subtle" \| "typical" \| undefined | No |  |  |  | Badge variant | "typical" |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| color | string \| undefined | No |  | Yes | Prop to specify the color of the component |  |  |
| onClick | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  | Yes | Callback fired when badge is clicked |  |  |
| aria-label | string \| undefined | No |  | Yes | Prop to specify an aria-label for the component |  |  |
