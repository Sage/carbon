# Preview

Applies a preview loading state animation.

## Import

```javascript
import Preview from "carbon-react/lib/components/preview";
```

## Examples

### Default

See: `examples/Default.md`

### With Lines

You can use the `lines` prop to specify the number of placeholder shapes to render.

See: `examples/WithLines.md`

### With Children

You can pass children to the component which will render when the `loading` prop is `false` or undefined.

See: `examples/WithChildren.md`

### With Custom Width

You can use the `width` prop to specify the width of the Preview.

See: `examples/WithWidth.md`

### With Custom Height

You can use the `height` prop to specify the height of the Preview.

See: `examples/WithHeight.md`

### Shapes

By default, the shape of the Preview is "text", however you can use the `shape` prop to change this.
You may also use the `lines` prop to render multiple Previews with the specified shape and the `width` and `height` props to change the default dimensions.

Note that when the `shape` prop is set to "circle", the `height` prop will determine the diameter and the `width` prop will be ignored.

See: `examples/Shapes.md`

### Disable Animation

You can set the `disableAnimation` prop to true to disable the loading animation. This will automatically be set to true when prefer reduce-motion is enabled.

See: `examples/DisableAnimation.md`

## Props

### Preview

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Children content to render in the component. |  |
| disableAnimation | boolean \| undefined | No |  | Removes Preview's animation, is true when prefer reduce-motion is on. |  |
| height | string \| undefined | No |  | Sets the height of the Preview. |  |
| lines | number \| undefined | No |  | The number of placeholder shapes to render. | 1 |
| loading | boolean \| undefined | No |  | Sets loading state. |  |
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
| shape | Shapes \| undefined | No |  | Sets the preview's shape. | "text" |
| width | string \| undefined | No |  | Sets the width of the Preview. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
