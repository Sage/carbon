```tsx
export const FullWidth: Story = () => {
  return (
    <Box width="500px" display={"flex"} flexDirection={"column"} gap={1}>
      <Button fullWidth>Full-Width Button</Button>
      <br />
      <br />
      <Button>Normal Button</Button>
    </Box>
  );
};
```