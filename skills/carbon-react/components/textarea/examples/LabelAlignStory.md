```tsx
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