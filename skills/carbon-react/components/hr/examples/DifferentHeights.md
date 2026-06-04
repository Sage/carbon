```tsx
export const DifferentHeights: Story = () => {
  const heights = ["small", "medium", "large"] as const;
  return (
    <Box>
      {heights.map((height) => (
        <Box key={height} mb={3}>
          <Hr height={height} />
        </Box>
      ))}
    </Box>
  );
};
```