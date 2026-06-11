```tsx
export const LegacyLabelHelp: Story = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      helpAriaLabel="This text provides more information for the label."
      label="With labelHelp"
      labelHelp="This text provides more information for the label."
      name="checkbox-labelHelp"
      onChange={(e) => setIsChecked(e.target.checked)}
      checked={isChecked}
    />
  );
};
```