```tsx
export const ValidationRedesignMessageBottom: StoryObj = () => {
  const [state, setState] = React.useState("");
  const [state2, setState2] = React.useState(true);
  const [state3, setState3] = React.useState(false);

  return (
    <CarbonProvider validationRedesignOptIn>
      <Form>
        <RequiredFieldsIndicator mb={2}>
          Indicates required information
        </RequiredFieldsIndicator>

        <Textbox
          label="Textbox"
          inputHint="Hint text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          error="Error Message (Fix is required)"
          validationMessagePositionTop={false}
        />

        <CheckboxGroup
          legend="Checkbox Group"
          legendHelp="Legend help"
          warning="Warning Message (Fix is optional)"
          validationMessagePositionTop={false}
        >
          <Checkbox
            id="new-checkbox-1-bottom"
            value="checkbox1"
            label="Checkbox Option 1"
            checked={state2}
            onChange={(e) => setState2(e.target.checked)}
          />
          <Checkbox
            id="new-checkbox-2-bottom"
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