```tsx
export const OnChange: Story = () => {
  const [valueString, setValueString] = React.useState<string | undefined>(
    undefined,
  );
  const [valueHTML, setValueHTML] = React.useState<string | undefined>(
    undefined,
  );

  const handleChange = useCallback(
    (value: string, formattedValues: EditorFormattedValues) => {
      setValueString(value);
      setValueHTML(formattedValues.htmlString);
    },
    [],
  );

  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-onchange"
        labelText="Text Editor"
        onChange={handleChange}
      />
      <div>Unformatted content: {valueString || "No content"}</div>
      <div>
        HTML formatted content:{" "}
        {valueHTML === "<p><br></p>" ? "No content" : valueHTML}
      </div>
    </Box>
  );
};
```