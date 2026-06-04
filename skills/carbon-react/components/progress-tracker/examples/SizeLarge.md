```tsx
export const SizeLarge: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker size="large" progress={50} />
    </Box>
  );
};
```