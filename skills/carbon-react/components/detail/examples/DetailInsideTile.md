```tsx
export const DetailInsideTile: Story = () => (
  <Tile width="60%">
    <TileContent pt="16px">
      <Detail>This example of Detail just has children.</Detail>
    </TileContent>
    <TileContent pt="8px">
      <Detail footnote="This is a footnote">
        This example of Detail has children and also a footnote.
      </Detail>
    </TileContent>
    <TileContent pb="16px">
      <Detail icon="settings" footnote="This is a footnote">
        Where as this example of Detail has a footnote and icon.
      </Detail>
    </TileContent>
  </Tile>
);
```