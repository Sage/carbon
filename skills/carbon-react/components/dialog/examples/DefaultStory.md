```tsx
export const DefaultStory: Story = {
  name: "Default",
  args: {
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  },
  render: function DefaultRender({ onCancel, ...args }: DialogProps) {
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
          footer={<Buttons />}
        >
          {dialogContent}
        </Dialog>
      </>
    );
  },
};
```