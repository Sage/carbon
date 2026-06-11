```tsx
export const WithHeaderAndSubheader: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header={<Typography variant="h3">Sidebar header</Typography>}
        subHeader={
          <Button iconType="chevron_left_thick" buttonType="tertiary">
            Action
          </Button>
        }
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