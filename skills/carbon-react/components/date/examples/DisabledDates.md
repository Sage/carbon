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
```