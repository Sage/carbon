# Checkbox

Checkbox provides a way to check an individual option, or check multiple options from a list.

**Category:** Inputs

## Quick Start

```javascript
import { Checkbox } from "carbon-react/lib/components/checkbox";
```

## Designer Notes

- Disabled or read-only checkboxes might be difficult for a user to distinguish visually, so try to avoid this.
- Consider ‘smart default’ selections, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.
- Rather than a checkbox to accept legal terms, consider labelling a button ‘Accept Terms and Continue’ instead.

## Related Components

- Choosing one option from a longer list? [Try Radio Button](../radio-button/index.md).
- Choosing one option from a very long list? Try Select.
- Choosing one option from a highly visible range? [Try Button Toggle](../button-toggle/index.md).

## Examples

### Default

A basic `Checkbox` with a label. Toggle the checked state via `checked` and `onChange` props.

See: `examples/Default.md`

### Sizes

Two size variants: `small` and `large` (default is `large`). Set via the `size` prop.

See: `examples/Sizes.md`

### Disabled

Use the `disabled` prop to render a non-interactive checkbox.

See: `examples/Disabled.md`

### Reversed

Place input box to the right of the label.

See: `examples/Reversed.md`

### Required

Mark the field as mandatory using the `required` prop, which adds a visual asterisk to the label.

See: `examples/Required.md`

### With fieldHelp

Add a hint below the checkbox using the `fieldHelp` prop.

See: `examples/WithFieldHelp.md`

### Custom label width

Use the `labelWidth` prop to set the percentage of the field width allocated to the label. The remaining space is used by the checkbox input.

See: `examples/CustomLabelWidth.md`

### With labelHelp (legacy)

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is _false_.

See: `examples/LegacyLabelHelp.md`

## Props

### Checkbox

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| checked | boolean | Yes |  | Checked state of the input |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  | Handler for change events |  |
| adaptiveSpacingBreakpoint | number \| undefined | No |  | Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set |  |
| ariaDescribedBy | string \| undefined | No |  | The id of the element that describe the input. |  |
| ariaLabelledBy | string \| undefined | No |  | Prop to specify the aria-labelledby attribute of the input |  |
| autoFocus | boolean \| undefined | No |  | If true the Component will be focused when page load |  |
| disabled | boolean \| undefined | No |  | If true, the component will be disabled |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| fieldHelp | React.ReactNode | No |  | Help content to be displayed under an input |  |
| fieldHelpInline | boolean \| undefined | No |  | If true, the FieldHelp will be displayed inline To be used with labelInline prop set to true |  |
| helpAriaLabel | string \| undefined | No |  | [Legacy] Aria label for rendered help component |  |
| id | string \| undefined | No |  | Unique Identifier for the input. Will use a randomly generated GUID if none is provided |  |
| info | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information. |  |
| inputWidth | number \| undefined | No |  | Sets percentage-based input width |  |
| label | React.ReactNode | No |  | Label content |  |
| labelHelp | React.ReactNode | No |  | The content for the help tooltip, to appear next to the Label |  |
| labelInline | boolean \| undefined | No |  | When true label is inline |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) |  |
| labelWidth | number \| undefined | No |  | Label width |  |
| loading | boolean \| undefined | No |  |  |  |
| name | string \| undefined | No |  | Input name |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Blur event handler |  |
| onClick | ((ev: React.MouseEvent<HTMLInputElement>) => void) \| undefined | No |  | Accepts a callback function which is triggered on click event |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | OnFocus event handler |  |
| onMouseEnter | ((ev: React.MouseEvent<HTMLInputElement>) => void) \| undefined | No |  | OnMouseEnter event handler |  |
| onMouseLeave | ((ev: React.MouseEvent<HTMLInputElement>) => void) \| undefined | No |  | OnMouseLeave event handler |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory |  |
| reverse | boolean \| undefined | No |  | If true the label switches position with the input |  |
| size | "small" \| "large" \| undefined | No |  | Size of the component |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | [Legacy] Overrides the default tooltip position |  |
| validationIconId | string \| undefined | No |  | Id of the validation icon |  |
| validationOnLabel | boolean \| undefined | No |  | When true, displays validation icon on label |  |
| value | string \| undefined | No |  | The value of the checkbox, passed on form submit |  |
| warning | string \| boolean \| undefined | No |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-labelledby | string \| undefined | No |  | Prop to specify the aria-labelledby property of the input |  |
