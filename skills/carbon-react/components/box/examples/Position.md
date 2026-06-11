```tsx
export const Position: Story = () => {
  return (
    <Box>
      <Box
        display="inline-block"
        size="350px"
        overflow="auto"
        scrollVariant="light"
        mr="20px"
        bg="secondary"
      >
        <Box
          width="400px"
          height="80px"
          m={2}
          bg="primary"
          position="sticky"
          top="0"
        >
          <Typography color="white">This box has position sticky</Typography>
          <Button buttonType="primary" destructive>
            Button
          </Button>
        </Box>
        <Box size="500px" />
        <Box
          width="400px"
          height="80px"
          m={2}
          bg="primary"
          position="sticky"
          bottom="0"
        >
          <Typography color="white">This box has position sticky</Typography>
          <Button buttonType="primary" destructive>
            Button
          </Button>
        </Box>
      </Box>
      <Box size="500px" position="fixed" right="0" bg="primary">
        <Box>
          <Typography color="white">This box has position fixed</Typography>
        </Box>
      </Box>
    </Box>
  );
};
```