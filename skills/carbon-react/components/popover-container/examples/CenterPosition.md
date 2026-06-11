```tsx
export const CenterPosition: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height={150} display="flex" justifyContent="center">
      <PopoverContainer
        title="Center Aligned"
        position="center"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        Contents
      </PopoverContainer>
    </Box>
  );
};
```