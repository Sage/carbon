```tsx
export const WithDifferentSizes: Story = () => {
  const sizes = [
    "extra-small",
    "small",
    "medium",
    "large",
    "extra-large",
  ] as const;
  return (
    <Box>
      {sizes.map((size) => (
        <Box key={size}>
          <Pod
            title="Title"
            subtitle="with edit and delete buttons"
            footer="Footer"
            onEdit={() => {}}
            onDelete={() => {}}
            size={size}
            mb={3}
          >
            {size}
          </Pod>
          <Pod
            title="Title"
            subtitle="with undo button"
            footer="Footer"
            onUndo={() => {}}
            softDelete
            size={size}
            mb={3}
          >
            {size}
          </Pod>
        </Box>
      ))}
    </Box>
  );
};
```