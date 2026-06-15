```tsx
export const TertiaryButton: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="tertiary" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="tertiary" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};
```