```tsx
export const StickyHeaderAndFooter: Story = {
  ...WithFooter,
  args: {
    ...WithFooter.args,
    stickyHeader: true,
    stickyFooter: true,
    height: "300px",
    sidebar: (
      <Box p={3}>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
        <Typography>Drawer Content</Typography>
      </Box>
    ),
  },
};
```