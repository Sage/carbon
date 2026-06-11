```tsx
export const Virtualised: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  const colors = [
    "Amber",
    "Black",
    "Blue",
    "Brown",
    "Green",
    "Orange",
    "Pink",
    "Purple",
    "Red",
    "White",
    "Yellow",
  ];
  const options = Array(10000)
    .fill(undefined)
    .map((_, index) => (
      <Option
        key={`option-${index + 1}`}
        value={`${index}`}
        text={`${colors[index % colors.length]} - option ${index + 1}`}
      />
    ));
  return (
    <Box height={220}>
      <FilterableSelect
        name="virtualised"
        id="virtualised"
        label="choose an option"
        labelInline
        enableVirtualScroll
        virtualScrollOverscan={20}
        value={value}
        onChange={onChangeHandler}
      >
        {options}
      </FilterableSelect>
    </Box>
  );
};
```