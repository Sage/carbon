```tsx
export const Small: Story = () => {
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
        label="Small example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle size="small" value="foo">
          Add
        </ButtonToggle>
        <ButtonToggle size="small" value="bar">
          Share
        </ButtonToggle>
        <ButtonToggle size="small" value="baz">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
```