```tsx
export const CustomWidths: Story = () => {
  return (
    <Box>
      <Tile variant="tile" orientation="horizontal" width="75%">
        <TileContent>Test Body</TileContent>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" orientation="horizontal" width={1 / 4}>
        <TileContent>Test Body</TileContent>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" orientation="horizontal" width={150}>
        <TileContent>Test Body</TileContent>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" orientation="horizontal">
        <TileContent width="30%">Test Body One</TileContent>
        <TileContent width={150}>Test Body Two</TileContent>
        <TileContent width={1 / 4}>Test Body Three</TileContent>
      </Tile>
    </Box>
  );
};
```