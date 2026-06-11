```tsx
export const Required: Story = () => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  return (
    <NumeralDate
      name="date-of-birth"
      label="Date of Birth"
      labelWidth={30}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      required
    />
  );
};
```