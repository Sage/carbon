```tsx
export const ListWidth: Story = () => {
  const [value, setValue] = useState<string[]>([]);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value: updatedValue } = ev.target;

    if (Array.isArray(updatedValue)) {
      setValue(updatedValue);
    }
  };
  return (
    <Box height={200} width={200}>
      <MultiSelect
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
      </MultiSelect>
    </Box>
  );
};
```