```tsx
export const AmPmToggle: Story = ({ ...args }) => {
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
      <Time value={value} onChange={handleChange} label="Time" {...args} />
    </Box>
  );
};
```