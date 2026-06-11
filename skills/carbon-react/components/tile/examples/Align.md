```tsx
export const Align: Story = () => {
  return (
    <Tile my={1} py={0}>
      <FlexTileContainer>
        <FlexTileCell justifyContent="flex-start" py={2}>
          <FlexTileDivider />
          <Box>Align left</Box>
        </FlexTileCell>
        <FlexTileCell justifyContent="flex-end" py={2}>
          <FlexTileDivider />
          <Box>Align right</Box>
        </FlexTileCell>
        <FlexTileCell justifyContent="center" py={2}>
          <FlexTileDivider />
          <Box>Align center</Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
```