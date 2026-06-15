```tsx
export const LabelInlineStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      labelInline
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
```