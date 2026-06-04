```tsx
export const LocaleOverrideExampleImplementation: Story = () => {
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);
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
          locale: () => "fr-FR",
          date: {
            dateFnsLocale: () => fr,
            ariaLabels: {
              previousMonthButton: () => "Mois précédent",
              nextMonthButton: () => "Mois prochain",
            },
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