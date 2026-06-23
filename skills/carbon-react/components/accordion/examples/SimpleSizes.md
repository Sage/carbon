```tsx
export const SimpleSizes: Story = () => {
  return (
    <Box display="flex" alignItems="flex-start">
      <Accordion title="Small Simple" size="small" variant="simple">
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>

      <Accordion title="Medium Simple" size="medium" variant="simple">
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>

      <Accordion title="Large Simple" size="large" variant="simple">
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>
    </Box>
  );
};
```