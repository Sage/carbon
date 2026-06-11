```tsx
export const ReadOnlyStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      readOnly
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
```