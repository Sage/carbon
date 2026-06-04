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