```tsx
export const LabelInline: Story = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Toggle notifications"
      labelInline
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const LabelInlineWithHint: Story = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Label"
      inputHint="Hint text"
      labelInline
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};
```