```tsx
export const Required: Story = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      label="Checkbox"
      name="checkbox-required"
      required
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};
```