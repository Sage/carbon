```tsx
export const Inverse: Story = () => {
  return (
    <Box bg="#000000" p={5}>
      <Typography color="#fff">Typical (default)</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="typical" inverse />
        <Square />
        <Divider variant="typical" inverse />
      </Box>
      <Divider type="horizontal" inverse />
      <Box display="inline-flex" mb={7}>
        <Square />
        <Divider variant="typical" inverse />
        <Square />
        <Divider variant="typical" inverse />
      </Box>
      <Typography color="#fff">Prominent</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" inverse />
        <Square />
        <Divider variant="prominent" inverse />
      </Box>
      <Divider type="horizontal" variant="prominent" inverse />
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" inverse />
        <Square />
        <Divider variant="prominent" inverse />
      </Box>
    </Box>
  );
};
```