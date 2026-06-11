```tsx
export const ProgrammaticFocus: Story = () => {
  const buttonRef = useRef<ButtonHandle>(null);

  return (
    <Box display="flex" gap={2}>
      <Button ref={buttonRef} variantType="primary">
        Button to Focus
      </Button>
      <Button
        variantType="secondary"
        onClick={() => buttonRef.current?.focusButton()}
      >
        Focus other button
      </Button>
    </Box>
  );
};
```