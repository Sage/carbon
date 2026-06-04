```tsx
export const FluidStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography fluid variant="p">
      Paragraph (Default)
    </Typography>
    <Typography fluid variant="h1">
      Heading Level 1
    </Typography>
    <Typography fluid variant="h2">
      Heading Level 2
    </Typography>
    <Typography fluid variant="h3">
      Heading Level 3
    </Typography>
    <Typography fluid variant="h4">
      Heading Level 4
    </Typography>
    <Typography fluid variant="h5">
      Heading Level 5
    </Typography>
    <Typography fluid variant="section-heading">
      Segment Header
    </Typography>
    <Typography fluid variant="section-subheading">
      Segment Subheader
    </Typography>
    <Typography fluid variant="strong">
      Strong Text
    </Typography>
    <Typography fluid variant="b">
      Bold Text
    </Typography>
    <Typography fluid variant="p">
      This text contains{" "}
      <Typography fluid variant="sup">
        superscript
      </Typography>{" "}
      content
    </Typography>
    <Typography fluid variant="p">
      This text contains{" "}
      <Typography fluid variant="sub">
        subscript
      </Typography>{" "}
      content
    </Typography>
    <Typography fluid variant="ul">
      <li>Unordered List</li>
      <li>Unordered List</li>
      <li>Unordered List</li>
    </Typography>
    <Typography fluid variant="ol">
      <li>Ordered List</li>
      <li>Ordered List</li>
      <li>Ordered List</li>
    </Typography>
  </Box>
);
```