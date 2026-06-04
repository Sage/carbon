```tsx
export const Inverse: Story = () => {
  return (
    <Box
      backgroundColor="#333"
      p={2}
      display="flex"
      flexDirection="row"
      gap={1}
    >
      <Button variant="default" variantType="primary" size="medium" inverse>
        Primary Medium
      </Button>
      <Button variant="default" variantType="secondary" size="medium" inverse>
        Secondary Medium
      </Button>
      <Button variant="default" variantType="tertiary" size="medium" inverse>
        Tertiary Medium
      </Button>
      <Button variant="default" variantType="subtle" size="medium" inverse>
        Subtle Medium
      </Button>
    </Box>
  );
};
```