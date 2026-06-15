```tsx
export const Disabled: Story = () => (
  <Switch
    label="Toggle notifications"
    inputHint="Hint text"
    checked={false}
    disabled
    onChange={() => {}}
  />
);
```