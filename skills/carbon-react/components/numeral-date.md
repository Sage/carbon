---
name: carbon-component-numeral-date
description: Carbon NumeralDate component props and usage examples.
---

# NumeralDate

## Import
`import NumeralDate from "carbon-sage/lib/components/numeral-date";`

## Source
- Export: `./components/numeral-date`
- Props interface: `NumeralDateProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| onChange | (ev: NumeralDateEvent) => void | Yes |  | Change event handler |  |
| value | NumeralDateValue | Yes |  | Value |  |
| adaptiveLabelBreakpoint | number \| undefined | No |  | Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set |  |
| dateFormat | readonly ["dd", "mm", "yyyy"] \| readonly ["mm", "dd", "yyyy"] \| readonly ["yyyy", "mm", "dd"] \| readonly ["dd", "mm"] \| readonly ["mm", "dd"] \| readonly ["mm", "yyyy"] \| undefined | No |  |  |  |
| dayRef | React.ForwardedRef<HTMLInputElement> \| undefined | No |  | A React ref to pass to the input corresponding to the day |  |
| disabled | boolean \| undefined | No |  | If true, the component will be disabled |  |
| enableInternalError | boolean \| undefined | No |  | When true, enables the internal errors to be displayed |  |
| enableInternalWarning | boolean \| undefined | No |  | When true, enables the internal warnings to be displayed |  |
| error | string \| boolean \| undefined | No |  | Indicate that error has occurred. |  |
| fieldHelp | React.ReactNode | No |  | [Legacy] Help content to be displayed under an input |  |
| fieldLabelsAlign | "left" \| "right" \| undefined | No |  | Field labels alignment |  |
| helpAriaLabel | string \| undefined | No |  | [Legacy] Aria label for rendered help component |  |
| id | string \| undefined | No |  | `id` for events |  |
| info | string \| boolean \| undefined | No |  | [Legacy] Indicate additional information. |  |
| inputIds | DateInputIds \| undefined | No |  | Allow consumers to set IDs for each of the field inputs |  |
| label | string \| undefined | No |  | Label |  |
| labelAlign | "left" \| "right" \| undefined | No |  | Label alignment |  |
| labelHelp | React.ReactNode | No |  | Text applied to label help tooltip, will be rendered as hint text when `validationRedesignOptIn` is true. |  |
| labelInline | boolean \| undefined | No |  | [Legacy] When true, label is placed in line with an input |  |
| labelSpacing | 1 \| 2 \| undefined | No |  | [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) |  |
| labelWidth | number \| undefined | No |  | [Legacy] Label width |  |
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
| monthRef | React.ForwardedRef<HTMLInputElement> \| undefined | No |  | A React ref to pass to the input corresponding to the month |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| name | string \| undefined | No |  | `name` for events |  |
| onBlur | ((ev: NumeralDateEvent) => void) \| undefined | No |  | Blur event handler |  |
| readOnly | boolean \| undefined | No |  | If true, the component will be read-only |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  | Size of an input |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | [Legacy] Overrides the default tooltip position |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Render the ValidationMessage above the NumeralDate inputs when validationRedesignOptIn flag is set |  |
| validationOnLabel | boolean \| undefined | No |  | [Legacy] When true, validation icons will be placed on labels instead of being placed on the inputs |  |
| warning | string \| boolean \| undefined | No |  | Indicate that warning has occurred. |  |
| yearRef | React.ForwardedRef<HTMLInputElement> \| undefined | No |  | A React ref to pass to the input corresponding to the year |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

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
      label="Default"
    />
  );
}
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
    <CarbonProvider validationRedesignOptIn>
      <NumeralDate
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="With label help"
        labelHelp="Label help"
      />
    </CarbonProvider>
  );
}
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
        label="DD/MM/YYYY - default"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        label="MM/DD/YYYY"
        dateFormat={["mm", "dd", "yyyy"]}
        mb={2}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
      <NumeralDate
        label="YYYY/MM/DD"
        dateFormat={["yyyy", "mm", "dd"]}
        mb={2}
        value={value3}
        onChange={(e) => setValue3(e.target.value)}
      />
      <NumeralDate
        label="DD/MM"
        dateFormat={["dd", "mm"]}
        mb={2}
        value={value4}
        onChange={(e) => setValue4(e.target.value)}
      />
      <NumeralDate
        label="MM/DD"
        dateFormat={["mm", "dd"]}
        mb={2}
        value={value5}
        onChange={(e) => setValue5(e.target.value)}
      />
      <NumeralDate
        label="MM/YYYY"
        dateFormat={["mm", "yyyy"]}
        mb={2}
        value={value6}
        onChange={(e) => setValue6(e.target.value)}
      />
    </>
  );
}
```


### Internal Validation Error

**Render**

```tsx
() => {
  const [valueOld, setValueOld] = useState<NumeralDateProps["value"]>({
    dd: "33",
    mm: "01",
    yyyy: "1999",
  });
  const [valueNew, setValueNew] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "13",
    yyyy: "1999",
  });
  return (
    <>
      <NumeralDate
        enableInternalError
        onChange={(e) => setValueOld(e.target.value)}
        label="Default - legacy validation"
        value={valueOld}
      />
      <br />
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          enableInternalError
          label="Default - new validation"
          onChange={(e) => setValueNew(e.target.value)}
          value={valueNew}
        />
      </CarbonProvider>
    </>
  );
}
```


### Internal Validation Warning

**Render**

```tsx
() => {
  const [valueOld, setValueOld] = useState<NumeralDateProps["value"]>({
    dd: "33",
    mm: "01",
    yyyy: "1999",
  });
  const [valueNew, setValueNew] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "13",
    yyyy: "1999",
  });
  return (
    <>
      <NumeralDate
        enableInternalWarning
        label="Default - legacy validation"
        onChange={(e) => setValueOld(e.target.value)}
        value={valueOld}
      />
      <br />
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          enableInternalWarning
          label="Default - new validation"
          onChange={(e) => setValueNew(e.target.value)}
          value={valueNew}
        />
      </CarbonProvider>
    </>
  );
}
```


### Inline Label

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
      label="Inline"
      labelInline
      labelAlign="right"
      labelWidth={30}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```


### Enabling Adaptive Behaviour

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
      adaptiveLabelBreakpoint={960}
      label="Adaptive behaviour"
      labelInline
      labelAlign="right"
      labelWidth={30}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```


### With Label Help

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
      helpAriaLabel="Label help"
      label="With label help"
      labelHelp="Label help"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```


### With Field Help

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
      label="With field help"
      fieldHelp="Field help"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
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
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="small"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="medium"
        mb={2}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
      <NumeralDate
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="large"
        value={value3}
        onChange={(e) => setValue3(e.target.value)}
      />
    </>
  );
}
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
      label="Date of Birth"
      labelWidth={30}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      required
    />
  );
}
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
        label="Numeral date"
        value={dateValue}
        name="numeralDate_name"
        id="numeralDate_id"
      />
    </>
  );
}
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
      label="Default"
      inputIds={{
        day: "date-field-custom-id",
        month: "month-field-custom-id",
        year: "year-field-custom-id",
      }}
    />
  );
}
```

