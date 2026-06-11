```tsx
export const FocusingInputs: Story = () => {
  const [value, setValue] = useState<TimeValue>({
    hours: "",
    minutes: "",
  });

  const ref = useRef<TimeHandle>(null);

  const handleChange = (ev: TimeInputEvent) => {
    setValue(ev.target.value);
  };

  return (
    <Box p={2}>
      <Button mr={1} onClick={() => ref.current?.focusHoursInput()}>
        Focus hours input
      </Button>
      <Button onClick={() => ref.current?.focusMinutesInput()}>
        Focus minutes input
      </Button>
      <Time
        ref={ref}
        value={value}
        onChange={handleChange}
        label="Time"
        inputHint="Hint text"
      />
    </Box>
  );
};
```