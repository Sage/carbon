```tsx
export const Grey: Story = () => {
  return (
    <Tile variant="grey" orientation="horizontal">
      <TileContent width="40%">Test Body One</TileContent>
      <TileContent width="80%">Test Body Two</TileContent>
      <TileContent width="120%">Test Body Three</TileContent>
    </Tile>
  );
};
```