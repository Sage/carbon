```tsx
export const WithCustomColoredPills: Story = () => {
  const [value, setValue] = useState<string[]>(["1", "3"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }

  return (
    <Box height={250}>
      <MultiSelect
        name="simple"
        id="simple"
        label="color"
        value={value}
        onChange={onChangeHandler}
      >
        <Option text="Amber" value="1" borderColor="#FFBF00" fill />
        <Option text="Black" value="2" borderColor="blackOpacity65" fill />
        <Option text="Blue" value="3" borderColor="productBlue" />
        <Option text="Brown" value="4" borderColor="brown" fill />
        <Option text="Green" value="5" borderColor="productGreen" />
        <Option text="Orange" value="6" borderColor="orange" />
        <Option text="Pink" value="7" borderColor="pink" />
        <Option text="Purple" value="8" borderColor="purple" />
        <Option text="Red" value="9" borderColor="red" fill />
        <Option text="White" value="10" borderColor="white" />
        <Option text="Yellow" value="11" borderColor="yellow" fill />
      </MultiSelect>
    </Box>
  );
};
```