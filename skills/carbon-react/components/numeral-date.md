---
name: carbon-component-numeral-date
description: Carbon NumeralDate component props and usage examples.
---

# NumeralDate

## Import

`import NumeralDate from "carbon-react/lib/components/numeral-date";`

## Source

- Export: `./components/numeral-date`
- Props interface: `NumeralDateProps`

## Props

| Name                         | Type                                                                                                                                                                                      | Required | Literals | Deprecated | Deprecation reason                                                                                                                                                                                                                         | Description                                                                                                           | Default |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------- |
| onChange                     | (ev: NumeralDateEvent) => void                                                                                                                                                            | Yes      |          |            |                                                                                                                                                                                                                                            | Change event handler                                                                                                  |         |
| value                        | NumeralDateValue                                                                                                                                                                          | Yes      |          |            |                                                                                                                                                                                                                                            | Value                                                                                                                 |         |
| dateFormat                   | readonly ["dd", "mm", "yyyy"] \| readonly ["mm", "dd", "yyyy"] \| readonly ["yyyy", "mm", "dd"] \| readonly ["dd", "mm"] \| readonly ["mm", "dd"] \| readonly ["mm", "yyyy"] \| undefined | No       |          |            |                                                                                                                                                                                                                                            |                                                                                                                       |         |
| dayRef                       | React.ForwardedRef<HTMLInputElement> \| undefined                                                                                                                                         | No       |          |            |                                                                                                                                                                                                                                            | A React ref to pass to the input corresponding to the day                                                             |         |
| disabled                     | boolean \| undefined                                                                                                                                                                      | No       |          |            |                                                                                                                                                                                                                                            | If true, the component will be disabled                                                                               |         |
| enableInternalError          | boolean \| undefined                                                                                                                                                                      | No       |          |            |                                                                                                                                                                                                                                            | When true, enables the internal errors to be displayed                                                                |         |
| enableInternalWarning        | boolean \| undefined                                                                                                                                                                      | No       |          |            |                                                                                                                                                                                                                                            | When true, enables the internal warnings to be displayed                                                              |         |
| error                        | string \| boolean \| undefined                                                                                                                                                            | No       |          |            |                                                                                                                                                                                                                                            | Indicate that error has occurred.                                                                                     |         |
| id                           | string \| undefined                                                                                                                                                                       | No       |          |            |                                                                                                                                                                                                                                            | `id` for events                                                                                                       |         |
| inputIds                     | DateInputIds \| undefined                                                                                                                                                                 | No       |          |            |                                                                                                                                                                                                                                            | Allow consumers to set IDs for each of the field inputs                                                               |         |
| legend                       | string \| undefined                                                                                                                                                                       | No       |          |            |                                                                                                                                                                                                                                            | The content for the component's legend                                                                                |         |
| legendHint                   | string \| undefined                                                                                                                                                                       | No       |          |            |                                                                                                                                                                                                                                            | Content for the hint text below the legend.                                                                           |         |
| m                            | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on top, left, bottom and right                                                                                 |         |
| margin                       | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on top, left, bottom and right                                                                                 |         |
| marginBottom                 | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on bottom                                                                                                      |         |
| marginLeft                   | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on left                                                                                                        |         |
| marginRight                  | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on right                                                                                                       |         |
| marginTop                    | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on top                                                                                                         |         |
| marginX                      | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on left and right                                                                                              |         |
| marginY                      | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on top and bottom                                                                                              |         |
| mb                           | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on bottom                                                                                                      |         |
| ml                           | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on left                                                                                                        |         |
| monthRef                     | React.ForwardedRef<HTMLInputElement> \| undefined                                                                                                                                         | No       |          |            |                                                                                                                                                                                                                                            | A React ref to pass to the input corresponding to the month                                                           |         |
| mr                           | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on right                                                                                                       |         |
| mt                           | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on top                                                                                                         |         |
| mx                           | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on left and right                                                                                              |         |
| my                           | ResponsiveValue<TVal, ThemeType> \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Margin on top and bottom                                                                                              |         |
| name                         | string \| undefined                                                                                                                                                                       | No       |          |            |                                                                                                                                                                                                                                            | `name` for events                                                                                                     |         |
| onBlur                       | ((ev: NumeralDateEvent) => void) \| undefined                                                                                                                                             | No       |          |            |                                                                                                                                                                                                                                            | Blur event handler                                                                                                    |         |
| readOnly                     | boolean \| undefined                                                                                                                                                                      | No       |          |            |                                                                                                                                                                                                                                            | If true, the component will be read-only                                                                              |         |
| required                     | boolean \| undefined                                                                                                                                                                      | No       |          |            |                                                                                                                                                                                                                                            | Flag to configure component as mandatory                                                                              |         |
| size                         | "small" \| "medium" \| "large" \| undefined                                                                                                                                               | No       |          |            |                                                                                                                                                                                                                                            | Size of an input                                                                                                      |         |
| validationMessagePositionTop | boolean \| undefined                                                                                                                                                                      | No       |          |            |                                                                                                                                                                                                                                            | Render the ValidationMessage above the NumeralDate inputs when validationRedesignOptIn flag is set                    |         |
| yearRef                      | React.ForwardedRef<HTMLInputElement> \| undefined                                                                                                                                         | No       |          |            |                                                                                                                                                                                                                                            | A React ref to pass to the input corresponding to the year                                                            |         |
| data-element                 | string \| undefined                                                                                                                                                                       | No       |          |            |                                                                                                                                                                                                                                            | Identifier used for testing purposes, applied to the root element of the component.                                   |         |
| data-role                    | string \| undefined                                                                                                                                                                       | No       |          |            |                                                                                                                                                                                                                                            | Identifier used for testing purposes, applied to the root element of the component.                                   |         |
| adaptiveLabelBreakpoint      | number \| undefined                                                                                                                                                                       | No       |          | Yes        | `adaptiveLabelBreakpoint` has been deprecated. It is recommended to use `useMediaQuery` hook to implement adaptive behaviour. Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set |                                                                                                                       |         |
| fieldHelp                    | React.ReactNode                                                                                                                                                                           | No       |          | Yes        | The `fieldHelp` prop is deprecated and will be removed in a future release. Please use the `legendHint` prop instead.                                                                                                                      | [Legacy] Help content to be displayed under an input                                                                  |         |
| fieldLabelsAlign             | "left" \| "right" \| undefined                                                                                                                                                            | No       |          | Yes        | Custom field help alignment is no longer supported on this component.                                                                                                                                                                      | Field labels alignment                                                                                                |         |
| helpAriaLabel                | string \| undefined                                                                                                                                                                       | No       |          | Yes        | Custom help component ARIA labelling is no longer supported on this component,                                                                                                                                                             | [Legacy] Aria label for rendered help component                                                                       |         |
| info                         | string \| boolean \| undefined                                                                                                                                                            | No       |          | Yes        | Information validation is no longer supported on this component.                                                                                                                                                                           | [Legacy] Indicate additional information.                                                                             |         |
| label                        | string \| undefined                                                                                                                                                                       | No       |          | Yes        | The `label` prop is deprecated and will be removed in a future release. Please use the `legend` prop instead.                                                                                                                              | [Legacy] The content for the component's label                                                                        |         |
| labelAlign                   | "left" \| "right" \| undefined                                                                                                                                                            | No       |          | Yes        | Custom label alignment is no longer supported on this component.                                                                                                                                                                           | [Legacy] Text alignment of label                                                                                      |         |
| labelHelp                    | React.ReactNode                                                                                                                                                                           | No       |          | Yes        | The `labelHelp` prop is deprecated and will be removed in a future release.                                                                                                                                                                | [Legacy] Text applied to label help tooltip, will be rendered as hint text when `validationRedesignOptIn` is true.    |         |
| labelInline                  | boolean \| undefined                                                                                                                                                                      | No       |          | Yes        | Inline labels are no longer supported on this component.                                                                                                                                                                                   | [Legacy] When true, label is placed in line with an input                                                             |         |
| labelSpacing                 | 1 \| 2 \| undefined                                                                                                                                                                       | No       |          | Yes        | Custom label spacing is no longer supported on this component                                                                                                                                                                              | [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) |         |
| labelWidth                   | number \| undefined                                                                                                                                                                       | No       |          | Yes        | Custom label widths are no longer supported on this component.                                                                                                                                                                             | [Legacy] Label width                                                                                                  |         |
| tooltipPosition              | "left" \| "right" \| "bottom" \| "top" \| undefined                                                                                                                                       | No       |          | Yes        | Tooltips ar no longer supported on this component.                                                                                                                                                                                         | [Legacy] Overrides the default tooltip position                                                                       |         |
| validationOnLabel            | boolean \| undefined                                                                                                                                                                      | No       |          | Yes        | Custom validation icon placement is no longer supported on this component.                                                                                                                                                                 | [Legacy] When true, validation icons will be placed on labels instead of being placed on the inputs                   |         |
| warning                      | string \| boolean \| undefined                                                                                                                                                            | No       |          | Yes        | Warning validation is deprecated and will be removed in a future release.                                                                                                                                                                  | [Legacy] Indicate warning information.                                                                                |         |

