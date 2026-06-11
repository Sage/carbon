```tsx
export const SettingInitialValues: Story = () => {
  const initialValue = `<p><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const value = createFromHTML(initialValue); // Use JSON.stringify(initialValue) when using JSON objects

  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-withhtmlvalue"
        labelText="Text Editor"
        initialValue={value}
      />
    </Box>
  );
};
```