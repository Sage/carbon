```tsx
export const SizeStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p" size="M">
      M size paragraph text
    </Typography>
    <Typography variant="p" size="L">
      L size paragraph text
    </Typography>
    <Typography variant="strong" size="M">
      Strong M
    </Typography>
    <Typography variant="strong" size="L">
      Strong L
    </Typography>
    <Typography variant="b" size="M">
      Bold M
    </Typography>
    <Typography variant="b" size="L">
      Bold L
    </Typography>
    <Typography variant="p" size="M">
      Text with{" "}
      <Typography variant="sup" size="M">
        superscript
      </Typography>{" "}
      M
    </Typography>
    <Typography variant="p" size="L">
      Text with{" "}
      <Typography variant="sup" size="L">
        superscript
      </Typography>{" "}
      L
    </Typography>
    <Typography variant="p" size="M">
      Text with{" "}
      <Typography variant="sub" size="M">
        subscript
      </Typography>{" "}
      M
    </Typography>
    <Typography variant="p" size="L">
      Text with{" "}
      <Typography variant="sub" size="L">
        subscript
      </Typography>{" "}
      L
    </Typography>
    <Typography variant="ul" size="M">
      <li>Unordered List M</li>
      <li>Unordered List M</li>
      <li>Unordered List M</li>
    </Typography>
    <Typography variant="ul" size="L">
      <li>Unordered List L</li>
      <li>Unordered List L</li>
      <li>Unordered List L</li>
    </Typography>
    <Typography variant="ol" size="M">
      <li>Ordered List M</li>
      <li>Ordered List M</li>
      <li>Ordered List M</li>
    </Typography>
    <Typography variant="ol" size="L">
      <li>Ordered List L</li>
      <li>Ordered List L</li>
      <li>Ordered List L</li>
    </Typography>
  </Box>
);
```