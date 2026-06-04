```tsx
export const Sizes: Story = () => {
  return (
    <>
      {(["small", "medium", "large"] as const).map((size) => (
        <Box key={size} mb={3}>
          <SplitButton size={size} text={`Split button - ${size}`}>
            <Button size={size}>Button 1</Button>
            <Button size={size}>Button 2</Button>
            <Button size={size}>Button 3</Button>
          </SplitButton>
        </Box>
      ))}
    </>
  );
};
```