```tsx
export const Types: Story = () => {
  const [type, setType] = useState<string | undefined>(undefined);
  const Component = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children }: ButtonProps, ref) => (
      <Button buttonType="primary" ref={ref}>
        {children}
      </Button>
    ),
  );
  Component.displayName = "Example Button";
  return (
    <>
      <Box display="flex">
        <Button onClick={() => setType(undefined)}>Default Type</Button>
        <Button onClick={() => setType("error")}>Error Type</Button>
      </Box>
      <Box p={60}>
        <Tooltip message="I am a tooltip!" type={type}>
          <Component>target</Component>
        </Tooltip>
      </Box>
    </>
  );
};
```