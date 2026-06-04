```tsx
export const CustomBorders: Story = () => {
  return (
    <Box>
      <Tile
        orientation="vertical"
        width={400}
        borderWidth="borderWidth200"
        borderVariant="selected"
      >
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Selected variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile
        orientation="vertical"
        width={400}
        borderWidth="borderWidth200"
        borderVariant="positive"
      >
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Positive variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile
        orientation="vertical"
        width={400}
        borderWidth="borderWidth200"
        borderVariant="negative"
      >
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Negative variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile
        orientation="vertical"
        width={400}
        borderWidth="borderWidth300"
        borderVariant="caution"
      >
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Caution variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile orientation="vertical" width={400} borderWidth="borderWidth100">
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Default/neutral variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile
        orientation="vertical"
        width={400}
        borderWidth="borderWidth400"
        borderVariant="info"
      >
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Info variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
    </Box>
  );
};
```