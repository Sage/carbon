```tsx
export const StandaloneSizes: Story = {
  render: () => (
    <>
      <Box>
        <Loader loaderType="standalone" size="small" />
      </Box>
      <Box>
        <Loader loaderType="standalone" size="medium" />
      </Box>
      <Box>
        <Loader loaderType="standalone" size="large" />
      </Box>
    </>
  ),
};
```