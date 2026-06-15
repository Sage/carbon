```tsx
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