```tsx
export const LabelsInline: Story = () => {
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
};
```