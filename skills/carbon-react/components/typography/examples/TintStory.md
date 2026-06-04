```tsx
export const TintStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p" tint="default">
      Default tint paragraph text
    </Typography>
    <Typography variant="p" tint="alt">
      Alt tint paragraph text
    </Typography>
    <Typography variant="strong" tint="default">
      Strong Default
    </Typography>
    <Typography variant="strong" tint="alt">
      Strong Alt
    </Typography>
    <Typography variant="b" tint="default">
      Bold Default
    </Typography>
    <Typography variant="b" tint="alt">
      Bold Alt
    </Typography>
    <Typography variant="p" tint="default">
      Text with{" "}
      <Typography variant="sup" tint="default">
        superscript
      </Typography>{" "}
      default
    </Typography>
    <Typography variant="p" tint="alt">
      Text with{" "}
      <Typography variant="sup" tint="alt">
        superscript
      </Typography>{" "}
      alt
    </Typography>
    <Typography variant="p" tint="default">
      Text with{" "}
      <Typography variant="sub" tint="default">
        subscript
      </Typography>{" "}
      default
    </Typography>
    <Typography variant="p" tint="alt">
      Text with{" "}
      <Typography variant="sub" tint="alt">
        subscript
      </Typography>{" "}
      alt
    </Typography>
    <Typography variant="ul" tint="default">
      <li>Unordered List Default</li>
      <li>Unordered List Default</li>
      <li>Unordered List Default</li>
    </Typography>
    <Typography variant="ul" tint="alt">
      <li>Unordered List Alt</li>
      <li>Unordered List Alt</li>
      <li>Unordered List Alt</li>
    </Typography>
    <Typography variant="ol" tint="default">
      <li>Ordered List Default</li>
      <li>Ordered List Default</li>
      <li>Ordered List Default</li>
    </Typography>
    <Typography variant="ol" tint="alt">
      <li>Ordered List Alt</li>
      <li>Ordered List Alt</li>
      <li>Ordered List Alt</li>
    </Typography>
  </Box>
);
```