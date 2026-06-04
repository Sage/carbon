```tsx
export const ButtonTypes: Story = () => {
  return (
    <>
      {(["primary", "secondary"] as const).map((buttonType) => (
        <Box key={buttonType} mb={3}>
          <SplitButton
            buttonType={buttonType}
            text={`Split button - ${buttonType}`}
          >
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </SplitButton>
        </Box>
      ))}
      <Box p={2} width="298px" backgroundColor="#000">
        <SplitButton
          buttonType="secondary"
          text="Split button - secondary - white"
          isWhite
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