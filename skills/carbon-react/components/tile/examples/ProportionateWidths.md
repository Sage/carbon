```tsx
export const ProportionateWidths: Story = () => {
  return (
    <Tile my={1} py={0}>
      <FlexTileContainer>
        <FlexTileCell flexGrow={1} py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px normal
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={2} py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px wide
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={3} py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px extra-wide
          </Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
```