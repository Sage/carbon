```tsx
export const ToolbarControls: Story = {
  render: (args: TextEditorProps) => (
    <Box mx={2} my={0}>
      <TextEditor {...args} />
    </Box>
  ),
  args: {
    labelText: "Text Editor Label",
    rows: 4,
    size: "medium",
    namespace: "storybook-demo",
    toolbarControls: ["typography", "italic", "unordered-list", "link"],
  },
};
```