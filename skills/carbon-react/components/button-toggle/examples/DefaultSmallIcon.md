```tsx
export const DefaultSmallIcon: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="300px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Small icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle value="bar" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle value="baz" buttonIcon="tick">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
```