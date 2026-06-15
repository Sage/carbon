```tsx
export const Links: Story = () => {
  const defaultHTML = `<a href="https://carbon.sage.com/?path=/story/welcome--welcome-page" rel="noreferrer" ><span data-lexical-text="true">Carbon</span></a>`;
  const value = createFromHTML(defaultHTML);
  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-links"
        labelText="Text Editor"
        initialValue={value}
      />
    </Box>
  );
};
```