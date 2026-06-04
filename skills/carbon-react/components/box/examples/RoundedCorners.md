```tsx
export const RoundedCorners: Story = () => {
  const radiusTokens: BoxProps["borderRadius"][] = [
    "borderRadius000",
    "borderRadius010",
    "borderRadius025",
    "borderRadius050",
    "borderRadius100",
    "borderRadius200",
    "borderRadius400",
    "borderRadiusCircle",
  ];

  return (
    <Box display="flex" justifyContent="space-between">
      {radiusTokens.map((token) => (
        <Box
          key={`${token}-example`}
          backgroundColor="primary"
          height="100px"
          width="100px"
          borderRadius={token}
        />
      ))}
    </Box>
  );
};
```