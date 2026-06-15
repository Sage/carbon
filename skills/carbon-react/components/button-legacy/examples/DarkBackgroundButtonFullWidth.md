```tsx
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
```