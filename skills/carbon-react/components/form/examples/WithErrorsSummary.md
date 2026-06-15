```tsx
export const WithErrorsSummary: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={1}
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
);
```