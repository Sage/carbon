```tsx
export const Standalone: Story = {
  render: () => (
    <Box>
      <Loader loaderType="standalone" />
    </Box>
  ),
};

export const Ring: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" />
    </Box>
  ),
};

export const Star: Story = {
  render: () => (
    <Box>
      <Loader loaderType="star" />
    </Box>
  ),
};
```