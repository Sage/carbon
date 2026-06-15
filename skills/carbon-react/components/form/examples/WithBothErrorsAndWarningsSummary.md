```tsx
export const WithBothErrorsAndWarningsSummary: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={2}
    warningCount={2}
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
);
```