# Date Range

Captures a start and end date.

Used to filter a Table of data according to a start and end date, or to set two dates which are related to each other, for example, a hotel booking.

**Category:** Inputs

## Quick Start

```javascript
import DateRange from "carbon-react/lib/components/date-range";
```

## Validation States

This component supports input validation, see our Validations documentation page for more information.

**Note:** Validation states are applied to individual date inputs to indicate the state of the start and end date separately, this can be achieved by
passing the `startError`, `endError`, `startWarning` and `endWarning` props.

## Examples

### Default

See: `examples/DefaultStory.md`

### Allow Empty Value

You can pass prop `allowEmptyValue` to start and end `DateInput` using `startDateProps` and `endDateProps`.

See: `examples/AllowEmptyValue.md`

### Required

You can use the `required` prop to indicate if the fields are mandatory.

See: `examples/Required.md`

### With disabled dates

You can disable dates by using `startDateProps` and `endDateProps`, which allow you to pass properties directly to the start or end date.
For example, you can set a `minDate` or `maxDate`, or use `pickerProps` with a `disabled` option that accepts a matcher or an array of [matchers](https://daypicker.dev/api/type-aliases/Matcher#example).

See: `examples/WithDisabledDates.md`

### Locale override

The examples below illustrates how to override the locale passed into the DateRange component. In this example it has been set up for
the French locale. Required locales can be imported like so `import { fr } from 'date-fns/locale';`

See: `examples/LocaleOverrideExampleImplementation.md`

### Locale format override

You can also override the format used to display dates in the date picker via the `dateFormatOverride` property. In the example below, the German locale is used
but the date format has been overridden to `y-m-ddd` as opposed to the default `dd.MM.yyyy`.

See: `examples/LocaleFormatOverrideExampleImplementation.md`

### Labels Inline (legacy)

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is _false_.

See: `examples/LabelsInline.md`

## Props

### Date Range

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onChange | (ev: DateRangeChangeEvent) => void | Yes |  | Specify a callback triggered on change |  |
| value | string[] | Yes |  | An array containing the value of startDate and endDate |  |
| dateFormatOverride | string \| undefined | No |  | Date format string to be applied to the date inputs |  |
| datePickerEndAriaLabel | string \| undefined | No |  | Prop to specify the aria-label attribute of the end date picker |  |
| datePickerEndAriaLabelledBy | string \| undefined | No |  | Prop to specify the aria-labelledby attribute of the end date picker |  |
| datePickerStartAriaLabel | string \| undefined | No |  | Prop to specify the aria-label attribute of the start date picker |  |
| datePickerStartAriaLabelledBy | string \| undefined | No |  | Prop to specify the aria-labelledby attribute of the start date picker |  |
| endDateProps | Omit<Partial<DateInputProps>, "required"> \| undefined | No |  | Props for the child end Date component | {} |
| endError | string \| boolean \| undefined | No |  | Indicate that error has occurred on end date. Pass string to display icon, tooltip and red border. Pass true boolean to only display red border. |  |
| endInfo | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information for end date. Pass string to display icon, tooltip and blue border. Pass true boolean to only display blue border. |  |
| endLabel | string \| undefined | No |  | Optional label for endDate field |  |
| endRef | React.ForwardedRef<HTMLInputElement> \| undefined | No |  | A React ref to pass to the second of the two Date Input fields |  |
| endWarning | string \| boolean \| undefined | No |  | Indicate that warning has occurred on end date. Pass string to display icon, tooltip and orange border. Pass true boolean to only display orange border. |  |
| id | string \| undefined | No |  | An optional string prop to provide an id to the component |  |
| labelsInline | boolean \| undefined | No |  | [Legacy] Display labels inline |  |
| name | string \| undefined | No |  | An optional string prop to provide a name to the component |  |
| onBlur | ((ev: DateRangeChangeEvent) => void) \| undefined | No |  | Specify a callback triggered on blur |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory. |  |
| startDateProps | Omit<Partial<DateInputProps>, "required"> \| undefined | No |  | Props for the child start Date component | {} |
| startError | string \| boolean \| undefined | No |  | Indicate that error has occurred on start date. Pass string to display icon, tooltip and red border. Pass true boolean to only display red border. |  |
| startInfo | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information for start date. Pass string to display icon, tooltip and blue border. Pass true boolean to only display blue border. |  |
| startLabel | string \| undefined | No |  | Optional label for startDate field |  |
| startRef | React.ForwardedRef<HTMLInputElement> \| undefined | No |  | A React ref to pass to the first of the two Date Input fields |  |
| startWarning | string \| boolean \| undefined | No |  | Indicate that warning has occurred on start date. Pass string to display icon, tooltip and orange border. Pass true boolean to only display orange border. |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | [Legacy] Overrides the default tooltip position |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Render the ValidationMessage above the Date inputs when validationRedesignOptIn flag is set | true |
| validationOnLabel | boolean \| undefined | No |  | [Legacy] When true, validation icons will be placed on labels instead of being placed on the inputs |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
