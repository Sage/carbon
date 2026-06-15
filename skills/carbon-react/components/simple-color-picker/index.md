# Simple Color Picker

A color picker lets a user select a single color from a defined set. It indicates the currently selected color.

**Category:** Inputs

## Quick Start

```javascript
import SimpleColorPicker from "carbon-react/lib/components/simple-color-picker";
```

## Examples

### Default

A grid of `SimpleColor` swatches wrapped in a `SimpleColorPicker`. Clicking a swatch selects it and calls `onChange` with the chosen colour value.

See: `examples/Default.md`

### Disabled

Use the `disabled` prop to render all swatches as non-interactive.

See: `examples/Disabled.md`

### Required

You can use the `required` prop to indicate if the field is mandatory.

See: `examples/Required.md`

#### With margin

See: `examples/WithMargin.md`

## Props

### SimpleColorPicker

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| legend | string | Yes |  | The content for the Legend |  |
| name | string | Yes |  | The name to apply to the input. |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  | Prop for `onChange` events |  |
| value | string | Yes |  | The currently selected color. |  |
| children | React.ReactNode | No |  | The SimpleColor components to be rendered in the group |  |
| childWidth | string \| number \| undefined | No |  | prop that represents childWidth |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| info | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information. |  |
| maxWidth | string \| number \| undefined | No |  | prop that sets max-width in css |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onBlur` events |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onKeyDown` events |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory |  |
| validationOnLegend | boolean \| undefined | No |  | When true, validation icon will be placed on legend instead of being placed by the input |  |
| warning | string \| boolean \| undefined | No |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### SimpleColor

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| value | string | Yes |  | the value of the color that is represented by this SimpleColor |  |
| checked | boolean \| undefined | No |  | determines if this color option is selected or unselected |  |
| className | string \| undefined | No |  |  |  |
| defaultChecked | boolean \| undefined | No |  | determines if this color option is selected or unselected when component is used as uncontrolled |  |
| disabled | boolean \| undefined | No |  | if true, input will be disabled |  |
| id | string \| undefined | No |  | the input id |  |
| name | string \| undefined | No |  | the input name |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onBlur` events |  |
| onChange | ((ev: React.ChangeEvent<HTMLInputElement>) => void) \| undefined | No |  | called when the user selects or deselects this color option |  |
| onMouseDown | ((ev: React.MouseEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onMouseDown` events |  |
| aria-label | string \| undefined | No |  | the value of the label to pass to screen reader software |  |
