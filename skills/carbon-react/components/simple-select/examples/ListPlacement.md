```tsx
export const ListPlacement: Story = () => {
  const [listPlacement, setListPlacement] =
    useState<SimpleSelectProps["listPlacement"]>("bottom-end");
  const [value, setValue] = useState("");
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };
  return (
    <>
      <Button mr={1} onClick={() => setListPlacement("top-end")}>
        Top end
      </Button>
      <Button mr={1} onClick={() => setListPlacement("bottom-end")}>
        Bottom end
      </Button>
      <Button mr={1} onClick={() => setListPlacement("top-start")}>
        Top start
      </Button>
      <Button onClick={() => setListPlacement("bottom-start")}>
        Bottom Start
      </Button>
      <Box my="150px" ml="200px" width="200px">
        <Select
          name="listWidth"
          id="listWidth"
          label="color"
          labelInline
          listWidth={350}
          listPlacement={listPlacement}
          value={value}
          onChange={handleChange}
        >
          <Option text="Amber" value="1" />
          <Option text="Black" value="2" />
          <Option text="Blue" value="3" />
        </Select>
      </Box>
    </>
  );
};
```