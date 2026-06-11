```tsx
export const InputHintStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      inputHint="Hint text (optional)."
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
```