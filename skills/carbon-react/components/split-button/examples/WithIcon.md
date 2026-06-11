```tsx
export const WithIcon: Story = () => {
  return (
    <>
      {(["before", "after"] as const).map((iconPosition) => (
        <Box key={iconPosition} mb={3}>
          <SplitButton
            iconType="add"
            iconPosition={iconPosition}
            text={`Split button - ${iconPosition}`}
          >
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