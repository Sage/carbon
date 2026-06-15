```tsx
export const HighlightVariantGradientStory: Story = () => {
  return (
    <>
      <Tile highlightVariant="gradient" roundness="small">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="gradient">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="gradient" roundness="large">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </>
  );
};
```