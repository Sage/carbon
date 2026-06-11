```tsx
export const Offset: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height={100}>
      <PopoverContainer
        title="Offset"
        offset={0}
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