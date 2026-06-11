```tsx
export const OverrideSpinnerLabel: Story = () => (
  <Box display="flex">
    <LoaderSpinner mx="3" spinnerLabel="Processing..." variant="action" />
    <LoaderSpinner mx="3" spinnerLabel="Saving..." variant="neutral" />
    <LoaderSpinner
      mx="3"
      spinnerLabel="Loading... This can take a few seconds... Or a few minutes..."
      variant="action"
    />
  </Box>
);
```