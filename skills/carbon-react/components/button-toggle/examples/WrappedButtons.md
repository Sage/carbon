```tsx
export const WrappedButtons: Story = () => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box width={"375px"} display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        m={4}
        id="button-toggle-group-wrapped-id"
        label="Wrapped Group"
        fullWidth
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="add" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle value="share" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle value="tick" buttonIcon="tick">
          Tick
        </ButtonToggle>
        <ButtonToggle value="email" buttonIcon="email">
          Email
        </ButtonToggle>
        <ButtonToggle value="alert" buttonIcon="alert">
          Alert
        </ButtonToggle>
        <ButtonToggle value="calendar" buttonIcon="calendar">
          Calendar
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
```