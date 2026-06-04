```tsx
export const OnFormSubmission: Story = () => {
  const [data, setData] = useState<EditorFormattedValuesWithInlineStyles>({
    htmlString: "<p><br></p>",
    json: undefined,
    htmlStringWithInlineStyles: "",
  });
  const [showData, setShowData] = useState(false);

  const handleFormSubmit: FormProps["onSubmit"] = async (ev) => {
    ev.preventDefault();
  };

  return (
    <Box mx={2} my={0}>
      <Form
        onSubmit={handleFormSubmit}
        saveButton={
          <Button type="submit" buttonType="primary">
            Submit Form
          </Button>
        }
      >
        <TextEditor
          namespace="storybook-onformsubmission"
          labelText="Text Editor"
          onFormSubmission={setData}
        />
      </Form>
      <Button
        buttonType="primary"
        size="small"
        my={2}
        onClick={() => setShowData(!showData)}
      >
        Show Data Formats
      </Button>
      {showData && (
        <Box display="flex" flexDirection="column" gap={4}>
          <Box>
            <Typography variant="h4" mb={1}>
              HTML (with Classes)
            </Typography>
            <Box
              p={2}
              backgroundColor="--colorsUtilityYin025"
              borderRadius="borderRadius050"
              maxHeight="200px"
              overflow="auto"
            >
              {data?.htmlString || "No content"}
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" mb={1}>
              HTML (with Inline Styles)
            </Typography>
            <Box
              p={2}
              backgroundColor="--colorsUtilityYin025"
              borderRadius="borderRadius050"
              maxHeight="200px"
              overflow="auto"
            >
              {data?.htmlStringWithInlineStyles || "No content"}
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" mb={1}>
              JSON
            </Typography>
            <Box
              p={2}
              backgroundColor="--colorsUtilityYin025"
              borderRadius="borderRadius050"
              maxHeight="200px"
              overflow="auto"
            >
              {JSON.stringify(data?.json, null, 2) || "No content"}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
```