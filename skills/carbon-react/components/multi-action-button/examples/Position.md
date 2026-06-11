```tsx
export const Position: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <MultiActionButton position="left" text="Left position">
        <Button href="#">Button 1 with longer text</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>

      <MultiActionButton position="right" text="Right position">
        <Button href="#">Button 1 with longer text</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>
    </Box>
  );
};
```