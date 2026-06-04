```tsx
export const WithCustomTint: Story = () => {
  return (
    <Box display="inline-flex">
      <Square />
      <VerticalDivider tint={20} />
      <Square />
      <VerticalDivider tint={75} />
      <Square />
      <VerticalDivider tint={80} />
      <Square />
      <VerticalDivider tint={90} />
      <Square />
    </Box>
  );
};
```