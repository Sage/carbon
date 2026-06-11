```tsx
export const WithAdaptiveBreakpoint: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      {CommonTemplate(adaptiveSidebarOpen, setAdaptiveSidebarOpen)}

      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        adaptiveBreakpoint={650}
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box display="flex" flexDirection="column">
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