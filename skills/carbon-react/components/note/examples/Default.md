```tsx
export const Default: Story = () => {
  const noteContent = "Here is some plain text content";
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