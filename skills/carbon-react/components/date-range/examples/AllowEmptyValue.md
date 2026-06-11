```tsx
export const AllowEmptyValue: Story = () => {
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
};
```