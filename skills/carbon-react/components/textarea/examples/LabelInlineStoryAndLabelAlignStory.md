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

export const LabelAlignStory: Story = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      {(["right", "left"] as const).map((alignment) => (
        <Textarea
          label="Textarea"
          labelInline
          inputWidth={50}
          key={alignment}
          labelAlign={alignment}
          mb={2}
          name={`ta-${alignment}`}
          value={state[`ta-${alignment}`] || ""}
          onChange={setValue}
        />
      ))}
    </>
  );
};
```