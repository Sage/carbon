```tsx
export const TriggerOnClear: Story = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <Search
        id="test"
        name="test"
        placeholder="Search..."
        triggerOnClear
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
      />
    </>
  );
};
```