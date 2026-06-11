```tsx
export const Sizes: Story = () => {
  const [value, setValue] = useState<{
    small: TimeValue;
    medium: TimeValue;
    large: TimeValue;
  }>({
    small: {
      hours: "",
      minutes: "",
      period: "AM",
    },
    medium: {
      hours: "",
      minutes: "",
      period: "AM",
    },
    large: {
      hours: "",
      minutes: "",
      period: "AM",
    },
  });

  const handleChange = (
    ev: TimeInputEvent,
    size: "small" | "medium" | "large",
  ) => {
    setValue((p) => ({
      ...p,
      [size]: ev.target.value,
    }));
  };

  return (
    <Box p={2}>
      <Time
        size="small"
        value={value.small}
        onChange={(ev) => handleChange(ev, "small")}
        label="Time - small"
        inputHint="Hint text"
        mb={1}
      />
      <Time
        size="medium"
        value={value.medium}
        onChange={(ev) => handleChange(ev, "medium")}
        label="Time - medium"
        inputHint="Hint text"
        mb={1}
      />
      <Time
        size="large"
        value={value.large}
        onChange={(ev) => handleChange(ev, "large")}
        label="Time - large"
        inputHint="Hint text"
        mb={1}
      />
    </Box>
  );
};
```