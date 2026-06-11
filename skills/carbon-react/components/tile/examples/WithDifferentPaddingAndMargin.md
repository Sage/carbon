```tsx
export const WithDifferentPaddingAndMargin: Story = () => {
  return (
    <>
      <Tile p={0} m={0} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
      <Tile p={1} m={1} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
      <Tile p={2} m={2} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
      <Tile p={3} m={3} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
      <Tile p={4} m={4} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
      <Tile p={5} m={5} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
    </>
  );
};
```