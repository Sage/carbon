```tsx
export const InDialog = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={<Button buttonType="primary">Submit</Button>}
        >
          <Textbox onChange={() => {}} value="" label="Textbox" />
        </Form>
      </Dialog>
    </>
  );
};
```