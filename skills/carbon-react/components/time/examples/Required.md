```tsx
export const Required: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Time required value={value} onChange={handleChange} label="Time" />
    </Box>
  );
};
```