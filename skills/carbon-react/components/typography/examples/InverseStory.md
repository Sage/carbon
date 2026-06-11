```tsx
export const InverseStory: Story = () => (
  <Box
    backgroundColor="black"
    display="flex"
    flexDirection="column"
    gap={2}
    p={2}
  >
    <Typography variant="p" inverse>
      Paragraph (Default)
    </Typography>
    <Typography variant="h1" inverse>
      Heading Level 1
    </Typography>
    <Typography variant="h2" inverse>
      Heading Level 2
    </Typography>
    <Typography variant="h3" inverse>
      Heading Level 3
    </Typography>
    <Typography variant="h4" inverse>
      Heading Level 4
    </Typography>
    <Typography variant="h5" inverse>
      Heading Level 5
    </Typography>
    <Typography variant="section-heading" inverse>
      Segment Header
    </Typography>
    <Typography variant="section-subheading" inverse>
      Segment Subheader
    </Typography>
    <Typography variant="strong" inverse>
      Strong Text
    </Typography>
    <Typography variant="b" inverse>
      Bold Text
    </Typography>
    <Typography variant="p" inverse>
      This text contains{" "}
      <Typography variant="sup" inverse>
        superscript
      </Typography>{" "}
      content
    </Typography>
    <Typography variant="p" inverse>
      This text contains{" "}
      <Typography variant="sub" inverse>
        subscript
      </Typography>{" "}
      content
    </Typography>
    <Typography variant="ul" inverse>
      <li>Unordered List</li>
      <li>Unordered List</li>
      <li>Unordered List</li>
    </Typography>
    <Typography variant="ol" inverse>
      <li>Ordered List</li>
      <li>Ordered List</li>
      <li>Ordered List</li>
    </Typography>
  </Box>
);
```