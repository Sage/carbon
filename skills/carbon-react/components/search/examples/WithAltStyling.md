```tsx
export const WithAltStyling: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box width="700px" height="108px" p={4} backgroundColor="#000000">
      <Search
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        variant="dark"
        mb={2}
      />
      <Search
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
        variant="dark"
      />
    </Box>
  );
};
```