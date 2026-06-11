```tsx
export const OpeningAModal: Story = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <>
      <Box>
        <ActionPopover
          renderButton={({ ...props }) => (
            <ActionPopoverMenuButton {...props}>
              Open Actions
            </ActionPopoverMenuButton>
          )}
        >
          <ActionPopoverItem
            onClick={() => {
              setIsConfirmOpen(!isConfirmOpen);
            }}
          >
            Open Confirm Dialog
          </ActionPopoverItem>
          <ActionPopoverItem icon="settings" onClick={() => {}}>
            Do Nothing
          </ActionPopoverItem>
        </ActionPopover>
      </Box>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        confirmButtonDestructive
        cancelButtonDestructive
        disableConfirm
        open={isConfirmOpen}
        onConfirm={() => setIsConfirmOpen(!isConfirmOpen)}
        onCancel={() => setIsConfirmOpen(!isConfirmOpen)}
      >
        Content
      </Confirm>
    </>
  );
};
```