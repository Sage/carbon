```tsx
export const Disabled: Story = () => {
  return (
    <Checkbox
      disabled
      label="Disabled checkbox"
      name="checkbox-disabled"
      onChange={() => {}}
      checked={false}
    />
  );
};
```