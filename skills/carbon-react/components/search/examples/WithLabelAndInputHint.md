```tsx
export const WithLabelAndInputHint: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <Search
        label="Search"
        inputHint="Hint text (optional)."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </Box>
  );
};
```