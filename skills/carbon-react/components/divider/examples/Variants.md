```tsx
export const Variants: Story = () => {
  return (
    <>
      <Typography>Typical (default)</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="typical" />
        <Square />
        <Divider variant="typical" />
      </Box>
      <Divider type="horizontal" />
      <Box display="inline-flex" mb={7}>
        <Square />
        <Divider />
        <Square />
        <Divider />
      </Box>
      <Typography>Prominent</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" />
        <Square />
        <Divider variant="prominent" />
      </Box>
      <Divider type="horizontal" variant="prominent" />
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" />
        <Square />
        <Divider variant="prominent" />
      </Box>
    </>
  );
};
```