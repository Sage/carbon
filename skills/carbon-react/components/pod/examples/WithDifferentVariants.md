```tsx
export const WithDifferentVariants: Story = () => {
  const variants = [
    "primary",
    "secondary",
    "tertiary",
    "tile",
    "transparent",
  ] as const;

  return (
    <Box>
      {variants.map((variant) => (
        <Pod
          key={variant}
          title="Title"
          subtitle="Subtitle"
          footer="Footer"
          onEdit={() => {}}
          onDelete={() => {}}
          variant={variant}
          mb={3}
        >
          {variant}
        </Pod>
      ))}
    </Box>
  );
};
```