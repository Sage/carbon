```tsx
export const FlexContainers: Story = () => {
  return (
    <Tile my={1} py={0}>
      <FlexTileContainer>
        <FlexTileCell flexBasis="80px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 80px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="120px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 120px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="160px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="200px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 200px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="240px" py={2} maxWidth="400px">
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 240px - maxWidth 400px
          </Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
```