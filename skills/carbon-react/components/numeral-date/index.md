# Numeral Date

For dates far from today, use this Numeral Date component. It is advised to use Three inputs consisting of day, month, and year.
For dates close to today, we advise the use of a standard datepicker. If you require this, please see the "Date Input" component.

## Import

```javascript
import NumeralDate, { NumeralDateProps, type NumeralDateHandle } from "carbon-react/lib/components/numeral-date";
```

## Validation States

This component supports input validation, see our Validations documentation page for more information.

## Examples

### Default

See: `examples/Default.md`

### With Input Hint

**Note:** The `labelHelp` prop will only render as hint text when the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *true*,
otherwise it will render as a Help tooltip (see the [With labelHelp (legacy)](#with-labelhelp-legacy) example).

See: `examples/WithInputHint.md`

### Allowed date formats

See: `examples/AllowedDateFormats.md`

### Validating date values

`NumeralDate` has both error and warning states, which can be set via the `error` and `warning` props respectively. However, `NumeralDate` also has a built-in feature to validate date values automatically, so you don't have to recreate this logic yourself.
This can be enabled via the `enableInternalError` and `enableInternalWarning` props. The rendered messages are displayed alongside the messages defined with the regular `error` and `warning` props.

This in-built validation feature uses translation keys for the invalid date messages, so you can modify them to suit your localisation needs. The keys are `numeralDate.validation.day`, `numeralDate.validation.month`, and `numeralDate.validation.year`.

#### As an error

When using the internal validations as an error, please ensure to also prevent form submission as this is not handled by the component.

See: `examples/InternalValidationErrorAndInternalValidationWarning.md`

### Size

You can use the `size` prop to set the size of the field.

See: `examples/Size.md`

### Required

See: `examples/Required.md`

### Programmatic Focus

It is possible to focus the `NumeralDate` component programmatically by passing a ref to the component and calling the `focus` method on it.

See: `examples/ProgrammaticFocus.md`

### With inputIds

It is possible to set IDs for each of the field inputs using the prop `inputIds`:

See: `examples/WithCustomFieldIds.md`

## Props

### NumeralDate

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onChange | (ev: NumeralDateEvent) => void | Yes |  |  |  | Change event handler |  |
| value | NumeralDateValue | Yes |  |  |  | Value |  |
| dateFormat | readonly ["dd", "mm", "yyyy"] \| readonly ["mm", "dd", "yyyy"] \| readonly ["yyyy", "mm", "dd"] \| readonly ["dd", "mm"] \| readonly ["mm", "dd"] \| readonly ["mm", "yyyy"] \| undefined | No |  |  |  |  |  |
| dayRef | React.ForwardedRef<HTMLInputElement> \| undefined | No |  |  |  | A React ref to pass to the input corresponding to the day |  |
| disabled | boolean \| undefined | No |  |  |  | If true, the component will be disabled |  |
| enableInternalError | boolean \| undefined | No |  |  |  | When true, enables the internal errors to be displayed |  |
| enableInternalWarning | boolean \| undefined | No |  |  |  | When true, enables the internal warnings to be displayed |  |
| error | string \| boolean \| undefined | No |  |  |  | Indicate that error has occurred. |  |
| fieldHelp | React.ReactNode | No |  |  |  | [Legacy] Help content to be displayed under an input |  |
| fieldLabelsAlign | "left" \| "right" \| undefined | No |  |  |  | Field labels alignment |  |
| helpAriaLabel | string \| undefined | No |  |  |  | [Legacy] Aria label for rendered help component |  |
| id | string \| undefined | No |  |  |  | `id` for events |  |
| info | string \| boolean \| undefined | No |  |  |  | [Legacy] Indicate additional information. |  |
| inputIds | DateInputIds \| undefined | No |  |  |  | Allow consumers to set IDs for each of the field inputs |  |
| label | string \| undefined | No |  |  |  | Label |  |
| labelAlign | "left" \| "right" \| undefined | No |  |  |  | Label alignment |  |
| labelHelp | React.ReactNode | No |  |  |  | [Legacy] Text applied to label help tooltip, will be rendered as hint text when `validationRedesignOptIn` is true. |  |
| labelInline | boolean \| undefined | No |  |  |  | [Legacy] When true, label is placed in line with an input |  |
| labelSpacing | 1 \| 2 \| undefined | No |  |  |  | [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) |  |
| labelWidth | number \| undefined | No |  |  |  | [Legacy] Label width |  |
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
| monthRef | React.ForwardedRef<HTMLInputElement> \| undefined | No |  |  |  | A React ref to pass to the input corresponding to the month |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  | `name` for events |  |
| onBlur | ((ev: NumeralDateEvent) => void) \| undefined | No |  |  |  | Blur event handler |  |
| readOnly | boolean \| undefined | No |  |  |  | If true, the component will be read-only |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure component as mandatory |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of an input |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  |  |  | [Legacy] Overrides the default tooltip position |  |
| validationMessagePositionTop | boolean \| undefined | No |  |  |  | Render the ValidationMessage above the NumeralDate inputs when validationRedesignOptIn flag is set |  |
| validationOnLabel | boolean \| undefined | No |  |  |  | [Legacy] When true, validation icons will be placed on labels instead of being placed on the inputs |  |
| warning | string \| boolean \| undefined | No |  |  |  | Indicate that warning has occurred. |  |
| yearRef | React.ForwardedRef<HTMLInputElement> \| undefined | No |  |  |  | A React ref to pass to the input corresponding to the year |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| adaptiveLabelBreakpoint | number \| undefined | No |  | Yes | `adaptiveLabelBreakpoint` has been deprecated. It is recommended to use `useMediaQuery` hook to implement adaptive behaviour. Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set |  |  |

## Ref methods

`NumeralDate`'s forwarded ref exposes the following imperative methods:

| Method Name | Description                                    |
| ----------- | ---------------------------------------------- |
| `focus()`   | Programmatically focuses the first input.      |
