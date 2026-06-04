```tsx
export const WithLabelsInline: Story = () => (
  <Form
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
  >
    <Textbox
      onChange={() => {}}
      value=""
      label="Textbox"
      labelInline
      labelWidth={30}
    />
    <InlineInputs
      label="Inline Inputs"
      gutter="none"
      labelWidth={30}
      labelId="inline-inputs"
    >
      <Textbox
        aria-labelledby="inline-inputs"
        value=""
        onChange={() => {}}
        mb={0}
      />
      <Textbox
        aria-labelledby="inline-inputs"
        value=""
        onChange={() => {}}
        mb={0}
      />
      <Select aria-labelledby="inline-inputs" value="" onChange={() => {}}>
        <Option value="1" text="option 1" key="1" />
        <Option value="2" text="option 2" key="2" />
        <Option value="3" text="option 3" key="3" />
      </Select>
    </InlineInputs>
    <InlineInputs
      label="Inline Inputs with a gutter"
      gutter="large"
      labelWidth={30}
      labelId="inline-inputs-second"
    >
      <Textbox
        aria-labelledby="inline-inputs-second"
        value=""
        onChange={() => {}}
      />
      <Textbox
        aria-labelledby="inline-inputs-second"
        value=""
        onChange={() => {}}
      />
      <Select
        aria-labelledby="inline-inputs-second"
        value=""
        onChange={() => {}}
      >
        <Option value="1" text="option 1" key="1" />
        <Option value="2" text="option 2" key="2" />
        <Option value="3" text="option 3" key="3" />
      </Select>
    </InlineInputs>
    <Textbox
      aria-labelledby="inline-inputs-second"
      value=""
      onChange={() => {}}
    />
  </Form>
);
```