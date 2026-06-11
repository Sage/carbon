```tsx
export const ResponsiveBehavior: Story = {
  name: "Responsive Behavior",
  args: {
    open: isChromatic(),
    title: "Responsive Dialog",
    subtitle: "Dialog shrinks to fit viewport",
    size: "large",
  },
  render: function ResponsiveBehaviorRender({
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
        <Typography mt={2}>
          Resize your browser window to see the dialog responsively shrink while
          staying centered. The dialog has a minimum width of 288px.
        </Typography>
        <Dialog
          {...args}
          open={open}
          onCancel={(ev) => {
            onCancel?.(ev);
            setOpen(false);
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
        >
          <Form
            stickyFooter
            leftSideButtons={
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            }
            saveButton={
              <Button buttonType="primary" type="submit">
                Save
              </Button>
            }
          >
            <Typography>
              This dialog will shrink responsively when the viewport is smaller
              than the dialog&apos;s max-width.
            </Typography>
            <Textbox label="First Name" value="" onChange={() => {}} />
            <Textbox label="Middle Name" value="" onChange={() => {}} />
            <Textbox label="Surname" value="" onChange={() => {}} />
          </Form>
        </Dialog>
      </>
    );
  },
  parameters: {
    chromatic: {
      modes: {
        xsm: allModes.xsm,
        sm: allModes.sm,
        md: allModes.md,
        lg: allModes.lg,
      },
    },
  },
};
```