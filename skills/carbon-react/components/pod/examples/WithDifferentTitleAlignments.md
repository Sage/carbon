```tsx
export const WithDifferentTitleAlignments: Story = () => {
  const alignments = ["left", "center", "right"] as const;
  return (
    <Box>
      {alignments.map((alignment) => (
        <Pod
          key={alignment}
          title="Title"
          subtitle="Subtitle"
          footer="Footer"
          onEdit={() => {}}
          alignTitle={alignment}
          mb={3}
        >
          {alignment}
        </Pod>
      ))}
    </Box>
  );
};
```