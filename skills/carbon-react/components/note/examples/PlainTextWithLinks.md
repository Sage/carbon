```tsx
export const PlainTextWithLinks: Story = () => {
  const noteContent =
    "Hello, World! www.bbc.co.uk http://www.google.com https://www.sage.com";
  return (
    <Box width="50%">
      <Note
        name="Lauren Smith"
        noteContent={noteContent}
        createdDate="23 May 2020, 12:08 PM"
      />
    </Box>
  );
};
```