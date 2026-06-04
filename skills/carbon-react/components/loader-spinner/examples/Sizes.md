```tsx
export const Sizes: Story = () => {
  return (
    <Box display="flex" alignItems="baseline">
      {sizes.map((size) => (
        <LoaderSpinner mx="20px" key={size} size={size} />
      ))}
    </Box>
  );
};
```