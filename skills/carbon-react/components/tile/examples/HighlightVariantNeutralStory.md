```tsx
export const HighlightVariantNeutralStory: Story = () => {
  return (
    <>
      <Tile highlightVariant="neutral" roundness="small">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="neutral">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="neutral" roundness="large">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </>
  );
};
```