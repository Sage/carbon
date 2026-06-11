```tsx
export const ButtonIconOnly: Story = () => {
  return (
    <Box>
      <Button
        mt={2}
        ml={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        aria-label="Delete"
      />
      <Button mt={2} destructive ml={2} iconType="bin" aria-label="Delete" />
      <Button
        mt={2}
        disabled
        size="large"
        ml={2}
        iconType="bin"
        aria-label="Delete"
      />
    </Box>
  );
};
```