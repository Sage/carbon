```tsx
export const StandardSizes: Story = ({ ...args }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Accordion title="Small Standard" size="small" {...args}>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
      </Accordion>

      <Accordion title="Medium Standard" size="medium" {...args}>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
      </Accordion>
    </Box>
  );
};

export const SimpleSizes: Story = ({ ...args }) => {
  return (
    <Box display="flex" alignItems="flex-start">
      <Accordion title="Small Simple" size="small" {...args}>
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>

      <Accordion title="Medium Simple" size="medium" {...args}>
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>

      <Accordion title="Large Simple" size="large" {...args}>
        <Box>Content</Box>
        <Box>Content</Box>
        <Box mb={1}>Content</Box>
      </Accordion>
    </Box>
  );
};
```