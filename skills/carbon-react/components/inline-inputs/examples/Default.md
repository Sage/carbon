```tsx
export const Default: Story = () => {
  let validationProps = {};
  validationProps = {
    hasWarning: true,
    inputIcon: "warning",
    tooltipMessage: "warning",
  };
  const [decimalValue, setDecimalValue] = useState("0.00");
  const [selectValue, setSelectValue] = useState("");
  const handleDecimalChange = (ev: {
    target: { value: { rawValue: React.SetStateAction<string> } };
  }) => {
    setDecimalValue(ev.target.value.rawValue);
  };
  const handleSelectChange = (ev: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectValue(ev.target.value);
  };
  return (
    <InlineInputs
      label="Inline Inputs"
      labelId="inline-inputs-default"
      gutter="none"
    >
      <Textbox
        aria-labelledby="inline-inputs-default"
        {...validationProps}
        value=""
        onChange={() => {}}
      />
      <Decimal
        aria-labelledby="inline-inputs-default"
        value={decimalValue}
        onChange={handleDecimalChange}
      />
      <Select
        value={selectValue}
        onChange={handleSelectChange}
        aria-labelledby="inline-inputs-default"
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </InlineInputs>
  );
};
```