```tsx
export const Position: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <SplitButton position="left" text="Left position">
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>

      <SplitButton position="right" text="Right position">
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Box>
  );
};
```