```tsx
export const DownloadButton: Story = () => {
  return (
    <Box mt={40} height={275} maxWidth={800}>
      <ActionPopover rightAlignMenu>
        <ActionPopoverItem download icon="download" href="example-img.jpg">
          Download
        </ActionPopoverItem>
        <ActionPopoverItem icon="settings" onClick={() => {}}>
          Assign Owner
        </ActionPopoverItem>
        <ActionPopoverItem disabled icon="download" href="example-img.jpg">
          Download
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};
```