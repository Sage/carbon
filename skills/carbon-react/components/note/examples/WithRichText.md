```tsx
export const WithRichText: Story = () => {
  const html = `<p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i> Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>
  <ul><li>unordered</li></ul>
  <ol><li>ordered</li></ol></br>
  <p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i></p>
  <p>Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>`;

  return (
    <Box width="50%">
      <Note
        noteContent={html}
        name="Lauren Smith"
        createdDate="23 May 2020, 12:08 PM"
      />
    </Box>
  );
};
```