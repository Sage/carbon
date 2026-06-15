```tsx
export const WithLinkAddedCallback: Story = () => {
  const [options, setOptions] = useState<{ url: string; state: string }>({
    url: "",
    state: "",
  });

  const handleLinkAdded = useCallback((link: string, state: string) => {
    setOptions({ url: link, state });
  }, []);

  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-linkscallback"
        labelText="Text Editor"
        onLinkAdded={handleLinkAdded}
      />
      <span>
        <strong>Link:</strong> {options.url || "No link added"}
        <br />
        <strong>Mutation:</strong> {options.state || "None"}
      </span>
    </Box>
  );
};
```