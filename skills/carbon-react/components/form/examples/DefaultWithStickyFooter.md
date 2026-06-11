```tsx
export const DefaultWithStickyFooter: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter
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