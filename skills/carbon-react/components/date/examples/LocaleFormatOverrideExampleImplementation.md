```tsx
export const LocaleFormatOverrideExampleImplementation: Story = ({
  onChange,
  ...args
}: DateInputProps) => {
  const [stateKey, setStateKey] = useState("2019-04-05");
  const handleChangeKey = (ev: DateChangeEvent) => {
    setStateKey(ev.target.value.formattedValue);
  };

  const [stateProp, setStateProp] = useState("05/04/2019");
  const handleChangeProp = (ev: DateChangeEvent) => {
    setStateProp(ev.target.value.formattedValue);
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
            dateFormatOverride: "yyyy-MM-dd",
          },
        }}
      >
        <DateInput
          {...args}
          label="With dateFormatOverride translation key"
          value={stateKey}
          onChange={(ev) => {
            handleChangeKey(ev);
            onChange?.(ev);
          }}
          mb={2}
        />

        <DateInput
          {...args}
          label="With dateFormatOverride prop"
          value={stateProp}
          onChange={(ev) => {
            handleChangeProp(ev);
            onChange?.(ev);
          }}
          dateFormatOverride="dd/MM/yyyy"
        />
      </I18nProvider>
    </Box>
  );
};
```