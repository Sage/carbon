```tsx
export const WithAdditionalButtons: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={
      <>
        <Button>Other</Button>
        <Button>Cancel</Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    rightSideButtons={
      <>
        <Button>Reset</Button>
        <Button>Other</Button>
      </>
    }
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
);

export const WithButtonsAlignedToTheLeft: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={
      <>
        <Button>Other</Button>
        <Button>Cancel</Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    rightSideButtons={
      <>
        <Button>Reset</Button>
        <Button>Other</Button>
      </>
    }
    buttonAlignment="left"
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
);
```