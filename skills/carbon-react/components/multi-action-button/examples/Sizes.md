```tsx
export const Sizes: Story = () => {
  return (["small", "medium", "large"] as const).map(
    (size: MultiActionButtonProps["size"]) => (
      <Box key={size} mb={3}>
        <MultiActionButton size={size} text={`Multi Action Button - ${size}`}>
          <Button size={size} href="#">
            Button 1
          </Button>
          <Button size={size}>Button 2</Button>
          <Button size={size}>Button 3</Button>
        </MultiActionButton>
      </Box>
    ),
  );
};
```