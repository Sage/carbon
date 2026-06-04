```tsx
export const WithFullWidthButtons: Story = (args: FormProps) => (
  <CarbonProvider validationRedesignOptIn>
    <Form
      {...args}
      fullWidthButtons
      stickyFooter
      leftSideButtons={<Button fullWidth>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit" fullWidth>
          Save
        </Button>
      }
      errorCount={3}
      warningCount={2}
    >
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
    </Form>
  </CarbonProvider>
);
```