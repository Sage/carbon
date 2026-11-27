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
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| onChange | (ev: DateRangeChangeEvent) => void | Yes |  |  |  | Specify a callback triggered when the value changes. Standard: called whenever a date changes. Combined: called when Apply is pressed and the value differs, including a partial range. |  |
| value | string[] | Yes |  |  |  | An array containing the value of the start date and the end date |  |
| dateFormatOverride | string \| undefined | No |  |  |  | Date format string to be applied to the dates |  |
| endDateProps | Omit<Partial<DateInputProps>, "required"> \| undefined | No |  |  |  | Standard only. Props for the child end Date component |  |
| endError | string \| boolean \| undefined | No |  |  |  | Standard only. Indicate that error has occurred on end date. Pass string to display icon, tooltip and red border. Pass true boolean to only display red border. |  |
| endLabel | string \| undefined | No |  |  |  | Standard only. Optional label for endDate field |  |
| endRef | React.ForwardedRef<HTMLInputElement> \| undefined | No |  |  |  | Standard only. A React ref to pass to the second of the two Date Input fields |  |
| endWarning | string \| boolean \| undefined | No |  |  |  | Standard only. Indicate that warning has occurred on end date. Pass string to display icon, tooltip and orange border. Pass true boolean to only display orange border. |  |
| id | string \| undefined | No |  |  |  | An optional string prop to provide an id to the component |  |
| labelsInline | boolean \| undefined | No |  |  |  | [Legacy] Display labels inline |  |
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
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| name | string \| undefined | No |  |  |  | An optional string prop to provide a name to the component. Form fields are named `${name}-start` and `${name}-end`. |  |
| onBlur | ((ev: DateRangeChangeEvent) => void) \| undefined | No |  |  |  | Specify a callback triggered on blur |  |
| rangeType | "standard" \| undefined | No | standard |  |  | Standard only. Renders two date inputs, each with its own calendar. This is the default. |  |
| required | boolean \| undefined | No |  |  |  | Flag to configure component as mandatory. |  |
| size | "small" \| "medium" \| "large" \| undefined | No | small \| medium \| large |  |  | Size of the field or fields. A parent Fieldset's size takes priority. |  |
| startDateProps | Omit<Partial<DateInputProps>, "required"> \| undefined | No |  |  |  | Standard only. Props for the child start Date component |  |
| startError | string \| boolean \| undefined | No |  |  |  | Standard only. Indicate that error has occurred on start date. Pass string to display icon, tooltip and red border. Pass true boolean to only display red border. |  |
| startLabel | string \| undefined | No |  |  |  | Standard only. Optional label for startDate field |  |
| startRef | React.ForwardedRef<HTMLInputElement> \| undefined | No |  |  |  | Standard only. A React ref to pass to the first of the two Date Input fields |  |
| startWarning | string \| boolean \| undefined | No |  |  |  | Standard only. Indicate that warning has occurred on start date. Pass string to display icon, tooltip and orange border. Pass true boolean to only display orange border. |  |
| validationMessagePositionTop | boolean \| undefined | No |  |  |  | Render the ValidationMessage above the inputs when validationRedesignOptIn flag is set |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| datePickerEndAriaLabel | string \| undefined | No |  | Yes | The calendar is now named by its date input's label (`startLabel` or `endLabel`). Remove this prop; it has no effect. |  |  |
| datePickerEndAriaLabelledBy | string \| undefined | No |  | Yes | The calendar is now named by its date input's label (`startLabel` or `endLabel`). Remove this prop; it has no effect. |  |  |
| datePickerStartAriaLabel | string \| undefined | No |  | Yes | The calendar is now named by its date input's label (`startLabel` or `endLabel`). Remove this prop; it has no effect. |  |  |
| datePickerStartAriaLabelledBy | string \| undefined | No |  | Yes | The calendar is now named by its date input's label (`startLabel` or `endLabel`). Remove this prop; it has no effect. |  |  |
| endInfo | string \| boolean \| undefined | No |  | Yes | Not supported. Use `endDateProps.inputHint`, `endWarning`, or `endError` as appropriate. |  |  |
| startInfo | string \| boolean \| undefined | No |  | Yes | Not supported. Use `startDateProps.inputHint`, `startWarning`, or `startError` as appropriate. |  |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No | left \| right \| bottom \| top | Yes | Not supported. Use inline `inputHint`, `warning`, or `error` content. |  |  |
| validationOnLabel | boolean \| undefined | No |  | Yes | Not supported. Use inline `warning` or `error` messages. |  |  |

## Examples
### Playground - Standard

**Args**

```tsx
{
    startLabel: "Start date",
    endLabel: "End date",
    size: "medium",
    required: false,
    labelsInline: false,
    validationMessagePositionTop: true,
    startDisabled: false,
    endDisabled: false,
    startReadOnly: false,
    endReadOnly: false,
  }
```

**Render**

```tsx
({
    startDisabled,
    endDisabled,
    startReadOnly,
    endReadOnly,
    ...args
  }) => (
    <StandardDateRangeWithState
      {...args}
      startDateProps={{ disabled: startDisabled, readOnly: startReadOnly }}
      endDateProps={{ disabled: endDisabled, readOnly: endReadOnly }}
    />
  )
```


### Playground - Combined

**Args**

```tsx
{
    label: "Date range",
    size: "medium",
    required: false,
    disabled: false,
  }
```

**Render**

```tsx
(args) => <CombinedDateRangeWithState {...args} />
```


### Default

**Render**

```tsx
() => <StandardDateRangeWithState />
```


### Sizes

**Render**

