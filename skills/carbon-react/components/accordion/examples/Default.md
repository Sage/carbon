```tsx
export const Default: Story = ({ ...args }) => {
  return (
    <Accordion title="Title" {...args}>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>
  );
};
```