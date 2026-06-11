```tsx
export const Reversed: Story = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      label="Reversed checkbox"
      name="checkbox-reverse"
      reverse
      onChange={(e) => setIsChecked(e.target.checked)}
      checked={isChecked}
    />
  );
};
```