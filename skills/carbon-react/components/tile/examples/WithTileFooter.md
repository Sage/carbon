```tsx
export const WithTileFooter: Story = () => {
  return (
    <Box>
      <Tile orientation="vertical" width={400}>
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Example header
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
          <TileFooter variant="transparent" pt={2}>
            <Typography pr={2} display="inline" variant="b">
              Example bold text
            </Typography>
            <Typography display="inline">Example text</Typography>
          </TileFooter>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile px={0} pb={0} orientation="vertical" width={400}>
        <TileContent>
          <Box px={3}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example header
            </Typography>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
          <TileFooter p={3}>
            <Typography pr={2} display="inline" variant="b">
              Example bold text
            </Typography>
            <Typography display="inline">Example text</Typography>
          </TileFooter>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile px={0} pb={0} orientation="vertical" width={425}>
        <TileContent>
          <Box px={3}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example header
            </Typography>
            <Typography>Labore ipsum nostrud quis aliquip</Typography>
            <Divider type="horizontal" />
            <Typography>Labore ipsum nostrud quis aliquip</Typography>
          </Box>
          <TileFooter p={1}>
            <Box
              width="100%"
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={20} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={20} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
            </Box>
          </TileFooter>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile px={0} pb={0} orientation="vertical" width={400}>
        <TileContent>
          <Box px={3}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example header
            </Typography>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
          <TileFooter p={2} variant="black" />
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile px={0} pb={0} orientation="vertical" width={400}>
        <TileContent>
          <Box px={3}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example header
            </Typography>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
          <TileFooter p={2} variant="grey" />
        </TileContent>
      </Tile>
    </Box>
  );
};
```