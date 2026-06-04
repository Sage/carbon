```tsx
export const ProgrammaticFocus = () => {
  const editorRef = useRef<TextEditorHandle>(null);

  return (
    <Box mx={2} my={0}>
      <Button mb="30px" onClick={() => editorRef.current?.focus()}>
        Focus the editor
      </Button>

      <TextEditor
        ref={editorRef}
        namespace="storybook-default"
        labelText="Text Editor"
      />
    </Box>
  );
};
```