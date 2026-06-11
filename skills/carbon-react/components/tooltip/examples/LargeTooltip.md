```tsx
export const LargeTooltip: Story = () => {
  const Component = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children }: ButtonProps, ref) => (
      <Button buttonType="primary" ref={ref}>
        {children}
      </Button>
    ),
  );
  Component.displayName = "Example Button";
  return (
    <Box p={60}>
      <Tooltip message="I am a tooltip!" size="large">
        <Component>target</Component>
      </Tooltip>
    </Box>
  );
};
```