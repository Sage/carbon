```tsx
export const WeightStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p" weight="regular">
      Regular weight paragraph text
    </Typography>
    <Typography variant="p" weight="medium">
      Medium weight paragraph text
    </Typography>
    <Typography variant="strong" weight="regular">
      Strong Regular
    </Typography>
    <Typography variant="strong" weight="medium">
      Strong Medium
    </Typography>
    <Typography variant="b" weight="regular">
      Bold Regular
    </Typography>
    <Typography variant="b" weight="medium">
      Bold Medium
    </Typography>
    <Typography variant="p" weight="regular">
      Text with{" "}
      <Typography variant="sup" weight="regular">
        superscript
      </Typography>{" "}
      regular
    </Typography>
    <Typography variant="p" weight="medium">
      Text with{" "}
      <Typography variant="sup" weight="medium">
        superscript
      </Typography>{" "}
      medium
    </Typography>
    <Typography variant="p" weight="regular">
      Text with{" "}
      <Typography variant="sub" weight="regular">
        subscript
      </Typography>{" "}
      regular
    </Typography>
    <Typography variant="p" weight="medium">
      Text with{" "}
      <Typography variant="sub" weight="medium">
        subscript
      </Typography>{" "}
      medium
    </Typography>
    <Typography variant="ul" weight="regular">
      <li>Unordered List Regular</li>
      <li>Unordered List Regular</li>
      <li>Unordered List Regular</li>
    </Typography>
    <Typography variant="ul" weight="medium">
      <li>Unordered List Medium</li>
      <li>Unordered List Medium</li>
      <li>Unordered List Medium</li>
    </Typography>
    <Typography variant="ol" weight="regular">
      <li>Ordered List Regular</li>
      <li>Ordered List Regular</li>
      <li>Ordered List Regular</li>
    </Typography>
    <Typography variant="ol" weight="medium">
      <li>Ordered List Medium</li>
      <li>Ordered List Medium</li>
      <li>Ordered List Medium</li>
    </Typography>
  </Box>
);
```