```tsx
export const ContentAlignedRight: Story = () => {
  return (
    <Box height={250}>
      <ActionPopover horizontalAlignment="right">
        <ActionPopoverItem icon="email">Email Invoice</ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem icon="delete">Delete</ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};
```