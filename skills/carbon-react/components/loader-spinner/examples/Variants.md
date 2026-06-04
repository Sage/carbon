```tsx
export const Variants: Story = () => (
  <Box display="flex">
    <LoaderSpinner mx="3" showSpinnerLabel={false} variant="action" />
    <LoaderSpinner mx="3" showSpinnerLabel={false} variant="neutral" />
    <Box backgroundColor="black">
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="inverse" />
    </Box>
    <Box backgroundColor="lightgrey">
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="gradient-grey" />
    </Box>
    <Box backgroundColor="lightgrey">
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="gradient-white" />
    </Box>
  </Box>
);
```