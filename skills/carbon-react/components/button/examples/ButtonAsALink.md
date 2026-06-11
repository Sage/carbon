```tsx
export const ButtonAsALink: Story = () => {
  return (
    <Box>
      <Button ml={2} mt={2} variantType="primary" href="/">
        I&#39;m a link
      </Button>
      <Button
        mt={2}
        variantType="primary"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        ml={4}
      >
        I&#39;m a link that opens in a new tab
      </Button>
    </Box>
  );
};
```