```tsx
export const SmallScreenBehavior: Story = {
  name: "Small Screen Behavior (Accessibility)",
  args: {
    open: isChromatic(),
    title: "Small Screen Dialog",
    subtitle: "Header and footer are not sticky on small screens",
    size: "medium",
    disableStickyOnSmallScreen: true,
  },
  render: function SmallScreenBehaviorRender({
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
          On small screen devices (below 600px), the dialog becomes full width,
          the dimmer is removed, and the header/footer are no longer sticky.
          This improves accessibility on mobile devices.
        </Typography>
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
          <Typography>
            This dialog demonstrates small screen accessibility behavior.
          </Typography>
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
        </Dialog>
      </>
    );
  },
  parameters: {
    chromatic: {
      modes: {
        xsm: allModes.xsm,
        lg: allModes.lg,
      },
    },
  },
};
```