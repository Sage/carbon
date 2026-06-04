```tsx
export const IconOnly: Story = () => {
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
        label="Icon only example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo" buttonIcon="add" aria-label="add" />
        <ButtonToggle value="bar" buttonIcon="share" aria-label="share" />
        <ButtonToggle value="baz" buttonIcon="tick" aria-label="tick" />
      </ButtonToggleGroup>
    </Box>
  );
};
```