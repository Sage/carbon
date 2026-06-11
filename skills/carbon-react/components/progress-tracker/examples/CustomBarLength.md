```tsx
export const CustomBarLength: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker progress={50} length="150px" />
    </Box>
  );
};
```