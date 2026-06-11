```tsx
export const ListWidth: Story = () => {
  const [value, setValue] = useState("");
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };
  return (
    <Box height={200} width={200}>
      <Select
        name="listWidth"
        id="listWidth"
        label="color"
        listWidth={350}
        listPlacement="bottom-start"
        value={value}
        onChange={handleChange}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
    </Box>
  );
};
```