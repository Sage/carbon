```tsx
export const Disabled: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
    period: "AM",
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
        disabled
      />
    </Box>
  );
};
```