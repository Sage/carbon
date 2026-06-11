```tsx
export const LabelHelpStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      labelHelp="Help"
      helpAriaLabel="Help"
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
```