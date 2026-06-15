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
```