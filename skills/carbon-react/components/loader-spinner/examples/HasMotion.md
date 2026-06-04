```tsx
export const HasMotion: Story = () => (
  <Box display="flex">
    <LoaderSpinner mx="3" hasMotion={false} />
    <LoaderSpinner mx="3" variant="gradient-grey" hasMotion={false} />
  </Box>
);
```