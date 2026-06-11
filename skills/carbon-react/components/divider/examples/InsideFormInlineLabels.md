```tsx
export const InsideFormInlineLabels: Story = () => {
  return (
    <Form
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter={false}
    >
      <Box width="60%">
        <Textbox label="Textbox" labelInline value="" onChange={() => {}} />
        <Textbox label="Textbox" labelInline value="" onChange={() => {}} />
        <Box ml="17%">
          <Divider type="horizontal" mb={7} mt={7} />
        </Box>
        <Textbox label="Textbox" labelInline value="" onChange={() => {}} />
      </Box>
    </Form>
  );
};
```