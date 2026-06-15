```tsx
export const GroupedInputValidation: StoryObj = () => {
  const [state, setState] = React.useState("radio1");
  return (
    <RadioButtonGroup
      legend="Radio Button Group"
      name="errorRadioGroup"
      value={state}
      onChange={(e) => setState(e.target.value)}
    >
      <RadioButton
        id="error-radio-1"
        value="radio1"
        label="Radio Option 1"
        error="Error Message"
      />
      <RadioButton
        id="warning-radio-2"
        value="radio2"
        label="Radio Option 2"
        warning="Warning Message"
      />
      <RadioButton
        id="info-radio-2"
        value="radio3"
        label="Radio Option 3"
        info="Information Message"
      />
    </RadioButtonGroup>
  );
};
```