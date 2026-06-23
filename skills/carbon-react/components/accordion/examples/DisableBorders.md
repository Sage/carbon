```tsx
export const DisableBorders: Story = () => {
  return (
    <Accordion title="Title" borders="none">
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>
  );
};
```