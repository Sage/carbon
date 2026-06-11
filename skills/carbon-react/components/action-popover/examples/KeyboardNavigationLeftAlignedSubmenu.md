```tsx
export const KeyboardNavigationLeftAlignedSubmenu: Story = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem
          icon="csv"
          onClick={() => {}}
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem icon="csv" onClick={() => {}}>
                CSV
              </ActionPopoverItem>
              <ActionPopoverItem icon="pdf" onClick={() => {}}>
                PDF
              </ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          Download
        </ActionPopoverItem>
        <ActionPopoverItem
          icon="pdf"
          onClick={() => {}}
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem icon="csv" onClick={() => {}}>
                CSV
              </ActionPopoverItem>
              <ActionPopoverItem icon="pdf" onClick={() => {}}>
                PDF
              </ActionPopoverItem>
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