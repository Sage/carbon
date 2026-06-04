```tsx
export const WithInputHint: Story = () => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });

  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="With label help"
      labelHelp="Label help"
    />
  );
};
```