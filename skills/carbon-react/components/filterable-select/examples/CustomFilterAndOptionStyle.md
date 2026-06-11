```tsx
export const CustomFilterAndOptionStyle: Story = () => {
  const [filterText, setFilterText] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  const data = useMemo(
    () =>
      [
        { text: "Amber", color: "#FFBF00" },
        { text: "Black", color: "#000000" },
        { text: "Blue", color: "#0000FF" },
        { text: "Brown", color: "#A52A2A" },
        { text: "Green", color: "#008000" },
        { text: "Orange", color: "#FFA500" },
        { text: "Pink", color: "#FFC0CB" },
        { text: "Purple", color: "#800080" },
        { text: "Red", color: "#FF0000" },
        { text: "White", color: "#FFFFFF" },
        { text: "Yellow", color: "#FFFF00" },
      ].filter(
        ({ text }) =>
          !filterText ||
          (filterText.trim().length &&
            text.toLowerCase().includes(filterText.trim().toLowerCase())),
      ),
    [filterText],
  );

  const handleChange = useCallback((e: CustomSelectChangeEvent) => {
    if (e.selectionConfirmed && e.target?.value) {
      setSelectedColor(e.target.value as string);
    } else {
      setSelectedColor(undefined);
    }
  }, []);

  return (
    <Box height={280}>
      <Typography variant="strong" mb={2} display="block">
        Selected Color:{" "}
        {selectedColor ? (
          <Icon type="favourite" color={selectedColor} />
        ) : (
          "[none]"
        )}
      </Typography>
      <FilterableSelect
        onChange={handleChange}
        onFilterChange={setFilterText}
        name="Custom filter and option styles"
        id="custom-filter-and-option-styles"
        label="Color"
        disableDefaultFiltering
        leftChildren={
          selectedColor && (
            <Box display="flex" alignItems="center" ml={1}>
              <Icon type="favourite" color={selectedColor} />
            </Box>
          )
        }
        value={selectedColor ?? ""}
      >
        {data.map(({ text, color }) => (
          <Option text={text} value={color} key={color}>
            <Icon type="favourite" color={color} mr={1} />
            {text}
          </Option>
        ))}
      </FilterableSelect>
    </Box>
  );
};
```