```tsx
() => (
  <Box display="flex" flexDirection="column" gap={2}>
    {(["small", "medium", "large"] as const).map((size) => (
      <StandardDateRangeWithState key={size} size={size} />
    ))}
    {(["small", "medium", "large"] as const).map((size) => (
      <Box key={size}>
        <CombinedDateRangeWithState label="Date range" size={size} />
      </Box>
    ))}
  </Box>
)
```


### Prevent End Date Before Start Date

**Render**

```tsx
() => {
  const [state, setState] = useState(["15/07/2025", ""]);
  const [startIso, setStartIso] = useState<string | undefined>("2025-07-15");

  // The end date's calendar starts at the chosen start date.
  const handleChange = (ev: DateRangeChangeEvent) => {
    setState(toFormattedValues(ev));
    setStartIso(ev.target.value[0].rawValue || undefined);
  };

  return (
    <Box>
      <Typography mb={2}>
        Start dates before 1 July 2025 are unavailable. After selecting a start
        date, earlier dates are unavailable in the end-date calendar.
      </Typography>
      <DateRange
        startLabel="Start date"
        endLabel="End date"
        value={state}
        onChange={handleChange}
        startDateProps={{ minDate: "2025-07-01" }}
        endDateProps={{ minDate: startIso }}
      />
    </Box>
  );
}
```


### Date Format Override

**Render**

```tsx
() => (
  <Box display="flex" flexDirection="column" gap={4}>
    <StandardDateRangeWithState
      dateFormatOverride="d-M-yyyy"
      initialValue={["15-7-2025", "28-7-2025"]}
    />
    <Box>
      <CombinedDateRangeWithState
        label="Date range"
        dateFormatOverride="d-M-yyyy"
        initialValue={["15-7-2025", "28-7-2025"]}
      />
    </Box>
  </Box>
)
```


### Validation

**Render**

```tsx
() => (
  <Box display="flex" flexDirection="column" gap={2}>
    <StandardDateRangeWithState
      startError="Start date must be a weekday"
      endError="End date must be after the start date"
    />
    <StandardDateRangeWithState
      startWarning="Start date is in the past"
      endWarning="End date is a bank holiday"
    />
    <StandardDateRangeWithState
      startError="Start date must be a weekday"
      endWarning="End date is a bank holiday"
      validationMessagePositionTop={false}
    />
  </Box>
)
```


### Combined

**Render**

```tsx
() => (
  <Box>
    <CombinedDateRangeWithState
      label="Date range"
      inputHint="Select a start date and an end date"
    />
  </Box>
)
```


### Combined Validation

**Render**

```tsx
() => {
  const [state, setState] = useState(["15/07/2025", ""]);
  const [error, setError] = useState<string | undefined>("Select an end date");
  // The component shows no error itself: it reports a partial range on Apply, and the team sets `error`.
  const handleChange = (ev: DateRangeChangeEvent) => {
    const [start, end] = ev.target.value;
    setState([start.formattedValue, end.formattedValue]);

    if (start.rawValue && !end.rawValue) {
      setError("Select an end date");
    } else if (!start.rawValue && !end.rawValue) {
      setError("Select a date range");
    } else {
      setError(undefined);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <DateRange
        rangeType="combined"
        label="Date range"
        required
        value={state}
        onChange={handleChange}
        error={error}
      />
      <CombinedDateRangeWithState
        label="Date range"
        warning="Dates fall in different financial years"
      />
      <CombinedDateRangeWithState label="Date range" disabled />
    </Box>
  );
}
```


### Preset With Combined Custom Range

**Render**

```tsx
() => (
  <PresetForm
    selectId="period"
    initialPeriod=""
    renderCustomRange={({ customDates, setCustomDates, showErrors }) => (
      <Box>
        <DateRange
          rangeType="combined"
          id="custom-range"
          name="custom"
          label="Custom range"
          inputHint="Select a start date and an end date"
          required
          size="medium"
          value={customDates}
          onChange={(ev) => setCustomDates(toFormattedValues(ev))}
          error={
            showErrors && !(customDates[0] && customDates[1])
              ? "Select a start and end date"
              : undefined
          }
        />
      </Box>
    )}
  />
)
```


### Preset With Standard Custom Range

**Render**

```tsx
() => (
  <PresetForm
    selectId="period-standard"
    initialPeriod={CUSTOM_RANGE}
    renderCustomRange={({ customDates, setCustomDates, showErrors }) => (
      <DateRange
        id="custom-range-standard"
        name="custom"
        startLabel="Start date"
        endLabel="End date"
        required
        size="medium"
        value={customDates}
        onChange={(ev) => setCustomDates(toFormattedValues(ev))}
        startError={
          showErrors && !customDates[0] ? "Select a start date" : undefined
        }
        endError={
          showErrors && !customDates[1] ? "Select an end date" : undefined
        }
      />
    )}
  />
)
```


### In a Fieldset

**Render**

```tsx
() => (
  <Box display="flex" flexDirection="column" gap={4}>
    <Fieldset legend="Standard booking" size="large" required>
      <StandardDateRangeWithState />
    </Fieldset>
    <Box>
      <Fieldset legend="Combined booking" size="large" required>
        <CombinedDateRangeWithState label="Date range" />
      </Fieldset>
    </Box>
  </Box>
)
```


### In a Form

**Render**

```tsx
() => {
  const [submitted, setSubmitted] = useState<string[]>([]);

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        setSubmitted([
          `Standard: ${data.get("standard-start")} to ${data.get("standard-end")}`,
          `Combined: ${data.get("combined-start")} to ${data.get("combined-end")}`,
        ]);
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <StandardDateRangeWithState name="standard" />
        <Box>
          <CombinedDateRangeWithState label="Date range" name="combined" />
        </Box>
        <Box>
          <Button type="submit">Submit</Button>
        </Box>
        {submitted.map((line) => (
          <Box key={line}>{line}</Box>
        ))}
      </Box>
    </form>
  );
}
```

