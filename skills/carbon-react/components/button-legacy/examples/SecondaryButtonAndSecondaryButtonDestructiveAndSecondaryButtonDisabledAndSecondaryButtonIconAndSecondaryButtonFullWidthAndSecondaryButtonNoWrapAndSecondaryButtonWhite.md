```tsx
export const SecondaryButton: Story = () => {
  return (
    <Box>
      <Button mt={2} size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} ml={2}>
        Medium
      </Button>
      <Button mt={2} size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const SecondaryButtonDestructive: Story = () => {
  return (
    <Box>
      <Button mt={2} destructive size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} destructive ml={2}>
        Medium
      </Button>
      <Button mt={2} destructive size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const SecondaryButtonDisabled: Story = () => {
  return (
    <Box>
      <Button mt={2} size="small" disabled ml={2}>
        Small
      </Button>
      <Button mt={2} disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} size="large" disabled ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const SecondaryButtonIcon: Story = () => {
  return (
    <Box>
      <Button mt={2} iconType="print" ml={2}>
        Medium
      </Button>
      <Button mt={2} destructive iconType="delete" iconPosition="after" ml={2}>
        Medium
      </Button>
      <Button mt={2} disabled iconType="print" iconPosition="after" ml={2}>
        Medium
      </Button>
    </Box>
  );
};

export const SecondaryButtonFullWidth: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="secondary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const SecondaryButtonNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="secondary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};

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