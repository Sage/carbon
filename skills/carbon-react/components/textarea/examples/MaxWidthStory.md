```tsx
export const MaxWidthStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      maxWidth="70%"
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
```