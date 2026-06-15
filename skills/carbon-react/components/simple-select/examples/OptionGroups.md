```tsx
export const OptionGroups: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box height={250}>
      <Select
        name="optGroups"
        id="optGroups"
        label="color"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <OptionGroupHeader label="Group one" icon="individual" />
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <OptionGroupHeader label="Group two" icon="shop" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <OptionGroupHeader label="Group three" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  );
};
```