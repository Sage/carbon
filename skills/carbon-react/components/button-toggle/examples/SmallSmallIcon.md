```tsx
export const SmallSmallIcon: Story = () => {
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
        label="Small with small icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle size="small" value="foo" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle size="small" value="bar" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle size="small" value="baz" buttonIcon="tick">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
```