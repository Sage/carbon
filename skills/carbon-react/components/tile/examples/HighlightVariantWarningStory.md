```tsx
export const HighlightVariantWarningStory: Story = () => {
  return (
    <>
      <Tile highlightVariant="warning" roundness="small">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="warning">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="warning" roundness="large">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </>
  );
};
```