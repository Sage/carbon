```tsx
export const Basic: Story = () => {
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
      >
        <Box p={2} display="flex" flexDirection="column">
          <Button onClick={() => setAdaptiveSidebarOpen(false)} mb={2}>
            Close
          </Button>
          Adaptive sidebar content
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
```