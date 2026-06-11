```tsx
export const FieldSpacing: Story = (args: FormProps) => {
  const [state, setState] = useState("");

  const setValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState(ev.target.value);
  };

  return (
    <Form
      {...args}
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      fieldSpacing={5}
    >
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textarea
        label="Textarea with Character Limit"
        characterLimit={50}
        value={state}
        onChange={setValue}
      />
    </Form>
  );
};
```