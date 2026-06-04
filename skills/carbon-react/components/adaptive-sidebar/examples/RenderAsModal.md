```tsx
export const RenderAsModal: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      {CommonTemplate(adaptiveSidebarOpen, setAdaptiveSidebarOpen)}

      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        renderAsModal
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box display="flex" flexDirection="column" m={2}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
          >
            <Typography variant="h3">Content</Typography>
            <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
          </Box>
          <Divider type="horizontal" my={0} />
          <Box display="flex" flexDirection="column">
            <Typography>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
```