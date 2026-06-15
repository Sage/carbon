```tsx
export const WithSearchButtonLocaleOverride: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <I18nProvider locale={{ search: { searchButtonText: () => "Find" } }}>
        <Search
          onChange={(e) => setValue(e.target.value)}
          value={value}
          searchButton
        />
      </I18nProvider>
    </Box>
  );
};
```