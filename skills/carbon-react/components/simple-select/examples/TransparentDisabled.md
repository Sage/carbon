```tsx
export const TransparentDisabled: Story = () => {
  const [value, setValue] = useState("4");
  return (
    <Box height={250} width={150}>
      <Select
        name="transparent"
        id="transparent"
        transparent
        label="Choose a colour"
        disabled
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  );
};
```