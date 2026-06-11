```tsx
export const AnimationTime: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" animationTime={3} mb={4} />
      <Loader loaderType="ring" animationTime={3} isTracked mb={4} />
      <Loader animationTime={3} />
    </Box>
  ),
};
```