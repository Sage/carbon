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
      <Box width="59%">
        <Textbox
          label="Textbox"
          labelInline
          inputWidth={90}
          value=""
          onChange={() => {}}
        />
        <Textbox
          label="Textbox"
          labelInline
          inputWidth={90}
          value=""
          onChange={() => {}}
        />
        <Box ml="11%" mr="4px">
          <Hr mb={7} mt={7} />
        </Box>
        <Textbox
          label="Textbox"
          labelInline
          inputWidth={90}
          value=""
          onChange={() => {}}
        />
      </Box>
    </Form>
  );
};
```