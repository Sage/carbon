```tsx
export const Required: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return <DateInput label="Date" value={state} onChange={setValue} required />;
};
```