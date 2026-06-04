```tsx
export const AddressExample: Story = () => {
  return (
    <Pod internalEditButton variant="tertiary">
      <Box>
        <Typography variant="h4" fontWeight="500">
          Unit 1
        </Typography>
        <Typography m={0}>South Nelson Industrial Estate</Typography>
        <Typography m={0}>Cramlington</Typography>
        <Typography m={0}>NE23 1WF</Typography>
        <Typography m={0}>United Kingdom</Typography>
      </Box>
      <Button buttonType="tertiary" size="small" mt={1} px={0}>
        Select a different address
      </Button>
      <Box position="absolute" right="8px" top="8px">
        <Button
          buttonType="tertiary"
          size="small"
          iconType="edit"
          iconPosition="after"
        >
          Edit
        </Button>
      </Box>
    </Pod>
  );
};
```