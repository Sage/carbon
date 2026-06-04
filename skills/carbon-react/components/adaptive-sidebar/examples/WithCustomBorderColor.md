```tsx
export const WithCustomBorderColor: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Button
          onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          mb={2}
        >
          {adaptiveSidebarOpen ? "Close" : "Open"}
        </Button>
        <Typography variant="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at odio
          ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu sapien
          tempus porta. Nullam sodales nisi ut orci efficitur, nec ullamcorper
          nunc pulvinar. Integer eleifend a augue ac accumsan. Fusce ultrices
          auctor aliquam. Sed eu metus sit amet est tempor ullamcorper. Praesent
          eu elit eget lacus fermentum porta at ut dui.
        </Typography>
      </Box>
      <AdaptiveSidebar
        aria-label="adaptive-sidebar"
        open={adaptiveSidebarOpen}
        width="300px"
        borderColor="--colorsActionMajor500"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          p={1}
        >
          <Typography variant="h3">Content</Typography>
          <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
        </Box>
        <Divider type="horizontal" my={0} mx={0} />
        <Box display="flex" flexDirection="column" p={1}>
          <Typography>
            This is the main content of the adaptive sidebar
          </Typography>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
```