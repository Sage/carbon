---
name: carbon-component-date-range
description: Carbon DateRange component props and usage examples.
---

# DateRange

## Import
`import DateRange from "carbon-react/lib/components/date-range";`

## Source
- Export: `./components/date-range`
- Props interface: `DateRangeProps`

## Props
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

## Examples
### Allow Empty Value

**Render**

```tsx
() => {
  const [state, setState] = useState(["", ""]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      value={state}
      startDateProps={{
        allowEmptyValue: true,
      }}
      endDateProps={{
        allowEmptyValue: true,
      }}
      onChange={handleChange}
    />
  );
}
```


### Default

**Render**

```tsx
() => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      onChange={handleChange}
      value={state}
    />
  );
}
```


### Labels Inline

**Render**

```tsx
() => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      onChange={handleChange}
      value={state}
      labelsInline
    />
  );
}
```


### Locale Format Override Example Implementation

**Args**

```tsx
{
  dateFormatOverride: "d-M-yyyy",
}
```

**Render**

```tsx
({
  ...args
}) => {
  const [state, setState] = useState(["2016-10-01", "2016-10-30"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };

  return (
    <div>
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: {
            dateFnsLocale: () => de,
            ariaLabels: {
              previousMonthButton: () => "Vorheriger Monat",
              nextMonthButton: () => "Nächster Monat",
            },
            dateFormatOverride: args.dateFormatOverride || "dd-MM-yyyy",
          },
        }}
      >
        <DateRange
          startLabel="Start"
          endLabel="End"
          value={state}
          onChange={handleChange}
        />
      </I18nProvider>
    </div>
  );
}
```


### Locale Override Example Implementation

**Render**

```tsx
() => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <div>
      <I18nProvider
        locale={{
          locale: () => "fr-FR",
          date: {
            dateFnsLocale: () => fr,
            ariaLabels: {
              previousMonthButton: () => "Mois précédent",
              nextMonthButton: () => "Mois prochain",
            },
          },
        }}
      >
        <DateRange
          startLabel="Start"
          endLabel="End"
          value={state}
          onChange={handleChange}
        />
      </I18nProvider>
    </div>
  );
}
```


### Required

**Render**

```tsx
() => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };
  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      onChange={handleChange}
      value={state}
      required
    />
  );
}
```


### With Disabled Dates

**Render**

```tsx
() => {
  const [state, setState] = useState(["2019-03-17", "2019-04-17"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };

  const isWeekend = (day: Date) => [0, 6].includes(day.getDay());

  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      value={state}
      startDateProps={{
        pickerProps: {
          disabled: [
            isWeekend,
            {
              from: new Date(2019, 3, 1),
              to: new Date(2019, 3, 15),
            },
            { before: new Date(2019, 2, 15) },
            { after: new Date(2019, 4, 15) },
          ],
        },
      }}
      endDateProps={{
        minDate: "2019-04-15",
      }}
      onChange={handleChange}
    />
  );
}
```

