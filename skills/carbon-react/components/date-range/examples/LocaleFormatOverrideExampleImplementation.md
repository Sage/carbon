```tsx
export const LocaleFormatOverrideExampleImplementation: Story = ({
  ...args
}) => {
  const [state, setState] = useState(["2016-10-01", "2016-10-30"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };

  return (
    <div>
      <I18nProvider
        locale={{
          locale: () => "de-DE",
          date: {
            dateFnsLocale: () => de,
            ariaLabels: {
              previousMonthButton: () => "Vorheriger Monat",
              nextMonthButton: () => "Nächster Monat",
            },
            dateFormatOverride: args.dateFormatOverride || "dd-MM-yyyy",
          },
        }}
      >
        <DateRange
          startLabel="Start"
          endLabel="End"
          value={state}
          onChange={handleChange}
        />
      </I18nProvider>
    </div>
  );
};
```