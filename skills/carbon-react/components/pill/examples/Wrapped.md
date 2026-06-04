```tsx
export const Wrapped: Story = () => {
  return (
    <Box mb={1}>
      <Pill maxWidth="65px" wrapText>
        Wrapped pill
      </Pill>
      <Pill ml={1} maxWidth="55px" wrapText>
        Hyphe&shy;nated&shy;pill
      </Pill>
    </Box>
  );
};
```