```tsx
export const BorderRadius: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height={100}>
      <PopoverContainer
        title="Border Radius"
        borderRadius="borderRadius000 borderRadius000 borderRadius200 borderRadius200"
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