```tsx
export const ResponsiveWithOverflowVisibleStory: Story = () => {
  return (
    <Tile m={0} p={0}>
      <FlexTileContainer overflow="visible">
        <FlexTileCell py={2}>Test Body One</FlexTileCell>
        <FlexTileCell py={2}>Test Body Two</FlexTileCell>
        <FlexTileCell py={2}>
          Test Body Three With a very very long text
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
```