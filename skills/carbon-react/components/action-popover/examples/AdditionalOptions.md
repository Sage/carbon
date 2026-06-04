```tsx
export const AdditionalOptions: Story = () => {
  return (
    <Box mt={40} height={275} maxWidth={800}>
      <ActionPopover rightAlignMenu>
        <ActionPopoverItem onClick={() => {}}>Enroll Device</ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}}>Assign Owner</ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}}>Manage Devices</ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};
```