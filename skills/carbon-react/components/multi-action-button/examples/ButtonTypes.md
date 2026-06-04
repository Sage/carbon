```tsx
export const ButtonTypes: Story = () => {
  return (["primary", "secondary", "tertiary"] as const).map(
    (buttonType: MultiActionButtonProps["buttonType"]) => (
      <Box key={buttonType} mb={3}>
        <MultiActionButton
          buttonType={buttonType}
          text={`Multi Action Button - ${buttonType}`}
        >
          <Button href="#">Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </MultiActionButton>
      </Box>
    ),
  );
};
```