```tsx
export const Inverse: Story = {
  render: (args) => (
    <>
      <Typography>
        <Link variant="typical" {...args}>
          This is an inverse typical link
        </Link>
      </Typography>
      <Typography>
        <Link variant="negative" {...args}>
          This is an inverse negative link
        </Link>
      </Typography>
      <Typography>
        <Link variant="subtle" {...args}>
          This is an inverse subtle link
        </Link>
      </Typography>
    </>
  ),
  args: {
    href: "https://carbon.sage.com",
    inverse: true,
  },
  decorators: [
    (Story) => (
      <Box p={2} display="flex" flexDirection="row" gap={4} bg="#000">
        <Story />
      </Box>
    ),
  ],
};
```