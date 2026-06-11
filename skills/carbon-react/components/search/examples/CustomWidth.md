```tsx
export const CustomWidth: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Search
      placeholder="Search..."
      onChange={(e) => setValue(e.target.value)}
      value={value}
      searchWidth="375px"
    />
  );
};
```