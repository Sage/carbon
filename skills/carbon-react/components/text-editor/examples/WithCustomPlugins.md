```tsx
export const WithCustomPlugins: Story = () => {
  const CustomWordCountPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [wordCount, setWordCount] = useState(0);
    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const text = $getRoot().getTextContent();
          const count = text.trim().split(/\s+/).filter(Boolean).length;
          setWordCount(count);
        });
      });
    }, [editor]);
    return <Typography m={1}>Word Count: {wordCount}</Typography>;
  };

  return (
    <Box mx={2} my={0}>
      <TextEditor
        placeholder="Example of a custom word count plugin that updates in real time, showing the number of words at the bottom left of the editor as you type."
        namespace="storybook-default"
        labelText="Text Editor"
        customPlugins={<CustomWordCountPlugin />}
      />
    </Box>
  );
};
```