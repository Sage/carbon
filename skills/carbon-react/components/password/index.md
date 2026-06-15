# Password

Provide a way for the user to securely enter a password.

**Category:** Inputs

## Quick Start

```javascript
import Password from "carbon-react/lib/components/password";
```

## Validation States

This component supports input validation, see our Validations documentation page for more information.

## Examples

### Default

**Warning - Please ensure that the `forceObscurity` prop is `true` on form submission,**
**this will ensure browsers do not remember the inputs content.**
We have set the `autocomplete` attribute to `off` on the component also, but this is not widely
supported across different browsers and can have unpredictable results.

See: `examples/Default.md`

### With forceObscurity

When `forceObscurity` is `true` the input type is set to `password` and text is obscured, whilst in this state
the input type will not be able to be changed to `text`. To be used primarily to change the type back to
`password` on form submission.

See: `examples/ForceObscurity.md`

### With inputHint

When the `inputHint` prop is passed, please use a full stop `.` at the end. This forces a pause
before any other announcements, this well help screen reader users understand the hint fully.

See: `examples/InputHint.md`

### Character counter

Use the `characterLimit` prop to display a live character count below the input.

See: `examples/CharacterCounter.md`

### Prefix

Use the `prefix` prop to prepend a short string inside the input box.

See: `examples/Prefix.md`

### Sizes

Three size variants: `small`, `medium` (default), and `large`, set via the `size` prop.

See: `examples/Sizes.md`

### Margins

Apply external margin to the input wrapper using spacing system props (`m`, `mt`, etc.).

See: `examples/Margins.md`

### Disabled

Use the `disabled` prop to prevent user interaction with the password input.

See: `examples/Disabled.md`

### ReadOnly

Use `readOnly` to display the value without allowing edits. The show/hide toggle is still present.

See: `examples/ReadOnly.md`

### With custom maxWidth

Use the `maxWidth` prop to constrain the input to a specific maximum width.

See: `examples/WithCustomMaxWidth.md`

### Required

See: `examples/WithRequired.md`

### With labelInline

Use the `labelInline` prop to display the label on the same horizontal row as the input.

See: `examples/WithLabelInline.md`

### With fieldHelp (legacy)

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *false*.

See: `examples/WithFieldHelp.md`

## Props

### Password

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  |  |  | Specify a callback triggered on change |  |
| value | string \| number \| readonly string[] \| undefined | Yes |  |  |  | The value of the input |  |
| align | "left" \| "right" \| undefined | No |  |  |  |  |  |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  |  |  | Override the variant component |  |
| autoFocus | boolean \| undefined | No |  |  |  | If true the Component will be focused when rendered |  |
| characterLimit | number \| undefined | No |  |  |  | Character limit of the textarea |  |
| children | React.ReactNode | No |  |  |  | Content to be rendered next to the input |  |
| deferTimeout | number \| undefined | No |  |  |  | Integer to determine a timeout for the deferred callback |  |
| disabled | boolean \| undefined | No |  |  |  | If true, the component will be disabled |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicate that error has occurred. |  |
| forceObscurity | boolean \| undefined | No |  |  |  | When `true` input `type` is `password` and text is obscured. | false |
| formattedValue | string \| undefined | No |  |  |  | An optional alternative for props.value, this is useful if the real value is an ID but you want to show a human-readable version. |  |
| iconOnClick | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Optional handler for click event on Textbox icon |  |
| iconOnMouseDown | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Optional handler for mouse down event on Textbox icon |  |
| iconTabIndex | number \| undefined | No |  |  |  | Overrides the default tabindex of the component |  |
| id | string \| undefined | No |  |  |  | Unique identifier for the input. Label id will be based on it, using following pattern: [id]-label. Will use a randomly generated GUID if none is provided. |  |
| inputHint | string \| undefined | No |  |  |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputIcon | string \| number \| boolean \| React.ReactElement<any, string \| React.JSXElementConstructor<any>> \| Iterable<React.ReactNode> \| React.ReactPortal \| null \| undefined | No |  |  |  | Type of the icon that will be rendered next to the input |  |
| inputWidth | number \| undefined | No |  |  |  | The width of the input as a percentage |  |
| label | string \| undefined | No |  |  |  | Label content |  |
| labelInline | boolean \| undefined | No |  |  |  | When true label is inline. |  |
| leftChildren | React.ReactNode | No |  |  |  | Additional child elements to display before the input |  |
| maxWidth | string \| undefined | No |  |  |  | Prop for specifying the max width of the input. Leaving the `maxWidth` prop with no value will default the width to '100%' |  |
| name | string \| undefined | No |  |  |  | Name of the input |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Event handler for the blur event |  |
| onChangeDeferred | ((ev: React.ChangeEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Deferred callback to be called after the onChange event |  |
| onClick | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on click |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Event handler for the focus event |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on keyDown |  |
| onMouseDown | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Event handler for the mouse down event |  |
| placeholder | string \| undefined | No |  |  |  | Placeholder string to be displayed in input |  |
| positionedChildren | React.ReactNode | No |  |  |  | Container for DatePicker or SelectList components |  |
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
