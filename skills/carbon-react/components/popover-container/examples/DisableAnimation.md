```tsx
export const DisableAnimation: Story = () => {
  return (
    <Box height={100}>
      <PopoverContainer
        title="Disabled Animation Popover Container"
        disableAnimation
      >
        Contents
      </PopoverContainer>
    </Box>
  );
};
```