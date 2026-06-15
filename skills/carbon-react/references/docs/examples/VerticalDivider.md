```tsx
export const VerticalDivider: StoryObj = () => (
  <Box display="flex">
    <Box display="inline-flex">
      <Box width={56} height={56} backgroundColor="grey" />
      <Divider ml={2} mr={2} p={0} />
      <Box width={56} height={56} backgroundColor="grey" />
      <Divider ml={2} mr={2} p={0} />
      <Box width={56} height={56} backgroundColor="grey" />
    </Box>
  </Box>
);
```