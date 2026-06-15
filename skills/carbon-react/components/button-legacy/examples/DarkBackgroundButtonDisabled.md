```tsx
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
```