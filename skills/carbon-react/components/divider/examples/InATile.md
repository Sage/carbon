```tsx
export const InATile: Story = () => {
  return (
    <Tile width={800} orientation="vertical">
      <TileContent>
        <Content title="Test Title One">Test Body One</Content>
      </TileContent>
      <TileContent>
        <Box display="inline-flex">
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} mr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
        </Box>
      </TileContent>
    </Tile>
  );
};
```