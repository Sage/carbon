```tsx
export const DarkBackgroundButton: Story = () => {
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
        <Button my={2} buttonType="darkBackground" size="small">
          Small
        </Button>
        <Button my={2} buttonType="darkBackground">
          Medium
        </Button>
        <Button my={2} buttonType="darkBackground" size="large">
          Large
        </Button>
      </Box>
    </Box>
  );
};

export const DarkBackgroundButtonDisabled: Story = () => {
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
        <Button my={2} buttonType="darkBackground" disabled size="small">
          Small
        </Button>
        <Button my={2} buttonType="darkBackground" disabled>
          Medium
        </Button>
        <Button my={2} buttonType="darkBackground" disabled size="large">
          Large
        </Button>
      </Box>
    </Box>
  );
};

export const DarkBackgroundButtonIcon: Story = () => {
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
        <Button my={2} buttonType="darkBackground" iconType="add" size="small">
          Small
        </Button>
        <Button
          my={2}
          buttonType="darkBackground"
          iconType="add"
          iconPosition="after"
        >
          Medium
        </Button>
        <Button
          my={2}
          buttonType="darkBackground"
          disabled
          iconType="add"
          size="small"
        >
          Small
        </Button>
        <Button
          my={2}
          buttonType="darkBackground"
          disabled
          iconType="add"
          iconPosition="after"
        >
          Medium
        </Button>
      </Box>
    </Box>
  );
};

export const DarkBackgroundButtonFullWidth: Story = () => {
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
        <Button my={2} buttonType="darkBackground" fullWidth>
          Full Width
        </Button>
      </Box>
    </Box>
  );
};

export const DarkBackgroundButtonNoWrap: Story = () => {
  return (
    <Box backgroundColor="var(--colorsUtilityYin100)" width="80px">
      <Button my={2} buttonType="darkBackground" noWrap>
        Long button text
      </Button>
    </Box>
  );
};
```