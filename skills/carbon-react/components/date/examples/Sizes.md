```tsx
export const Sizes: Story = () => {
  const [state, setState] = useState("01/10/2016");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <>
      {(["small", "medium", "large"] as const).map((size) => (
        <DateInput
          key={`Date - ${size}`}
          label={`Date - ${size}`}
          value={state}
          onChange={setValue}
          size={size}
          mb={2}
        />
      ))}
    </>
  );
};
```