```tsx
export const Align: Story = () => {
  return (
    <>
      {(["left", "right"] as const).map((align) => (
        <Box key={align} mb={3}>
          <SplitButton align={align} text={`Split button - ${align}`}>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </SplitButton>
        </Box>
      ))}
    </>
  );
};
```