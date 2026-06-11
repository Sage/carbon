```tsx
export const SimpleVariant: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Box>Content</Box>
      <Box>Content</Box>
      <Box mb={1}>Content</Box>
    </Accordion>
  ),
  args: {
    ...Default.args,
    title: "Accordion label",
    variant: "simple",
  },
};
```