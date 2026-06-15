```tsx
export const LoadingCustomLabel: Story = () => (
  <Switch
    label="Toggle notifications"
    checked={false}
    loading
    processingLabel="Saving changes..."
    onChange={() => {}}
  />
);
```