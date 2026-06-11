```tsx
export const WithHeaderChildren: Story = {
  name: "With Header Children",
  args: {
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  },
  render: function WithHeaderChildrenRender({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
    const [open, setOpen] = useState(args.open || false);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog
          {...args}
          open={open}
          onCancel={(ev) => {
            onCancel?.(ev);
            setOpen(false);
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          headerChildren={
            <Box display="flex" gap={1} mt={2}>
              <Button>Action 1</Button>
              <Button>Action 2</Button>
            </Box>
          }
          footer={<Buttons />}
        >
          {dialogContent}
        </Dialog>
      </>
    );
  },
};
```