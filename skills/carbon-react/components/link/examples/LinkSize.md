```tsx
export const LinkSize: Story = {
  render: (args) => (
    <>
      <Typography>
        <Link linkSize="medium" {...args}>
          This is a medium link
        </Link>
      </Typography>
      <Typography>
        <Link linkSize="large" {...args}>
          This is a large link
        </Link>
      </Typography>
    </>
  ),
  args: {
    href: "https://carbon.sage.com",
  },
  decorators: [
    (Story) => (
      <Box display="flex" flexDirection="row" gap={4}>
        <Story />
      </Box>
    ),
  ],
};
```