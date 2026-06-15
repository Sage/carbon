```tsx
export const InDialogFullScreen = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Box p="0px 40px">
          <Form
            leftSideButtons={
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            }
            saveButton={<Button buttonType="primary">Submit</Button>}
          >
            <Textbox onChange={() => {}} value="" label="Textbox" />
          </Form>
        </Box>
      </Dialog>
    </>
  );
};
```