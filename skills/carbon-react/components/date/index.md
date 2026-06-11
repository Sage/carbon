# Date

- If the date is likely to be close to today (e.g. an invoice due date), then a datepicker may be useful. If the date is likely to be far in the past (e.g. a date of birth), then it may be better to use separate inputs for day, month, and year or use a NumeralDate component.
- Field focus automatically opens the datepicker, but a user can key in dates too, which many users find more convenient, especially in financial applications.
- Carbon handles a range of formats, like dd/mm/yyyy, dd/mm/yy, dd/mm, or dd. Configuration can be regional, and copes with space, slash, full stop, comma and colon as separators, as well as no separator at all.

## Import

```javascript
import DateInput from "carbon-react/lib/components/date";
```

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

See: `examples/InputHint.md`

### Sizes

See: `examples/Sizes.md`

### Disabled

See: `examples/Disabled.md`

### ReadOnly

See: `examples/ReadOnly.md`

### Empty

See: `examples/Empty.md`

### With disabled dates

You can configure the available dates by passing a `minDate` and `maxDate` prop to the component.

See: `examples/DisabledDatesAndDisabledDatesUsingPickerProps.md`

### With custom width

You can use the `maxWidth` prop to set a custom width for the date input, with accepts any valid CSS string.

See: `examples/WithCustomWidth.md`

### With disabled portal

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

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *false*.

See: `examples/WithLabelInline.md`

### With fieldHelp (legacy)

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *false*.

See: `examples/WithFieldHelp.md`
