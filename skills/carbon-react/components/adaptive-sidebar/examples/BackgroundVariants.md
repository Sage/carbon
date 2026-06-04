```tsx
export const BackgroundVariants: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);
  const [colour, setColour] = useState("white");

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Box display="flex" flexDirection="row" gap={4}>
          <Box width="300px">
            <Select
              ml={3}
              name="color"
              id="color"
              label="Background Color"
              labelInline
              onChange={(e) => setColour(e.target.value)}
              value={colour}
            >
              {[
                { label: "App", value: "app" },
                { label: "Black", value: "black" },
                { label: "White", value: "white" },
              ].map(({ label, value }) => (
                <Option text={label} key={value} value={value} />
              ))}
            </Select>
          </Box>
          <Button
            onClick={() => {
              setAdaptiveSidebarOpen(!adaptiveSidebarOpen);
            }}
            mb={2}
          >
            Toggle Sidebar
          </Button>
        </Box>
        <Typography variant="p" mt={2}>
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
        backgroundColor={colour as "white" | "black" | "app"}
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
            <Typography variant="h3" inverse={colour === "black"}>
              Content
            </Typography>
            <Button
              buttonType="primary"
              onClick={() => setAdaptiveSidebarOpen(false)}
            >
              Close
            </Button>
          </Box>
          <Divider type="horizontal" my={0} />
          <Box display="flex" flexDirection="column">
            <Typography inverse={colour === "black"}>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
```