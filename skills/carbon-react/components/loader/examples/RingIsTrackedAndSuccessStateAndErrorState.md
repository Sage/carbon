```tsx
export const RingIsTracked: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" isTracked />
    </Box>
  ),
};

export const SuccessState: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" isTracked isSuccess />
    </Box>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" isTracked isError />
    </Box>
  ),
};
```