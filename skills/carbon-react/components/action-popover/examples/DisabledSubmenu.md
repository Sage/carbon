```tsx
export const DisabledSubmenu: Story = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem
          disabled
          icon="print"
          onClick={() => {}}
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
              <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          Print
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};
```