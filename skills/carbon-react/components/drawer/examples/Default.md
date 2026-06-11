```tsx
export const Default: Story = {
  render: (args) => (
    <Drawer {...args}>
      <Box p={3}>Main body content</Box>
    </Drawer>
  ),
  args: {
    sidebar: <Box p={3}>Drawer content</Box>,
  },
};
```