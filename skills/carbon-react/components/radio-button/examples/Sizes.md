```tsx
export const Sizes: Story = () => {
  const [valueSmall, setValueSmall] = useState("");
  const [valueMedium, setValueMedium] = useState("");
  const [valueLarge, setValueLarge] = useState("");

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-around">
      <RadioButtonGroup
        name="size-group-small"
        legend="Small Radio Buttons"
        value={valueSmall}
        onChange={(ev) => setValueSmall(ev.target.value)}
        size="small"
      >
        <RadioButton id="small-radio-1" value="small1" label="Radio Option 1" />
        <RadioButton id="small-radio-2" value="small2" label="Radio Option 2" />
        <RadioButton id="small-radio-3" value="small3" label="Radio Option 3" />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="size-group-medium"
        legend="Medium Radio Buttons"
        value={valueMedium}
        onChange={(ev) => setValueMedium(ev.target.value)}
        size="medium"
      >
        <RadioButton
          id="medium-radio-1"
          value="medium1"
          label="Radio Option 1"
        />
        <RadioButton
          id="medium-radio-2"
          value="medium2"
          label="Radio Option 2"
        />
        <RadioButton
          id="medium-radio-3"
          value="medium3"
          label="Radio Option 3"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="size-group-large"
        legend="Large Radio Buttons"
        value={valueLarge}
        onChange={(ev) => setValueLarge(ev.target.value)}
        size="large"
      >
        <RadioButton id="large-radio-1" value="large1" label="Radio Option 1" />
        <RadioButton id="large-radio-2" value="large2" label="Radio Option 2" />
        <RadioButton id="large-radio-3" value="large3" label="Radio Option 3" />
      </RadioButtonGroup>
    </Box>
  );
};
```