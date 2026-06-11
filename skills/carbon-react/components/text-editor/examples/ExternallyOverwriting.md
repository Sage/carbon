```tsx
export const ExternallyOverwriting: Story = () => {
  const [content, setContent] = useState("");
  const [resetKey, setResetKey] = useState(generateGuid); // Use a guid string as a key for the editor

  const handleSubmit: FormProps["onSubmit"] = async (ev) => {
    ev.preventDefault();

    await saveContent(content); // Saving content to a server or local storage

    setResetKey(generateGuid()); // Reset editor by changing the key
    setContent("");
  };

  return (
    <Box mx={2} my={0}>
      <Form
        onSubmit={handleSubmit}
        saveButton={
          <Button type="submit" buttonType="primary">
            Save
          </Button>
        }
      >
        <TextEditor
          key={resetKey}
          labelText="Feedback"
          initialValue={createEmpty()}
          onChange={(value) => setContent(createFromHTML(value))}
        />
      </Form>
    </Box>
  );
};
```