```tsx
export const DisabledItems: Story = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem disabled onClick={() => {}} icon="add">
          Add
        </ActionPopoverItem>
        <ActionPopoverItem disabled onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}} icon="tick">
          Tick
        </ActionPopoverItem>
        <ActionPopoverItem disabled onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}} icon="none">
          None
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};
```