```tsx
export const LargeLargeIcon: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="450px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large with large icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle
          size="large"
          value="foo"
          buttonIcon="add"
          buttonIconSize="large"
        >
          Add
        </ButtonToggle>
        <ButtonToggle
          size="large"
          value="bar"
          buttonIcon="share"
          buttonIconSize="large"
        >
          Share
        </ButtonToggle>
        <ButtonToggle
          size="large"
          value="baz"
          buttonIcon="tick"
          buttonIconSize="large"
        >
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
```