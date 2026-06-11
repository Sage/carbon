```tsx
export const FormLinkedToFooterButtons: Story = {
  name: "Form Linked to Footer Buttons",
  args: {
    open: isChromatic(),
    title: "Personal Details",
    subtitle: "Enter your details below",
    size: "medium",
    stickyFooter: true,
  },
  render: function FormLinkedToFooterButtonsRender({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
    const [open, setOpen] = useState(args.open || false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      setSubmitted(true);
      setOpen(false);
      setTimeout(() => buttonRef.current?.focusButton(), 0);
    };

    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        {submitted && (
          <Typography mt={2}>Form submitted successfully!</Typography>
        )}
        <Dialog
          {...args}
          open={open}
          onCancel={(ev) => {
            onCancel?.(ev);
            setOpen(false);
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          footer={
            <Box display="flex" gap={1} justifyContent="flex-end" width="100%">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                variant="default"
                variantType="primary"
                type="submit"
                form="dialog-form"
              >
                Save
              </Button>
            </Box>
          }
        >
          <Form id="dialog-form" onSubmit={handleSubmit}>
            <Textbox label="First Name" value="" onChange={() => {}} />
            <Textbox label="Middle Name" value="" onChange={() => {}} />
            <Textbox label="Surname" value="" onChange={() => {}} />
            <Textbox label="Birth Place" value="" onChange={() => {}} />
            <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          </Form>
        </Dialog>
      </>
    );
  },
};
```