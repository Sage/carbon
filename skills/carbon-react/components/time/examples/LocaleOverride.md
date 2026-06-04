```tsx
export const LocaleOverride: Story = () => {
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
      <I18nProvider
        locale={{
          time: {
            amText: () => "A",
            pmText: () => "P",
            hoursLabelText: () => "Hours",
            minutesLabelText: () => "Minutes",
            hoursAriaLabelText: () => "Hours input",
            minutesAriaLabelText: () => "Minutes input",
          },
        }}
      >
        <Time value={value} onChange={handleChange} label="Time" />
      </I18nProvider>
    </Box>
  );
};
```