```tsx
export const StickyFooterWithForm: Story = {
  name: "Sticky Footer with Form",
  args: {
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  },
  render: function StickyFooterWithFormRender({
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
              This is an example of a dialog using a Form component with its own
              sticky footer. The Form manages the footer internally.
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
          </Form>
        </Dialog>
      </>
    );
  },
};
```