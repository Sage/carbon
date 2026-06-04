```tsx
export const Disabled: Story = () => {
  return (
    <>
      <Box mb={3}>
        <SplitButton disabled text="Split button">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </SplitButton>
      </Box>
      <Box p={2} width="298px" backgroundColor="#000">
        <SplitButton
          buttonType="secondary"
          text="Split button - secondary - white"
          isWhite
          disabled
        >
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </SplitButton>
      </Box>
    </>
  );
};
```