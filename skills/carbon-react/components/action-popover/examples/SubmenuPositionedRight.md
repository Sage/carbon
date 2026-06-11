```tsx
export const SubmenuPositionedRight: Story = () => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <Box height={250}>
      <ActionPopover submenuPosition="right">
        <ActionPopoverItem icon="email" submenu={submenu}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem icon="delete" submenu={submenu}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};
```