```tsx
export const Loading: Story = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Button>
        <Loader variant="inline" loaderType="ring" size="extra-small" />
      </Button>
      <Button>
        <Loader
          variant="inline"
          loaderType="ring"
          loaderLabel="Chargement..."
          size="extra-small"
        />
      </Button>
    </Box>
  );
};
```