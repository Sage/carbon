```tsx
export const WithBothOptionalOrRequired: Story = (args: FormProps) => (
  <Box m={1}>
    <RequiredFieldsIndicator mb={2}>
      <Typography variant="b">Indicates required information</Typography>
    </RequiredFieldsIndicator>
    <Form
      {...args}
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
    >
      <Textbox onChange={() => {}} value="" label="Textbox" required />
      <Select
        name="simple-required"
        id="simple-required"
        label="Simple Select"
        required
        value=""
        onChange={() => {}}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <MultiSelect
        name="multi-optional"
        id="multi-optional"
        label="Multi Select"
        value={[]}
        onChange={() => {}}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </MultiSelect>
      <MultiSelect
        name="multi-required"
        id="multi-required"
        label="Multi Select"
        required
        value={[]}
        onChange={() => {}}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </MultiSelect>
      <RadioButtonGroup
        name="radio group optional"
        legend="RadioGroup"
        value="group-1-input-1"
        onChange={() => "RADIO CHANGE"}
      >
        <RadioButton
          id="group-1-input-1"
          value="group-1-input-1"
          label="Radio Option 1"
        />
        <RadioButton
          id="group-1-input-2"
          value="group-1-input-2"
          label="Radio Option 2"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="radio group required"
        legend="RadioGroup"
        value="group-2-input-2"
        onChange={() => "RADIO CHANGE"}
        required
      >
        <RadioButton
          id="group-2-input-1"
          value="group-2-input-1"
          label="Radio Option 1"
        />
        <RadioButton
          id="group-2-input-2"
          value="group-2-input-2"
          label="Radio Option 2"
        />
      </RadioButtonGroup>
      <Checkbox
        name="checkbox"
        label="Checkbox"
        required
        checked={false}
        onChange={() => {}}
      />
    </Form>
  </Box>
);
```