## Examples

### Default

**Render**

```tsx
() => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });
  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      legend="Date of Birth"
    />
  );
};
```

### Read-only

**Render**

```tsx
() => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });
  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      legend="Date of Birth"
      readOnly
    />
  );
};
```

### Disabled

**Render**

```tsx
() => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });
  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      legend="Date of Birth"
      disabled
    />
  );
};
```

### Read-only

**Render**

```tsx
() => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });
  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      legend="Date of Birth"
      readOnly
    />
  );
};
```

### Disabled

**Render**

```tsx
() => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });
  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      legend="Date of Birth"
      disabled
    />
  );
};
```

### With Input Hint

**Render**

```tsx
() => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });

  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      legend="Date of Birth"
      legendHint="For example, 25 10 1998"
    />
  );
};
```

### Allowed Date Formats

**Render**

```tsx
() => {
  const dateDefault = {
    dd: "",
    mm: "",
    yyyy: "",
  };
  const [value, setValue] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value2, setValue2] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value3, setValue3] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value4, setValue4] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value5, setValue5] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value6, setValue6] = useState<NumeralDateProps["value"]>(dateDefault);

  return (
    <>
      <NumeralDate
        legend="DD/MM/YYYY - default"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        legend="MM/DD/YYYY"
        dateFormat={["mm", "dd", "yyyy"]}
        mb={2}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
      <NumeralDate
        legend="YYYY/MM/DD"
        dateFormat={["yyyy", "mm", "dd"]}
        mb={2}
        value={value3}
        onChange={(e) => setValue3(e.target.value)}
      />
      <NumeralDate
        legend="DD/MM"
        dateFormat={["dd", "mm"]}
        mb={2}
        value={value4}
        onChange={(e) => setValue4(e.target.value)}
      />
      <NumeralDate
        legend="MM/DD"
        dateFormat={["mm", "dd"]}
        mb={2}
        value={value5}
        onChange={(e) => setValue5(e.target.value)}
      />
      <NumeralDate
        legend="MM/YYYY"
        dateFormat={["mm", "yyyy"]}
        mb={2}
        value={value6}
        onChange={(e) => setValue6(e.target.value)}
      />
    </>
  );
};
```

