```tsx
export const WithTileHeader: Story = () => (
  <Box>
    <Tile orientation="vertical" width={400}>
      <TileContent>
        <TileHeader variant="transparent" pb={2}>
          <Typography pr={2} display="inline" variant="b">
            Example bold text
          </Typography>
          <Typography display="inline">Example text</Typography>
        </TileHeader>
        <Box pt={2}>
          <Typography pb={2} variant="h4" fontWeight="500">
            Example tile body
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </Box>
      </TileContent>
    </Tile>
    <Box my={3} />
    <Tile px={0} pt={0} orientation="vertical" width={400}>
      <TileContent>
        <TileHeader p={3}>
          <Typography pr={2} display="inline" variant="b">
            Example bold text
          </Typography>
          <Typography display="inline">Example text</Typography>
        </TileHeader>
        <Box px={3} pt={3}>
          <Typography pb={2} variant="h4" fontWeight="500">
            Example tile body
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </Box>
      </TileContent>
    </Tile>
    <Box my={3} />
    <Tile px={0} pt={0} orientation="vertical" width={400}>
      <TileContent>
        <TileHeader p={2} variant="black" />
        <Box px={3} pt={3}>
          <Typography pb={2} variant="h4" fontWeight="500">
            Example tile body
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </Box>
      </TileContent>
    </Tile>
    <Box my={3} />
    <Tile px={0} pt={0} orientation="vertical" width={400}>
      <TileContent>
        <TileHeader p={2} variant="grey" />
        <Box px={3} pt={3}>
          <Typography pb={2} variant="h4" fontWeight="500">
            Example tile body
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </Box>
      </TileContent>
    </Tile>
  </Box>
);
```