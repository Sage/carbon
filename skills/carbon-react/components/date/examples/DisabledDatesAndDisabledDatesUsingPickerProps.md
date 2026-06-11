```tsx
export const DisabledDates: Story = ({ onChange, ...args }: DateInputProps) => {
  const [state, setState] = useState("04/04/2019");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      {...args}
      label="Date"
      name="date-input"
      value={state}
      minDate="2019-04-04"
      maxDate="2019-05-31"
      onChange={(ev) => {
        setValue(ev);
        onChange?.(ev);
      }}
    />
  );
};

export const DisabledDatesUsingPickerProps: Story = () => {
  const [state, setState] = useState("04/04/2019");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };

  const isWeekend = (day: Date) => [0, 6].includes(day.getDay());

  return (
    <DateInput
      label="Date"
      name="date-input"
      value={state}
      onChange={setValue}
      pickerProps={{
        disabled: [
          isWeekend,
          {
            from: new Date(2019, 3, 1),
            to: new Date(2019, 3, 15),
          },
          { before: new Date(2019, 2, 15) },
          { after: new Date(2019, 4, 15) },
        ],
      }}
    />
  );
};
```