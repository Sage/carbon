```tsx
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