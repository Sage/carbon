```tsx
export const grid: Story = () => {
  return (
    <Box>
      <Box display="grid" gap={1} gridTemplateColumns="auto auto auto">
        <Box padding={50} bg="primary" gridColumn="1 / 3" gridRow="1" />
        <Box padding={50} bg="primary" gridColumn="3" gridRow="1 / 3" />
        <Box padding={50} bg="primary" gridColumn="1" gridRow="2" />
        <Box padding={50} bg="primary" gridColumn="2" gridRow="2" />
      </Box>
      <Box
        display="grid"
        gap={1}
        gridTemplateColumns="repeat(4, [col] auto)"
        gridTemplateRows="repeat(3, [row] auto)"
        mt={50}
      >
        <Box
          padding={50}
          bg="primary"
          gridColumn="col / span 2"
          gridRow="row"
        />
        <Box
          padding={50}
          bg="primary"
          gridColumn="col 3 / span 2"
          gridRow="row"
        />
        <Box padding={50} bg="primary" gridColumn="col" gridRow="row 2" />
        <Box
          padding={50}
          bg="primary"
          gridColumn="col 2 / span 3"
          gridRow="row 2"
        />
        <Box
          padding={50}
          bg="primary"
          gridColumn="col / span 4"
          gridRow="row 3"
        />
      </Box>
    </Box>
  );
};
```