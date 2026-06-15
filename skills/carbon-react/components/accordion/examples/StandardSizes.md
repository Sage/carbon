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
```