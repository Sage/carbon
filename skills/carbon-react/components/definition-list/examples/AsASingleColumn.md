```tsx
export const AsASingleColumn: Story = () => (
  <Dl w={200} dtTextAlign="left" asSingleColumn>
    <Dt>First</Dt>
    <Dd>Description</Dd>
    <Dt>Second</Dt>
    <Dd>
      <Box display="inline-flex" alignItems="center">
        <Box mr={1}>Details example</Box>
        <Icon type="tick" />
      </Box>
    </Dd>
    <Dt>Third</Dt>
    <Dd>Description</Dd>
  </Dl>
);
```