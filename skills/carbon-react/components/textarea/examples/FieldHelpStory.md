```tsx
export const FieldHelpStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      fieldHelp="Help"
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
```