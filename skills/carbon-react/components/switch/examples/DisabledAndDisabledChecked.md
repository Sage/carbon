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

export const DisabledChecked: Story = () => (
  <Switch
    label="Toggle notifications"
    checked
    disabled
    inputHint="Hint text"
    onChange={() => {}}
  />
);
```