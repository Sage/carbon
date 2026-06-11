```tsx
export const WithCustomFooterPadding: Story = (args: FormProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="With custom footer padding"
      >
        <Form
          {...args}
          leftSideButtons={<Button>Cancel</Button>}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
          stickyFooter
          footerPadding={{ px: 8 }}
        >
          <Textbox onChange={() => {}} value="" label="Textbox" />
        </Form>
      </Dialog>
    </>
  );
};
```