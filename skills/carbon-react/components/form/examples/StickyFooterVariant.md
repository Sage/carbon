```tsx
export const StickyFooterVariant: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter
    stickyFooterVariant="grey"
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
);
```