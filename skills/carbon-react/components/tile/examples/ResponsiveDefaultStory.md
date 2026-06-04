```tsx
export const ResponsiveDefaultStory: Story = () => {
  return (
    <Tile m={0} py={0}>
      <FlexTileContainer>
        <FlexTileCell py={2}>
          <FlexTileDivider />
          Test Body One
        </FlexTileCell>
        <FlexTileCell py={2}>
          <FlexTileDivider />
          Test Body Two
        </FlexTileCell>
        <FlexTileCell py={2}>
          <FlexTileDivider />
          Test Body Three With a very very long text
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
```