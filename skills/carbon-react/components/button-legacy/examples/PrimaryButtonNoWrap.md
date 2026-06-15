```tsx
export const PrimaryButtonNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="primary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};
```