```tsx
export const Checked: Story = () => {
  const [checked, setChecked] = useState(true);
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