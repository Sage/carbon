# Date

A date picker captures a single date selected or entered by a user.

**Category:** Inputs

## Quick Start

```javascript
import DateInput from "carbon-react/lib/components/date";
```

## Designer Notes

- If the date is likely to be close to today (e.g. an invoice due date), then a datepicker may be useful. If the date is likely to be far in the past (e.g. a date of birth), then it may be better to use separate inputs for day, month, and year or use a NumeralDate component.
- Field focus automatically opens the datepicker, but a user can key in dates too, which many users find more convenient, especially in financial applications.
- Carbon handles a range of formats, like dd/mm/yyyy, dd/mm/yy, dd/mm, or dd. Configuration can be regional, and copes with space, slash, full stop, comma and colon as separators, as well as no separator at all.

## Validation States

This component supports input validation, see our Validations documentation page for more information.

## Examples

### Default

The `value` and `onChange` props are required as this component must be controlled. The `onChange` will receive a event
with a target value containing a `formattedValue` and `rawValue`. The `rawValue` should be used for storing the value
in the backend and for running validations: it will either return a valid ISO string or null. The `formattedValue` should
be used to set the input value like in the example below, although the component can be initialised with an ISO formatted string.

See: `examples/Default.md`

### Input Hint

Use the `inputHint` prop to display a short hint below the label to guide the user on the expected date format or value.

See: `examples/InputHint.md`

### Sizes

The `size` prop controls the height of the input. Available values are `small`, `medium` (default), and `large`.

See: `examples/Sizes.md`

### Disabled

Set `disabled` to prevent user interaction with the field. The input and calendar icon will be visually dimmed and non-interactive.

See: `examples/Disabled.md`

### ReadOnly

Set `readOnly` to display the current value without allowing edits. Unlike `disabled`, the field remains accessible to screen readers.

See: `examples/ReadOnly.md`

### Empty

Shows the date input in its initial empty state, before the user has selected or entered a date.

See: `examples/Empty.md`

### With disabled dates

You can configure the available dates by passing a `minDate` and `maxDate` prop to the component.

See: `examples/DisabledDates.md`

Another way to disable dates is by passing the `disabled` prop through the `pickerProps` prop directly to the DayPicker. The `disabled` prop accepts either a matcher or an array of [matchers](https://daypicker.dev/api/type-aliases/Matcher#example).

See: `examples/DisabledDatesUsingPickerProps.md`

### With custom width

You can use the `maxWidth` prop to set a custom width for the date input, with accepts any valid CSS string.

See: `examples/WithCustomWidth.md`

### With disabled portal

By default the calendar picker renders in a React portal appended to the document body. Pass `disablePortal` to render it inline within the DOM tree instead — useful when the picker needs to remain within a scrollable or overflow-constrained container.

See: `examples/WithDisabledPortal.md`

### Required

You can use the `required` prop to indicate if the field is mandatory.

See: `examples/Required.md`

### Locale override

The examples below illustrate how to override the locale passed into the Date component. The first example has been set up for
the German (`de`) locale whilst the second is for a Chinese (`zh-CN`) locale.

Required locales can be imported from date-fns like so: `import { de, zhCN } from 'date-fns/locale';`

See: `examples/LocaleOverrideExampleImplementation.md`

### Locale format override

You can also override the default date format for a specific locale by passing a `dateFormatOverride` prop to the `DateInput` component or alternatively,
you can use the `date.dateFormatOverride` translation key.
The example below demonstrates how you can override the default date format for the German locale (`dd.MM.yyyy`), please note that the prop will take precedence over the translation key.

See: `examples/LocaleFormatOverrideExampleImplementation.md`

### With labelInline

Use the `labelInline` prop to display the label on the same horizontal row as the input. You can adjust its appearance using the `labelWidth` and
`labelAlign` props to control the width and text alignment of the label and the `inputWidth` prop to control the width of the input.

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is _false_.

See: `examples/WithLabelInline.md`

### With fieldHelp (legacy)

Use the `fieldHelp` prop to display additional help text below the input.

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is _false_.

See: `examples/WithFieldHelp.md`

## Props

### Date

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onChange | (ev: DateChangeEvent) => void | Yes |  |  |  | Specify a callback triggered on change |  |
| value | string | Yes |  |  |  | The current date string |  |
| align | "left" \| "right" \| undefined | No |  |  |  |  |  |
| allowEmptyValue | boolean \| undefined | No |  |  |  | Boolean to allow the input to have an empty value |  |
| as | React.ElementType<any, keyof React.JSX.IntrinsicElements> \| undefined | No |  |  |  | Override the variant component |  |
| autoFocus | boolean \| undefined | No |  |  |  | If true the Component will be focused when rendered |  |
| dateFormatOverride | string \| undefined | No |  |  |  | Date format string to be applied to the date inputs |  |
| datePickerAriaLabel | string \| undefined | No |  |  |  | Prop to specify the aria-label attribute of the date picker |  |
| datePickerAriaLabelledBy | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby attribute of the date picker |  |
| disabled | boolean \| undefined | No |  |  |  | If true, the component will be disabled |  |
| disablePortal | boolean \| undefined | No |  |  |  | Boolean to toggle where DatePicker is rendered in relation to the Date Input |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicate that error has occurred. |  |
| id | string \| undefined | No |  |  |  | Unique identifier for the input. Label id will be based on it, using following pattern: [id]-label. Will use a randomly generated GUID if none is provided. |  |
| inputHint | string \| undefined | No |  |  |  | A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. |  |
| inputName | InputName \| undefined | No |  |  |  |  |  |
| inputWidth | number \| undefined | No |  |  |  | The width of the input as a percentage |  |
| label | string \| undefined | No |  |  |  | Label content |  |
| labelInline | boolean \| undefined | No |  |  |  | When true label is inline. |  |
| maxDate | string \| undefined | No |  |  |  | Maximum possible date YYYY-MM-DD |  |
| maxWidth | string \| undefined | No |  |  |  | Prop for specifying the max width of the input. Leaving the `maxWidth` prop with no value will default the width to '100%' |  |
| minDate | string \| undefined | No |  |  |  | Minimum possible date YYYY-MM-DD |  |
| name | string \| undefined | No |  |  |  | Name of the input |  |
| onBlur | ((ev: DateChangeEvent) => void) \| undefined | No |  |  |  | Specify a callback triggered on blur |  |
| onClick | ((ev: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on click |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Event handler for the focus event |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLInputElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on keyDown |  |
| onPickerClose | (() => void) \| undefined | No |  |  |  | Callback triggered when the picker is closed |  |
| onPickerOpen | (() => void) \| undefined | No |  |  |  | Callback triggered when the picker is opened |  |
| pickerProps | PickerProps \| undefined | No |  |  |  | Pass any props that match the DayPickerProps interface to override default behaviors See [DayPickerProps](https://daypicker.dev/api/type-aliases/DayPickerProps) for a full list of available props |  |
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
