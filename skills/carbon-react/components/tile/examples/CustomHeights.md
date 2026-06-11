```tsx
export const CustomHeights: Story = () => {
  return (
    <Box display="flex" flexDirection="row" height="250px" gap="8px">
      <Tile variant="tile" orientation="vertical" height="35%">
        <Box>
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
        </Box>
      </Tile>
      <Tile variant="tile" orientation="vertical" height="50%">
        <Box pt={2}>
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
        </Box>
      </Tile>
      <Tile variant="tile" orientation="vertical" height="75%">
        <Box>
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
        </Box>
        <Box>Content</Box>
      </Tile>
      <Tile variant="tile" orientation="vertical" height="100%">
        <Box>
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
        </Box>
        <Box>Content</Box>
        <Box>Content</Box>
      </Tile>
    </Box>
  );
};
```