```tsx
export const ImageWithPosition: Story = () => (
  <Image
    m={3}
    height="700px"
    backgroundImage={`url("${flexibleSvg}")`}
    position="static"
  >
    <Box
      height="700px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4">
        Here is an example of Image with position static
      </Typography>
    </Box>
  </Image>
);
```