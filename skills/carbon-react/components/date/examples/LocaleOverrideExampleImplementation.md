```tsx
export const LocaleOverrideExampleImplementation: Story = () => {
  const [state, setState] = useState("2022-04-05");
  const handleChange = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  const [state2, setState2] = useState("2022-04-05");
  const handleChange2 = (ev: DateChangeEvent) => {
    setState2(ev.target.value.formattedValue);
  };
  return (
    <Box display="flex" justifyContent="space-around">
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: {
            dateFnsLocale: () => de,
            ariaLabels: {
              previousMonthButton: () => "Vorheriger Monat",
              nextMonthButton: () => "Nächster Monat",
            },
          },
        }}
      >
        <DateInput
          label="Date `DE` locale"
          value={state}
          onChange={handleChange}
        />
      </I18nProvider>
      <I18nProvider
        locale={{
          locale: () => "zh-CN",
          date: {
            dateFnsLocale: () => zhCN,
            ariaLabels: {
              previousMonthButton: () => "上个月",
              nextMonthButton: () => "下个月",
            },
          },
        }}
      >
        <DateInput
          label="Date `zh-CN` locale"
          value={state2}
          onChange={handleChange2}
        />
      </I18nProvider>
    </Box>
  );
};
```