### Internal Validation Error

**Render**

```tsx
() => {
  const [valueNew, setValueNew] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "13",
    yyyy: "1999",
  });
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
      <NumeralDate
        enableInternalError
        legend="Default - new validation (top)"
        onChange={(e) => setValueNew(e.target.value)}
        value={valueNew}
      />
      <NumeralDate
        validationMessagePositionTop={false}
        enableInternalError
        legend="Default - new validation (bottom)"
        onChange={(e) => setValueNew(e.target.value)}
        value={valueNew}
      />
    </Box>
  );
};
```

### Size

**Render**

```tsx
() => {
  const dateDefault = {
    dd: "",
    mm: "",
    yyyy: "",
  };
  const [value, setValue] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value2, setValue2] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value3, setValue3] = useState<NumeralDateProps["value"]>(dateDefault);

  return (
    <>
      <NumeralDate
        legend="Small"
        dateFormat={["dd", "mm", "yyyy"]}
        size="small"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        legend="Medium"
        dateFormat={["dd", "mm", "yyyy"]}
        size="medium"
        mb={2}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
      <NumeralDate
        legend="Large"
        dateFormat={["dd", "mm", "yyyy"]}
        size="large"
        value={value3}
        onChange={(e) => setValue3(e.target.value)}
      />
    </>
  );
};
```

### Required

**Render**

```tsx
() => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  return (
    <NumeralDate
      name="date-of-birth"
      legend="Date of Birth"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      required
    />
  );
};
```

### Programmatic Focus

**Render**

```tsx
() => {
  const ndRef = React.useRef<NumeralDateHandle>(null);
  const [dateValue, setDateValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  const handleChange: NumeralDateProps["onChange"] = (event) => {
    setDateValue(event.target.value);
  };
  const handleClick = () => {
    ndRef.current?.focus();
  };
  return (
    <>
      <Button mb={2} onClick={handleClick}>
        Click me to focus NumeralDate
      </Button>
      <NumeralDate
        ref={ndRef}
        onChange={handleChange}
        legend="Numeral date"
        value={dateValue}
        name="numeralDate_name"
        id="numeralDate_id"
      />
    </>
  );
};
```

### With Custom Field IDs

**Render**

```tsx
() => {
  const [dateValue, setDateValue] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "02",
    yyyy: "2020",
  });
  const handleChange: NumeralDateProps["onChange"] = (event) => {
    setDateValue(event.target.value);
  };
  return (
    <NumeralDate
      value={dateValue}
      onChange={handleChange}
      legend="Default"
      inputIds={{
        day: "date-field-custom-id",
        month: "month-field-custom-id",
        year: "year-field-custom-id",
      }}
    />
  );
};
```
