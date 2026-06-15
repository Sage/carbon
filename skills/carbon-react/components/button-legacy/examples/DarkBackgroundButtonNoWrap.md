```tsx
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