```tsx
export const Gap: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" columnGap={1}>
        <Box display="flex" flexDirection="column" rowGap={2}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={3}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={4}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={5}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={6}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={7}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={8}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
      </Box>
      <Box display="flex" gap={4}>
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box display="flex" gap={8}>
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box display="flex" gap="72px">
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
    </Box>
  );
};
```