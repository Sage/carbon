# Advanced Color Picker

Selects a single colour from a defined set.

## Import

```javascript
import AdvancedColorPicker from "carbon-react/lib/components/advanced-color-picker";
```

## Examples

### Basic usage

Shows how the color picker can be used to select a color from a predefined set.

See: `examples/Default.md`

### Preventing focus from being restored when AdvancedColorPicker closes

When the `restoreFocusOnClose` prop is `false`, focus will not be restored to the element that was focused before the `AdvancedColorPicker` was opened.
Focus can instead be programmatically applied to another element if appropriate.

See: `examples/RestoreFocusOnCloseStory.md`

## Props

### AdvancedColorPicker

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| availableColors | AdvancedColor[] | Yes |  | Prop for `availableColors` containing array of objects of colors |  |
| name | string | Yes |  | Specifies the name prop to be applied to each color in the group |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  | Prop for `onChange` event |  |
| selectedColor | string | Yes |  | Prop for `selectedColor` containing pre-selected color for `controlled` use |  |
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
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onBlur` event |  |
| onClose | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement> \| KeyboardEvent) => void) \| undefined | No |  | Prop for `onClose` event |  |
| onOpen | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  | Prop for `onOpen` event |  |
| open | boolean \| undefined | No |  | Prop for `open` status | false |
| restoreFocusOnClose | boolean \| undefined | No |  | Enables the automatic restoration of focus to the element that invoked the modal when the modal is closed. | true |
| role | string \| undefined | No |  | The ARIA role to be applied to the component container |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  | Prop to specify the aria-describedby property of the component |  |
| aria-label | string \| undefined | No |  | Prop to specify the aria-label of the component. To be used only when the title prop is not defined, and the component is not labelled by any internal element. |  |
| aria-labelledby | string \| undefined | No |  | Prop to specify the aria-labelledby property of the component To be used when the title prop is a custom React Node, or the component is labelled by an internal element other than the title. |  |
