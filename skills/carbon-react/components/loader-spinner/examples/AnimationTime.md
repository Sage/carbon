```tsx
export const AnimationTime: Story = () => (
  <Box display="flex">
    <LoaderSpinner mx="3" animationTime={5} />
    <LoaderSpinner mx="3" variant="gradient-grey" animationTime={5} />
    <LoaderSpinner mx="3" isTracked animationTime={5} />
  </Box>
);
```