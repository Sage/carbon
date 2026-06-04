```tsx
export const OnSave: Story = () => {
  const [data, setData] = useState<EditorFormattedValues>({
    htmlString: "<p><br></p>",
    json: undefined,
  });
  const [showData, setShowData] = useState(false);
  return (
    <Box mx={2} my={0}>
      <>
        <TextEditor
          namespace="storybook-onsave"
          labelText="Text Editor"
          onSave={({ htmlString, json }) => setData({ htmlString, json })}
        />
      </>
      <Button
        buttonType="primary"
        size="small"
        my={2}
        onClick={() => setShowData(!showData)}
      >
        Show Data Formats
      </Button>
      {showData && (
        <Box
          display="flex"
          flexDirection="row"
          gap={4}
          justifyContent="space-around"
        >
          <Box maxWidth="30%">
            <Typography variant="h4" mb={1}>
              HTML
            </Typography>
            {data?.htmlString || "No content"}
          </Box>
          <Box maxWidth="30%">
            <Typography variant="h4" mb={1}>
              JSON
            </Typography>
            {JSON.stringify(data?.json, null, 2) || "No content"}
          </Box>
        </Box>
      )}
    </Box>
  );
};
```