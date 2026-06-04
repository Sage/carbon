```tsx
export const Default: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Search
      placeholder="Search..."
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    />
  );
};
```