```tsx
export const Sizes: Story = () => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  return (
    <Box height={350}>
      <Select
        name="size-small"
        id="size-small"
        label="Small"
        size="small"
        mb={2}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        name="size-medium"
        id="size-medium"
        label="Medium"
        size="medium"
        mb={2}
        value={value2}
        onChange={(ev) => setValue2(ev.target.value)}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        name="size-large"
        id="size-large"
        label="Large"
        size="large"
        value={value3}
        onChange={(ev) => setValue3(ev.target.value)}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
    </Box>
  );
};
```