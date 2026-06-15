# Decimal

Captures a number with a decimal point, or a currency value.

**Category:** Inputs

## Quick Start

```javascript
import Decimal from "carbon-react/lib/components/decimal";
```

## Validation States

This component supports input validation, see our [Validations](../../references/docs/validations.md) documentation page for more information.

## Examples

### Default

Basic decimal input with a label. Default precision is 2 decimal places.

See: `examples/DefaultStory.md`

### With Input Hint

Use the `inputHint` prop to display a hint text below the label.

See: `examples/WithInputHint.md`

### Sizes

Three size variants: `small`, `medium` (default), and `large`, set via the `size` prop.

See: `examples/Sizes.md`

### Disabled

Use `disabled` to render a non-interactive read-only decimal input.

See: `examples/Disabled.md`

### Prefix

Use the `prefix` prop to prepend a short string (e.g. a currency symbol) displayed inside the input box.

See: `examples/Prefix.md`

### ReadOnly

Use `readOnly` to display the current value without allowing the user to edit it.

See: `examples/ReadOnly.md`

### Empty

Shows the input with no initial value, demonstrating placeholder behaviour.

See: `examples/Empty.md`

### With Custom Precision

Override the number of decimal places with the `precision` prop (e.g. 4 for financial data).

See: `examples/WithCustomPrecision.md`

### With custom maxWidth

Use the `maxWidth` prop to constrain the input to a specific maximum width.

See: `examples/WithCustomMaxWidth.md`

### Required

You can use the `required` prop to indicate if the field is mandatory.

See: `examples/Required.md`

### Left aligned

You can use the `align` prop to choose how the the characters inside the component align.
In this example, `align` has been assigned the value `left`.

See: `examples/LeftAligned.md`

### With labelInline

Use the `labelInline` prop to display the label on the same horizontal row as the input. You can adjust its appearance using the `labelWidth` and 
`labelAlign` props to control the width and text alignment of the label and the `inputWidth` prop to control the width of the input.

See: `examples/LabelInline.md`

### With fieldHelp (legacy)

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *false*.

See: `examples/WithFieldHelp.md`

## Props

### Decimal

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onChange | (ev: CustomEvent) => void | Yes |  |  |  | Handler for change event |  |
| value | string | Yes |  |  |  | The value of the input |  |
| align | "left" \| "right" \| undefined | No |  |  |  | Text alignment of the label |  |
| allowEmptyValue | boolean \| undefined | No |  |  |  | Allow an empty value instead of defaulting to 0.00 |  |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  |  |  | Override the variant component |  |
| autoFocus | boolean \| undefined | No |  |  |  | If true the Component will be focused when rendered |  |
| deferTimeout | number \| undefined | No |  |  |  | Integer to determine a timeout for the deferred callback |  |
| disabled | boolean \| undefined | No |  |  |  | If true, the component will be disabled |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicate that error has occurred. |  |
| formattedValue | string \| undefined | No |  |  |  | An optional alternative for props.value, this is useful if the real value is an ID but you want to show a human-readable version. |  |
| iconOnClick | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Optional handler for click event on Textbox icon |  |
| iconOnMouseDown | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Optional handler for mouse down event on Textbox icon |  |
| iconTabIndex | number \| undefined | No |  |  |  | Overrides the default tabindex of the component |  |
| id | string \| undefined | No |  |  |  | The input id |  |
| inputHint | string \| undefined | No |  |  |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputIcon | string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal \| null \| undefined | No |  |  |  | Type of the icon that will be rendered next to the input |  |
| inputWidth | number \| undefined | No |  |  |  | The width of the input as a percentage |  |
| label | string \| undefined | No |  |  |  | Label content |  |
| labelInline | boolean \| undefined | No |  |  |  | When true label is inline. |  |
| leftChildren | React.ReactNode | No |  |  |  | Additional child elements to display before the input |  |
| locale | string \| undefined | No |  |  |  | The locale string - default en |  |
| maxWidth | string \| undefined | No |  |  |  | Prop for specifying the max width of the input. Leaving the `maxWidth` prop with no value will default the width to '100%' |  |
| name | string \| undefined | No |  |  |  | The input name |  |
| onBlur | ((ev: CustomEvent) => void) \| undefined | No |  |  |  | Handler for blur event |  |
| onChangeDeferred | ((ev: React.ChangeEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Deferred callback to be called after the onChange event |  |
| onClick | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on click |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Event handler for the focus event |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on keyDown |  |
| onMouseDown | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Event handler for the mouse down event |  |
| placeholder | string \| undefined | No |  |  |  | Placeholder string to be displayed in input |  |
| precision | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| 11 \| 12 \| 13 \| 14 \| 15 \| undefined | No |  |  |  | The decimal precision of the value in the input |  |
| prefix | string \| undefined | No |  |  |  | Emphasized part of the displayed text |  |
| readOnly | boolean \| undefined | No |  |  |  | If true, the component will be read-only |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure component as mandatory |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of an input |  |
| validationIconId | string \| undefined | No |  |  |  | Id of the validation icon |  |
| validationMessagePositionTop | boolean \| undefined | No |  |  |  | Render the ValidationMessage above the Textbox input when validationRedesignOptIn flag is set |  |
| warning | string \| boolean \| undefined | No |  |  |  | Indicate that warning has occurred. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | The ID of the input's description, is set along with hint text and error message. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component |  |
| adaptiveLabelBreakpoint | number \| undefined | No |  | Yes | `adaptiveLabelBreakpoint` has been deprecated, the functionality will no longer work. |  |  |
| fieldHelp | React.ReactNode | No |  | Yes | `fieldHelp` has been deprecated, `inputHint` should be used instead. [Legacy] Help content to be displayed under an input. |  |  |
| helpAriaLabel | string \| undefined | No |  | Yes | `helpAriaLabel` has been deprecated, the functionality will no longer work. |  |  |
| info | string \| boolean \| undefined | No |  | Yes | `info` has been deprecated, the functionality will no longer work. |  |  |
| labelAlign | "left" \| "right" \| undefined | No |  | Yes | `labelAlign` has been deprecated, the functionality will no longer work. |  |  |
| labelHelp | React.ReactNode | No |  | Yes | `labelHelp` has been deprecated, `inputHint` should be used instead. [Legacy] Text applied to label help tooltip. When opted into new design validations string values will render as a hint above the input, unless an `inputHint` prop is also passed. |  |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | Yes | `labelSpacing` has been deprecated, the functionality will no longer work. |  |  |
| labelWidth | number \| undefined | No |  | Yes | `labelWidth` has been deprecated, the functionality will no longer work. |  |  |
| reverse | boolean \| undefined | No |  | Yes | `reverse` has been deprecated, the functionality will no longer work. |  |  |
| tooltipId | string \| undefined | No |  | Yes | `tooltipId` has been deprecated, the functionality will no longer work. |  |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | `tooltipPosition` has been deprecated, the functionality will no longer work. |  |  |
| validationOnLabel | boolean \| undefined | No |  | Yes | `validationOnLabel` has been deprecated, the functionality will no longer work. |  |  |
