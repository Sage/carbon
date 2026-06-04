```tsx
export const InsideForm: Story = () => {
  return (
    <Form
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter={false}
    >
      <Textbox label="Textbox" value="" onChange={() => {}} />
      <Textbox label="Textbox" value="" onChange={() => {}} />
      <Divider type="horizontal" mb={7} mt={7} />
      <Textbox label="Textbox" value="" onChange={() => {}} />
    </Form>
  );
};
```