```tsx
export const Flex: Story = () => {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="stretch"
        m="5px"
      >
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="stretch"
        height="400px"
        m="5px"
      >
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
    </Box>
  );
};
```