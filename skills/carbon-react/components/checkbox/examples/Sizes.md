```tsx
export const Sizes: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  return (
    <>
      <Checkbox
        mb={2}
        label="Small"
        key="checkbox-small"
        name="checkbox-small"
        size="small"
        onChange={(e) => setIsChecked(e.target.checked)}
        checked={isChecked}
      />
      <Checkbox
        label="Large"
        key="checkbox-large"
        name="checkbox-large"
        size="large"
        onChange={(e) => setIsChecked2(e.target.checked)}
        checked={isChecked2}
      />
    </>
  );
};
```