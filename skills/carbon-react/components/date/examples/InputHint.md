```tsx
export const InputHint: Story = () => {
  const [state, setState] = useState("04/04/2019");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      label="Date"
      inputHint="Hint text"
      name="date-input"
      value={state}
      onChange={setValue}
    />
  );
};
```