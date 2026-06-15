```tsx
export const WithWarningsSummary: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    warningCount={1}
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
);
```