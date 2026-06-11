```tsx
export const Sizes: Story = () => {
  return (
    <Box display="flex" gap={3} flexDirection="row" alignItems={"flex-start"}>
      <Button size="xs">XS</Button>
      <Button size="small">Small</Button>
      <Button>Medium</Button>
      <Button size="large">Large</Button>
    </Box>
  );
};
```