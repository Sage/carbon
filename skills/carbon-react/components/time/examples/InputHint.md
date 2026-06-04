```tsx
export const InputHint: Story = () => {
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
};
```