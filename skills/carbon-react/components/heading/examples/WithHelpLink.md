```tsx
export const WithHelpLink: Story = () => {
  return (
    <Box m={16}>
      <Heading
        title="This is a Title"
        subheader="This is a subheader"
        help="This should be helpful"
        helpLink="https://carbon.sage.com"
      />
    </Box>
  );
};
```