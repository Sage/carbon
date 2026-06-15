```tsx
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
```