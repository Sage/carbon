```tsx
export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>
  ),
  args: {
    title: "Title",
  },
};
```