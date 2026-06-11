```tsx
export const WithCustomSpacingHeight: Story = () => {
  return (
    <Box display="inline-flex">
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={1} pb={1} />
        <Square />
      </Box>
      <VerticalDivider pl={1} pr={1} h={185} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={2} pb={2} />
        <Square />
      </Box>
      <VerticalDivider pl={2} pr={2} h={200} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={3} pb={3} />
        <Square />
      </Box>
      <VerticalDivider pl={3} pr={3} h={215} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={4} pb={4} />
        <Square />
      </Box>
      <VerticalDivider pl={4} pr={4} h={230} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={5} pb={5} />
        <Square />
      </Box>
      <VerticalDivider pl={5} pr={5} h={245} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={6} pb={6} />
        <Square />
      </Box>
      <VerticalDivider pl={6} pr={6} h={260} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={7} pb={7} />
        <Square />
      </Box>
    </Box>
  );
};
```