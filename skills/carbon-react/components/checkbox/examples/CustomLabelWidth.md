```tsx
export const CustomLabelWidth: Story = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      label="With custom labelWidth"
      labelWidth={100}
      name="checkbox-custom-label"
      onChange={(e) => setIsChecked(e.target.checked)}
      checked={isChecked}
    />
  );
};
```