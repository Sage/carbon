```tsx
export const DetailInsideCard: Story = () => (
  <Card width="300px">
    <Box pt="16px">
      <Detail>This example of Detail just has children.</Detail>
    </Box>
    <Divider type="horizontal" />
    <Box pt="8px">
      <Detail footnote="This is a footnote">
        This example of Detail has children and also a footnote.
      </Detail>
    </Box>
    <Divider type="horizontal" />
    <Box pb="16px">
      <Detail icon="settings" footnote="This is a footnote">
        Where as this example of Detail has a footnote and icon.
      </Detail>
    </Box>
  </Card>
);
```