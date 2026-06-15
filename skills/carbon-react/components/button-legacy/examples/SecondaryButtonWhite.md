```tsx
export const SecondaryButtonWhite: Story = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      backgroundColor="var(--colorsUtilityYin100)"
    >
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button size="small" isWhite>
          Small White
        </Button>
        <Button isWhite>Medium White</Button>
        <Button size="large" isWhite>
          Large White
        </Button>
      </Box>
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button size="small" iconType="placeholder" isWhite>
          Small White & Icon
        </Button>
        <Button iconType="placeholder" isWhite>
          Medium White & Icon
        </Button>
        <Button iconType="placeholder" size="large" isWhite>
          Large White & Icon
        </Button>
      </Box>
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button disabled isWhite>
          Disabled & White
        </Button>
        <Button destructive isWhite>
          Destructive & White
        </Button>
        <Button disabled destructive isWhite>
          Disabled, Destructive & White
        </Button>
      </Box>
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button disabled isWhite iconType="placeholder">
          Disabled & White
        </Button>
        <Button destructive isWhite iconType="placeholder">
          Destructive & White
        </Button>
        <Button disabled destructive isWhite iconType="placeholder">
          Disabled, Destructive & White
        </Button>
      </Box>
    </Box>
  );
};
```