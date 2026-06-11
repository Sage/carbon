```tsx
export const ProgrammaticFocus: Story = () => {
  const splitButtonHandle = useRef<SplitButtonHandle>(null);

  return (
    <Box display="flex" gap={6}>
      <Box display="flex" gap={1}>
        <Button onClick={() => splitButtonHandle.current?.focusMainButton()}>
          Focus Main Button
        </Button>
        <Button onClick={() => splitButtonHandle.current?.focusToggleButton()}>
          Focus Toggle Button
        </Button>
      </Box>
      <SplitButton ref={splitButtonHandle} text="Split button">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButton>
    </Box>
  );
};
```