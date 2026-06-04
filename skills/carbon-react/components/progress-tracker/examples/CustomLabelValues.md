```tsx
export const CustomLabelValues: Story = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker
        progress={50}
        currentProgressLabel="$50"
        maxProgressLabel="$200"
      />
      <ProgressTracker
        mt={2}
        progress={70}
        currentProgressLabel="Step 3"
        maxProgressLabel="5"
        description="Adding VAT"
      />
      <ProgressTracker mt={2} progress={100} currentProgressLabel="$200" />
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