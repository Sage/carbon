```tsx
export const SizeSmall: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker size="small" progress={50} />
    </Box>
  );
};
```