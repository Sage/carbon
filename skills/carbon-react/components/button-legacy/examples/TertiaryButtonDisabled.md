```tsx
export const TertiaryButtonDisabled: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" disabled size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="tertiary" disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="tertiary" disabled size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};
```