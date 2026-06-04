```tsx
export const LargeSize: Story = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      inputHint="Hint text"
      size="large"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};
```