```tsx
export const WithIcon: Story = {
  render: (args) => (
    <>
      <Typography>
        <Link iconAlign="left" {...args}>
          Link with left icon
        </Link>
      </Typography>
      <Typography>
        <Link iconAlign="right" {...args}>
          Link with right icon
        </Link>
      </Typography>
    </>
  ),
  args: {
    href: "https://carbon.sage.com",
    icon: "settings",
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