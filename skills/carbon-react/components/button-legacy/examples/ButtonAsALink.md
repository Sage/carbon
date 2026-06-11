```tsx
export const ButtonAsALink: Story = () => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="primary" href="/">
        I&#39;m a link
      </Button>
      <Button
        mt={2}
        buttonType="primary"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        ml={4}
      >
        Open in new tab
      </Button>
    </Box>
  );
};
```