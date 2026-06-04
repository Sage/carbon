```tsx
export const WithHelpPill: Story = () => {
  return (
    <Box m={16}>
      <Heading
        title="This is a Title"
        subheader="This is a subheader"
        help="This should be helpful"
        pills={<Pill>Pill</Pill>}
      />
    </Box>
  );
};
```