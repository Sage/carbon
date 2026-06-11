```tsx
export const RestoreFocusOnClose: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
          setShowMessage(false);
        }}
        mb={showMessage ? 5 : 0}
      >
        Open Dialog
      </Button>
      {showMessage && (
        <Message
          ref={messageRef}
          variant="error"
          onDismiss={() => setShowMessage(false)}
        >
          Some custom message
        </Message>
      )}
      <Dialog
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setShowMessage(true);
          setTimeout(() => messageRef.current?.focus(), 1);
        }}
        title="Title"
        subtitle="Subtitle"
        restoreFocusOnClose={false}
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Typography>
            This is an example of a dialog with a Form as content
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
};
```