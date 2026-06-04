```tsx
export const WithInputHint: Story = ({ ...args }) => {
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="input-hint-group"
      legend="Radio Button Group Legend"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
      {...args}
    >
      <RadioButton
        id="input-hint-radio-1"
        value="radio1"
        label="Radio Option 1"
        inputHint="Input Hint"
      />
      <RadioButton
        id="input-hint-radio-2"
        value="radio2"
        label="Radio Option 2"
        inputHint="Input Hint"
      />
      <RadioButton
        id="input-hint-radio-3"
        value="radio3"
        label="Radio Option 3"
        inputHint="Input Hint"
      />
    </RadioButtonGroup>
  );
};
```