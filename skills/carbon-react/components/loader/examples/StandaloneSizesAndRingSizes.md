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

export const RingSizes: Story = {
  render: () => (
    <>
      <Box>
        <Loader loaderType="ring" size="extra-small" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="small" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="medium" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="large" />
      </Box>
    </>
  ),
};
```