```tsx
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
```