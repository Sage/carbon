```tsx
export const ValidationRedesignWithGroupedInputs: StoryObj = () => {
  const [state, setState] = React.useState("radio1");
  const [state2, setState2] = React.useState(true);
  const [state3, setState3] = React.useState(false);
  return (
    <CarbonProvider validationRedesignOptIn>
      <Form>
        <RequiredFieldsIndicator mb={2}>
          Indicates required information
        </RequiredFieldsIndicator>
        <RadioButtonGroup
          legend="Radio Button Group"
          legendHelp="Legend help"
          name="errorRadioGroup"
          required
          error="Error Message (Fix is required)"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <RadioButton id="new-radio-1" value="radio1" label="Radio Option 1" />
          <RadioButton id="new-radio-2" value="radio2" label="Radio Option 2" />
        </RadioButtonGroup>

        <CheckboxGroup
          legend="Checkbox Group"
          legendHelp="Legend help"
          warning="Warning Message (Fix is optional)"
        >
          <Checkbox
            id="new-checkbox-1"
            value="checkbox1"
            label="Checkbox Option 1"
            checked={state2}
            onChange={(e) => setState2(e.target.checked)}
          />
          <Checkbox
            id="new-checkbox-2"
            value="checkbox2"
            label="Checkbox Option 2"
            checked={state3}
            onChange={(e) => setState3(e.target.checked)}
          />
        </CheckboxGroup>
      </Form>
    </CarbonProvider>
  );
};
```