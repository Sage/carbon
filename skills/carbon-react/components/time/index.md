# Time

A pair of numeric inputs for entering hours and minutes. Optionally includes an AM/PM toggle for 12-hour clock formats.

**Category:** Inputs

## Quick Start

```javascript
import { Time, type TimeHandle } from "carbon-react/lib/components/time";
```

### Validation

This component supports input validation, see our [Validations](../?path=/docs/documentation-validations--docs) documentation page for more information.

## Examples

### Default

The component needs to be controlled via `value` and `onChange` props. The `value` prop accepts an object
with `hours` and `minutes` properties that correspond to the relevant input.

See: `examples/Default.md`

### AM/PM toggle

In order to render the AM/PM toggle controls you should set the `period` property in the `value` object.

See: `examples/AmPmToggle.md`

### Input hint

Passing a string to the `inputHint` prop will render some additional hint text above the inputs.

See: `examples/InputHint.md`

### Required

Add `required` to mark the time input as mandatory. Both the hours and minutes fields will be marked as required and an asterisk will appear in the label.

See: `examples/Required.md`

### Disabled

Set `disabled` to prevent user interaction with the time inputs. Both hour and minute fields are visually dimmed and non-focusable.

See: `examples/Disabled.md`

### Read only

Set `readOnly` to display the time value as non-editable text. Unlike `disabled`, the value can still be selected and copied.

See: `examples/ReadOnly.md`

### Sizes

Three sizes are available: `small`, `medium` (default), and `large`. Match the size to other form fields used alongside this component.

See: `examples/Sizes.md`

### Focusing the inputs programmatically

The component exposes `focusHoursInput` and `focusMinutesInput` functions that support programmatically
focusing the hours and minutes inputs which can be called by passing a `ref` to the component.

See: `examples/FocusingInputs.md`

### Locale override

It is possible to override the translations applied to this component, see the [table below](#translation-keys)
for the available keys. It is also possible to have more granular control of the label overrides via the
`label` and `aria-label` props passed via the `hoursInputProps` and `minutesInputProps` respectively.

See: `examples/LocaleOverride.md`

## Props

### Time

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onChange | (ev: TimeInputEvent) => void | Yes |  | Callback to handle change events in input elements |  |
| value | TimeValue | Yes |  | The value of the input elements |  |
| disabled | boolean \| undefined | No |  | If true, the component will be disabled |  |
| fieldLabelsAlign | "left" \| "right" \| undefined | No |  | Field labels alignment |  |
| hoursInputProps | TimeInputProps \| undefined | No |  | Set custom `data-` and `id` attributes on the input element. Set the `label` and `aria-label` values for the associated Label element. Set the `error` and `warning` states for the input |  |
| inputHint | string \| undefined | No |  | Additional hint text rendered above the input elements |  |
| label | string \| undefined | No |  | Label text for the component |  |
| labelAlign | "left" \| "right" \| undefined | No |  | Label alignment |  |
| minutesInputProps | TimeInputProps \| undefined | No |  | Set custom `data-` and `id` attributes on the input element. Set the `label` and `aria-label` values for the associated Label element. Set the `error` and `warning` states for the input |  |
| name | string \| undefined | No |  | Set a name value on the component |  |
| onBlur | ((ev?: React.FocusEvent<HTMLInputElement>, value?: TimeValue) => void) \| undefined | No |  | Callback called when focus is lost on input elements |  |
| readOnly | boolean \| undefined | No |  | If true, the component will be read-only |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory |  |
| size | Sizes \| undefined | No |  | Sets the size of the inputs |  |
| toggleProps | ToggleDataProps \| undefined | No |  | Set custom data- attributes on the toggle elements |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Render the ValidationMessage above the Time inputs |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Ref methods

`Time`'s forwarded ref exposes the following imperative methods:

| Method Name             | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `focusHoursInput()`   | Programmatically focuses the hours input.       |
| `focusMinutesInput()` | Programmatically focuses the minutes input.     |
