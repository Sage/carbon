```tsx
export const DisabledStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      disabled
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
```