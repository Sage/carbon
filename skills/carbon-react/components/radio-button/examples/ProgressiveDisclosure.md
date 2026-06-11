```tsx
export const ProgressiveDisclosure: Story = () => {
  const [value, setValue] = useState("radio1");
  const [textboxValue, setTextboxValue] = useState("");

  const progressiveDisclosure = (
    <Box mr={1} width="300px">
      <Textbox
        label="Revealed Textbox"
        value={textboxValue}
        onChange={(ev) => setTextboxValue(ev.target.value)}
      />
    </Box>
  );

  return (
    <RadioButtonGroup
      legend="Progressive Disclosure"
      name="progressive-disclosure-group"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    >
      <RadioButton
        id="progressive-radio-1"
        value="radio1"
        label="Radio Option 1"
        progressiveDisclosure={progressiveDisclosure}
      />
      <RadioButton
        id="progressive-radio-2"
        value="radio2"
        label="Radio Option 2"
        progressiveDisclosure={progressiveDisclosure}
      />
      <RadioButton
        id="progressive-radio-3"
        value="radio3"
        label="Radio Option 3"
        progressiveDisclosure={progressiveDisclosure}
      />
    </RadioButtonGroup>
  );
};
```