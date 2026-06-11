```tsx
export const Default: Story = () => {
  const [state, setState] = useState("04/04/2019");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      label="Date"
      name="date-input"
      value={state}
      onChange={setValue}
    />
  );
};
```