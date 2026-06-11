```tsx
export const CustomGaps: Story = () => {
  return (
    <>
      <Tile my={1} py={0}>
        <FlexTileContainer>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body One</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body Two</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">
              Test Body Three With a very very long text
            </Box>
          </FlexTileCell>
        </FlexTileContainer>
      </Tile>
      <Tile my={1} py={0}>
        <FlexTileContainer columnGap={6}>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body One</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body Two</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">
              Test Body Three With a very very long text
            </Box>
          </FlexTileCell>
        </FlexTileContainer>
      </Tile>
    </>
  );
};
```