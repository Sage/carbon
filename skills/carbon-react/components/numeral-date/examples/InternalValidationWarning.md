```tsx
export const InternalValidationWarning: Story = () => {
  const [valueNew, setValueNew] = useState<NumeralDateProps["value"]>({
    dd: "01",
    mm: "13",
    yyyy: "1999",
  });
  return (
    <NumeralDate
      enableInternalWarning
      label="Default - new validation"
      onChange={(e) => setValueNew(e.target.value)}
      value={valueNew}
    />
  );
};
```