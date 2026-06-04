```tsx
export const Inverse: Story = {
  render: ({ ...args }) => {
    return (
      <Box p={2} bg="#000">
        <Breadcrumbs aria-label="Breadcrumbs with inverse styling" {...args}>
          <Crumb href="#">Breadcrumb 1</Crumb>
          <Crumb href="#">Breadcrumb 2</Crumb>
          <Crumb href="#">Breadcrumb 3</Crumb>
          <Crumb href="#" isCurrent>
            Current Page
          </Crumb>
        </Breadcrumbs>
      </Box>
    );
  },
  args: {
    inverse: true,
  },
};
```