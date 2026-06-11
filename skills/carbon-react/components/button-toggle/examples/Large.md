```tsx
export const Large: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle size="large" value="foo">
          Add
        </ButtonToggle>
        <ButtonToggle size="large" value="bar">
          Share
        </ButtonToggle>
        <ButtonToggle size="large" value="baz">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
```