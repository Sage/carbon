```tsx
export const ButtonContent: Story = () => {
  return (
    <Box display={"flex"} gap={2}>
      <Button aria-label="Return to the home page">
        <Icon type="home" />
      </Button>
      <Button>
        <>
          <Icon type="home" />
          Return to the home page
        </>
      </Button>
      <Button>
        <>
          Return to the home page
          <Icon type="home" />
        </>
      </Button>
    </Box>
  );
};
```