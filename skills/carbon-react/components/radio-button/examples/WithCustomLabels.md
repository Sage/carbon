```tsx
export const WithCustomLabels: Story = () => {
  const [value, setValue] = useState("");
  return (
    <RadioButtonGroup
      name="custom-styled-label-group"
      legend="Radio group legend"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    >
      <RadioButton
        id="custom-styled-label-radio-1"
        value="radio1"
        label={
          <>
            <Icon type="placeholder" aria-hidden />
            Radio Button 1
          </>
        }
      />
      <RadioButton
        id="custom-styled-label-radio-2"
        value="radio2"
        label={
          <>
            <Icon type="placeholder" aria-hidden />
            Radio Button 2
          </>
        }
      />
      <RadioButton
        id="custom-styled-label-radio-3"
        value="radio3"
        label={
          <>
            <Icon type="placeholder" aria-hidden />
            Radio Button 3
          </>
        }
      />
    </RadioButtonGroup>
  );
};
```