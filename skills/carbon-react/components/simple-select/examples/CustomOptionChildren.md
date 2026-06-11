```tsx
export const CustomOptionChildren: Story = () => {
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  const options = [
    { value: "1", text: "Orange", iconType: "favourite", iconColor: "orange" },
    { value: "2", text: "Black", iconType: "bin", iconColor: "black" },
    { value: "3", text: "Blue", iconType: "individual", iconColor: "blue" },
    { value: "4", text: "Green", iconType: "tick_circle", iconColor: "green" },
  ];

  const renderLeftChildren = () => {
    const option = options.find((opt) => opt.value === value);
    return (
      option && (
        <Icon type={option.iconType as IconType} color={option.iconColor} />
      )
    );
  };

  return (
    <Box height={250}>
      <Select
        name="customOptionChildren"
        id="customOptionChildren"
        label="Pick your favourite color"
        value={value}
        onChange={onChangeHandler}
        leftChildren={
          value && (
            <Box display="flex" alignItems="center" ml={1}>
              {renderLeftChildren()}
            </Box>
          )
        }
      >
        {options.map((option) => (
          <Option key={option.value} text={option.text} value={option.value}>
            <Icon
              type={option.iconType as IconType}
              color={option.iconColor}
              mr={1}
            />
            {option.text}
          </Option>
        ))}
      </Select>
    </Box>
  );
};
```