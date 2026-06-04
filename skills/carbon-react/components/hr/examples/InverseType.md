```tsx
export const InverseType: Story = () => {
  const heights = ["small", "medium", "large"] as const;
  return (
    <>
      <Box backgroundColor="var(--colorsActionMajor500)">
        {heights.map((height) => (
          <Box key={height} mb={3}>
            <Hr type="inverse" height={height} />
          </Box>
        ))}
      </Box>
    </>
  );
};
```