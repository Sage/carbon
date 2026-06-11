```tsx
export const ReadOnly: Story = () => {
  const initialValue = `<p><span style="white-space: pre-wrap;">This is an HTML example.</span><br><a href="https://carbon.sage.com/?path=/story/welcome--welcome-page" rel="noreferrer" ><span data-lexical-text="true">Carbon</span></a></p>`;
  const value = createFromHTML(initialValue);
  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-readonly"
        labelText="Text Editor"
        readOnly
        initialValue={value}
      />
    </Box>
  );
};
```