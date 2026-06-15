```tsx
export const Hr: StoryObj = () => (
  <Box display="flex" flexDirection="column" width="200px" alignItems="center">
    <Box width={56} height={56} backgroundColor="grey" />
    <Divider type="horizontal" mt={2} mb={2} p={0} />
    <Box width={56} height={56} backgroundColor="grey" />
    <Divider type="horizontal" mt={2} mb={2} p={0} />
    <Box width={56} height={56} backgroundColor="grey" />
  </Box>
);
```