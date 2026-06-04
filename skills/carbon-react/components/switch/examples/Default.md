```tsx
export const Default: Story = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      inputHint="Hint text"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};
```