```tsx
export const SecondaryButtonNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="secondary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};
```