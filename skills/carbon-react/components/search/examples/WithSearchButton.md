```tsx
export const WithSearchButton: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <Search
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
        searchButtonAriaLabel="search button aria label"
      />
    </Box>
  );
};
```