```tsx
export const WrappingText: Story = () => {
  return (
    <Box width="80px" display={"flex"} gap={2}>
      <Button noWrap>No Wrapping</Button>
      <Button noWrap={false}>With Wrapping</Button>
    </Box>
  );
};
```