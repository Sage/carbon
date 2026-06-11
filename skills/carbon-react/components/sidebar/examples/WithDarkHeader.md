```tsx
export const WithDarkHeader: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  const headerNode = (
    <Box display="flex" alignItems="center" gap="8px">
      <Icon type="chat" color="white" />
      <Typography variant="h2" color="white">
        Sidebar header
      </Typography>
    </Box>
  );

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header={headerNode}
        headerVariant="dark"
      >
        <Box mb={2}>
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
};
```