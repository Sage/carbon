```tsx
export const GroupedLegendValidation: StoryObj = () => {
  const [state, setState] = React.useState("radio1");
  return (
    <RadioButtonGroup
      legend="Radio Button Group"
      name="errorRadioGroup"
      required
      error="Error Message"
      value={state}
      onChange={(e) => setState(e.target.value)}
    >
      <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="radio-2" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};
```