```tsx
export const InADialog: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click Me</Button>
      <Dialog title="Title" open={isOpen} onCancel={() => setIsOpen(false)}>
        <Box display="inline-flex">
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
        </Box>
      </Dialog>
    </>
  );
};
```