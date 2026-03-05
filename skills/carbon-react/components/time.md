---
name: carbon-component-time
description: Carbon Time component props and usage examples.
---

# Time

## Import
`import { Time } from "carbon-sage/lib/components/time";`

## Source
- Export: `./components/time`
- Props interface: `TimeProps`

## Props
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
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| minutesInputProps | TimeInputProps \| undefined | No |  | Set custom `data-` and `id` attributes on the input element. Set the `label` and `aria-label` values for the associated Label element. Set the `error` and `warning` states for the input |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| name | string \| undefined | No |  | Set a name value on the component |  |
| onBlur | ((ev?: React.FocusEvent<HTMLInputElement>, value?: TimeValue) => void) \| undefined | No |  | Callback called when focus is lost on input elements |  |
| readOnly | boolean \| undefined | No |  | If true, the component will be read-only |  |
| required | boolean \| undefined | No |  | Flag to configure component as mandatory |  |
| size | Sizes \| undefined | No |  | Sets the size of the inputs |  |
| toggleProps | ToggleDataProps \| undefined | No |  | Set custom data- attributes on the toggle elements |  |
| validationMessagePositionTop | boolean \| undefined | No |  | Render the ValidationMessage above the Time inputs |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
({ ...args }) => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time value={value} onChange={handleChange} label="Time" {...args} />
    </Box>
  );
}
```


### AM/PM Toggle

**Render**

```tsx
({ ...args }) => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time value={value} onChange={handleChange} label="Time" {...args} />
    </Box>
  );
}
```


### Input Hint

**Render**

```tsx
() => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time
        value={value}
        onChange={handleChange}
        label="Time"
        inputHint="Hint text"
      />
    </Box>
  );
}
```


### Required

**Render**

```tsx
() => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time required value={value} onChange={handleChange} label="Time" />
    </Box>
  );
}
```


### Disabled

**Render**

```tsx
() => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time
        value={value}
        onChange={handleChange}
        label="Time"
        inputHint="Hint text"
        disabled
      />
    </Box>
  );
}
```


### Read Only

**Render**

```tsx
() => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time
        value={value}
        onChange={handleChange}
        label="Time"
        inputHint="Hint text"
        readOnly
      />
    </Box>
  );
}
```


### Sizes

**Render**

```tsx
() => {
  const [value, setValue] = useState<{
    small: TimeValue;
    medium: TimeValue;
    large: TimeValue;
  }>({
    small: {
      hours: "",
      minutes: "",
      period: "AM",
    },
    medium: {
      hours: "",
      minutes: "",
      period: "AM",
    },
    large: {
      hours: "",
      minutes: "",
      period: "AM",
    },
  });

  const handleChange = (
    ev: TimeInputEvent,
    size: "small" | "medium" | "large",
  ) => {
    setValue((p) => ({
      ...p,
      [size]: ev.target.value,
    }));
  };

  return (
    <Box p={2}>
      <Time
        size="small"
        value={value.small}
        onChange={(ev) => handleChange(ev, "small")}
        label="Time - small"
        inputHint="Hint text"
        mb={1}
      />
      <Time
        size="medium"
        value={value.medium}
        onChange={(ev) => handleChange(ev, "medium")}
        label="Time - medium"
        inputHint="Hint text"
        mb={1}
      />
      <Time
        size="large"
        value={value.large}
        onChange={(ev) => handleChange(ev, "large")}
        label="Time - large"
        inputHint="Hint text"
        mb={1}
      />
    </Box>
  );
}
```


### Focusing Inputs Programmatically

**Render**

```tsx
() => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const ref = useRef<TimeHandle>(null);

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Button mr={1} onClick={() => ref.current?.focusHoursInput()}>
        Focus hours input
      </Button>
      <Button onClick={() => ref.current?.focusMinutesInput()}>
        Focus minutes input
      </Button>
      <Time
        ref={ref}
        value={value}
        onChange={handleChange}
        label="Time"
        inputHint="Hint text"
      />
    </Box>
  );
}
```


### Locale Override

**Render**

```tsx
() => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <I18nProvider
        locale={{
          time: {
            amText: () => "A",
            pmText: () => "P",
            hoursLabelText: () => "Hours",
            minutesLabelText: () => "Minutes",
            hoursAriaLabelText: () => "Hours input",
            minutesAriaLabelText: () => "Minutes input",
          },
        }}
      >
        <Time value={value} onChange={handleChange} label="Time" />
      </I18nProvider>
    </Box>
  );
}
```

