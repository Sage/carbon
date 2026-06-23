```tsx
export const StandardSizes: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Accordion title="Small Standard" size="small" subTitle="Subtitle">
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
      </Accordion>

      <Accordion title="Medium Standard" size="medium" subTitle="Subtitle">
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
        <Box my={2}>Content</Box>
      </Accordion>
    </Box>
  );
};
```