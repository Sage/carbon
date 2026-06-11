```tsx
export const Translations: Story = () => {
  return (
    <I18nProvider
      locale={{
        ...enGB,
        textEditor: {
          boldAria: () => "Make text bold",
          cancelButton: () => "No",
          cancelButtonAria: () => "Cancel the current content",
          characterCounter: (count: string | number) =>
            `You've got ${count} characters left`,
          characterLimit: (count: number) =>
            `Please delete the last ${count} characters`,
          contentEditorAria: () => "Rich text content editor",
          italicAria: () => "Make text italic",
          orderedListAria: () => "Ordered list",
          saveButton: () => "Yes",
          saveButtonAria: () => "Save the current content",
          toolbarAriaLabel: () => "Formatting",
          unorderedListAria: () => "Unordered list",
          underlineAria: () => "Underline text",
          hyperlink: {
            buttonAria: () => "Hyperlink",
            cancelButton: () => "Cancel",
            cancelButtonAria: () => "Cancel",
            dialogTitle: () => "Add link",
            linkFieldLabel: () => "Link",
            saveButton: () => "Save",
            saveButtonAria: () => "Save",
            textFieldLabel: () => "Text",
          },
          typography: {
            selectAria: () => "Heading type",
            paragraph: () => "Paragraph",
            title: () => "Title",
            subtitle: () => "Subtitle",
            sectionHeader: () => "Section header",
            sectionSubheader: () => "Section subheader",
          },
          mentions: {
            listAriaLabel: () => "List of mentionable people",
          },
        },
      }}
    >
      <Box mx={2} my={0}>
        <TextEditor
          namespace="storybook-customtranslations"
          characterLimit={10}
          labelText="Translated Text Editor"
          onCancel={() => {}}
          onSave={() => {}}
        />
      </Box>
    </I18nProvider>
  );
};
```