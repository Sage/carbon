```tsx
export const ListWidth: Story = () => {
  const [value, setValue] = useState<string>("");
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };
  return (
    <Box height={200} width={200}>
      <FilterableSelect
        name="listWidth"
        id="listWidth"
        label="color"
        labelInline
        listWidth={350}
        listPlacement="bottom-start"
        value={value}
        onChange={handleChange}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </FilterableSelect>
    </Box>
  );
};
```