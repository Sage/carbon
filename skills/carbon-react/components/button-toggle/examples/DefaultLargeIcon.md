```tsx
export const DefaultLargeIcon: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="400px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo" buttonIcon="add" buttonIconSize="large">
          Add
        </ButtonToggle>
        <ButtonToggle value="bar" buttonIcon="share" buttonIconSize="large">
          Share
        </ButtonToggle>
        <ButtonToggle value="baz" buttonIcon="tick" buttonIconSize="large">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
```