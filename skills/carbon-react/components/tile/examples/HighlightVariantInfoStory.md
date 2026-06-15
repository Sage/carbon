```tsx
export const HighlightVariantInfoStory: Story = () => {
  return (
    <>
      <Tile highlightVariant="info" roundness="small">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="info">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="info" roundness="large">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </>
  );
};
```