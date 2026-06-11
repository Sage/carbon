```tsx
export const ColorVariants: Story = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker progress={15} currentProgressLabel="15%" />
      <ProgressTracker mt={2} progress={50} currentProgressLabel="50%" />
      <ProgressTracker mt={2} progress={100} currentProgressLabel="100%" />
      <ProgressTracker
        mt={2}
        progress={100}
        error
        currentProgressLabel="error"
      />
    </Box>
  );
};
```