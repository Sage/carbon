```tsx
export const Variants: Story = {
  render: (args) => (
    <>
      <Typography>
        <Link variant="typical" {...args}>
          This is a typical link
        </Link>
      </Typography>
      <Typography>
        <Link variant="negative" {...args}>
          This is a negative link
        </Link>
      </Typography>
      <Typography>
        <Link variant="subtle" {...args}>
          This is a subtle link
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