```tsx
export const Default: Story = () => {
  return (
    <>
      <Box display="inline-flex">
        <Square />
        <Divider />
        <Square />
        <Divider />
      </Box>
      <Divider type="horizontal" />
      <Box display="inline-flex">
        <Square />
        <Divider />
        <Square />
        <Divider />
      </Box>
      <Divider type="horizontal" />
    </>
  );
};
```