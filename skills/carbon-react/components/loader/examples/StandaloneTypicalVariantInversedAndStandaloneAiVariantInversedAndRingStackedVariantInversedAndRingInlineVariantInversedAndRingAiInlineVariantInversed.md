```tsx
export const StandaloneTypicalVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="standalone" variant="typical" inverse />
    </Box>
  ),
};

export const StandaloneAiVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="standalone" variant="ai" inverse />
    </Box>
  ),
};

export const RingStackedVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="ring" variant="stacked" inverse />
    </Box>
  ),
};

export const RingInlineVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="ring" variant="inline" inverse />
    </Box>
  ),
};

export const RingAiInlineVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="ring" variant="ai-inline" inverse />
    </Box>
  ),
};
```