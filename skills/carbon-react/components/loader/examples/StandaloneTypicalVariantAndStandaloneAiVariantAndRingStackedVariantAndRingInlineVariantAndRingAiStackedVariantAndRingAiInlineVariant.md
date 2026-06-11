```tsx
export const StandaloneTypicalVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="standalone" variant="typical" />
    </Box>
  ),
};

export const StandaloneAiVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="standalone" variant="ai" />
    </Box>
  ),
};

export const RingStackedVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" variant="stacked" />
    </Box>
  ),
};

export const RingInlineVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" variant="inline" />
    </Box>
  ),
};

export const RingAiStackedVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" variant="ai-stacked" />
    </Box>
  ),
};

export const RingAiInlineVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" variant="ai-inline" />
    </Box>
  ),
};
```