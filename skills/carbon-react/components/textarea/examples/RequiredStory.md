```tsx
export const RequiredStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      required
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
```