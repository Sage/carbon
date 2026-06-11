```tsx
export const WithFieldHelp: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  return (
    <>
      <Checkbox
        fieldHelp="This text provides help for the input."
        label="With fieldHelp"
        key="checkbox-fieldhelp"
        name="checkbox-fieldhelp"
        onChange={(e) => setIsChecked(e.target.checked)}
        checked={isChecked}
      />
      <Checkbox
        fieldHelp="This text provides help for the input."
        fieldHelpInline
        label="With inline fieldHelp"
        key="checkbox-fieldhelp-inline"
        name="checkbox-fieldhelp-inline"
        onChange={(e) => setIsChecked2(e.target.checked)}
        checked={isChecked2}
      />
    </>
  );
};
```