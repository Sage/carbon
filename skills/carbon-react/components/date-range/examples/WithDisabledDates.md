```tsx
export const WithDisabledDates: Story = () => {
  const [state, setState] = useState(["2019-03-17", "2019-04-17"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };

  const isWeekend = (day: Date) => [0, 6].includes(day.getDay());

  return (
    <DateRange
      startLabel="Start"
      endLabel="End"
      value={state}
      startDateProps={{
        pickerProps: {
          disabled: [
            isWeekend,
            {
              from: new Date(2019, 3, 1),
              to: new Date(2019, 3, 15),
            },
            { before: new Date(2019, 2, 15) },
            { after: new Date(2019, 4, 15) },
          ],
        },
      }}
      endDateProps={{
        minDate: "2019-04-15",
      }}
      onChange={handleChange}
    />
  );
};
```