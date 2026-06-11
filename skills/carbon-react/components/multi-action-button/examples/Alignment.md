```tsx
export const Alignment: Story = () => {
  return (["left", "right"] as const).map(
    (align: MultiActionButtonProps["align"]) => (
      <Box key={align} mb={3}>
        <MultiActionButton
          align={align}
          text={`Multi Action Button - ${align}`}
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