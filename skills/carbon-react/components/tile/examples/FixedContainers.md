```tsx
export const FixedContainers: Story = () => {
  return (
    <Tile my={1} py={0}>
      <FlexTileContainer>
        <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed fit-content
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="80px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 80px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="120px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 120px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="160px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 160px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="200px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 200px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="240px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 240px
          </Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
```