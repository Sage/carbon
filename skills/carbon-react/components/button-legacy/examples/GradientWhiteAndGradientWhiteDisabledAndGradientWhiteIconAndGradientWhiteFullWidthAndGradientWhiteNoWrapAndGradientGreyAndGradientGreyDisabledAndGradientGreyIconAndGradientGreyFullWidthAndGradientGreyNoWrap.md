```tsx
export const GradientWhite: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-white" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-white" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const GradientWhiteDisabled: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" size="small" ml={2} disabled>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-white" ml={2} disabled>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-white" size="large" ml={2} disabled>
        Large
      </Button>
    </Box>
  );
};

export const GradientWhiteIcon: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" iconType="print" ml={2}>
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-white"
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-white"
        disabled
        iconType="print"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-white"
        disabled
        iconType="print"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
};

export const GradientWhiteFullWidth: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const GradientWhiteNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="gradient-white" noWrap>
        Long button text
      </Button>
    </Box>
  );
};

export const GradientGrey: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-grey" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-grey" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const GradientGreyDisabled: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" size="small" ml={2} disabled>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-grey" ml={2} disabled>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-grey" size="large" ml={2} disabled>
        Large
      </Button>
    </Box>
  );
};

export const GradientGreyIcon: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" iconType="print" ml={2}>
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-grey"
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-grey"
        disabled
        iconType="print"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-grey"
        disabled
        iconType="print"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
};

export const GradientGreyFullWidth: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const GradientGreyNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="gradient-grey" noWrap>
        Long button text
      </Button>
    </Box>
  );
};
```