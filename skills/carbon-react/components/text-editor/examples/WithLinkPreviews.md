```tsx
export const WithLinkPreviews: Story = () => {
  const initialValue = `<p><span data-lexical-text="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi ipsum, facilisis ut luctus non, gravida in orci. Aliquam risus massa, consequat non facilisis vel, bibendum quis nunc. Cras sit amet velit vel libero molestie accumsan. Integer id ipsum nec nunc porta bibendum. Aenean ut porta risus, eget dignissim felis. Praesent vitae tempus ante. Mauris nibh risus, congue ac augue ac, congue auctor metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vitae enim arcu. Integer quis mattis nunc, in porta neque. Proin sit amet purus congue, faucibus mauris id, consectetur justo. Vestibulum odio nisi, vehicula at odio ut, dapibus scelerisque tortor. Etiam vulputate massa orci, porttitor sollicitudin odio sollicitudin vitae. Mauris et eleifend dolor. Curabitur luctus lacinia sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus.</span></p>`;
  const value = createFromHTML(initialValue);

  const firstRender = useRef(false);
  const previews = useRef<React.JSX.Element[]>([]);
  const removeUrl = (reportedUrl: string | undefined) => {
    previews.current = previews.current.filter(
      (preview) => reportedUrl !== preview.props.url,
    );
  };

  if (!firstRender.current) {
    firstRender.current = true;
    previews.current.push(
      <EditorLinkPreview
        onClose={(urlString) => removeUrl(urlString)}
        title="Han Shot First"
        url="https://en.wikipedia.org/wiki/Han_shot_first"
        description="Had a slight weapons malfunction but, uh everything's perfectly all right now. We're fine. We're all fine here now. Thank you. How are you?"
        key="key-1"
      />,
    );
  }

  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-complexlinkpreviews"
        labelText="Text Editor"
        previews={previews.current}
        initialValue={value}
      />
    </Box>
  );
};
```