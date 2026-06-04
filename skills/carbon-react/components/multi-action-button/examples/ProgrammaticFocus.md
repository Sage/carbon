```tsx
export const ProgrammaticFocus: Story = () => {
  const multiActionButtonHandle = useRef<MultiActionButtonHandle>(null);

  return (
    <Box display="flex" gap={2}>
      <Button
        onClick={() => multiActionButtonHandle.current?.focusMainButton()}
      >
        Focus Button
      </Button>
      <MultiActionButton
        ref={multiActionButtonHandle}
        text="Multi Action Button"
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </MultiActionButton>
    </Box>
  );
};
```