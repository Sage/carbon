```tsx
export const InDialog: Story = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(defaultOpenState);
  return (
    <Box {...(defaultOpenState ? { height: 900 } : {})}>
      <Button onClick={() => setIsDialogOpen(true)}>
        Open Duelling Picklist
      </Button>
      <Dialog
        open={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        title="Duelling Picklist"
        size="large"
      >
        <Default />
      </Dialog>
    </Box>
  );
};
```