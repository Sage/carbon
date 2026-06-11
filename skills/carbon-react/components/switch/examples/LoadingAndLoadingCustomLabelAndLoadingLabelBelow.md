```tsx
export const Loading: Story = () => (
  <>
    <Switch
      label="Toggle notifications"
      checked={false}
      loading
      onChange={() => {}}
    />

    <Switch
      label="Toggle notifications"
      checked
      loading
      onChange={() => {}}
      ml="8px"
    />

    <Switch
      size="large"
      label="Toggle notifications"
      checked={false}
      loading
      onChange={() => {}}
      ml="8px"
    />

    <Switch
      size="large"
      label="Toggle notifications"
      checked
      loading
      onChange={() => {}}
      ml="8px"
    />
  </>
);

export const LoadingCustomLabel: Story = () => (
  <Switch
    label="Toggle notifications"
    checked={false}
    loading
    processingLabel="Saving changes..."
    onChange={() => {}}
  />
);

export const LoadingLabelBelow: Story = () => (
  <Switch
    label="Toggle notifications"
    checked={false}
    loading
    processingLabelBelowSwitch
    onChange={() => {}}
  />
);
```