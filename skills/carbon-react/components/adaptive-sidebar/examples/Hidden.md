```tsx
export const Hidden: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);
  const [adaptiveSidebarHidden, setAdaptiveSidebarHidden] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let handle: ReturnType<typeof setInterval>;
    if (adaptiveSidebarOpen || adaptiveSidebarHidden) {
      handle = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }

    return () => clearTimeout(handle);
  }, [adaptiveSidebarOpen, adaptiveSidebarHidden]);

  const buttonText = useMemo(() => {
    if (adaptiveSidebarHidden) {
      return "Show";
    } else if (adaptiveSidebarOpen) {
      return "Close";
    } else {
      return "Open";
    }
  }, [adaptiveSidebarHidden, adaptiveSidebarOpen]);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Button
          onClick={() => {
            if (adaptiveSidebarHidden) {
              setAdaptiveSidebarHidden(false);
              return;
            }
            if (adaptiveSidebarOpen) {
              setCount(0);
              setAdaptiveSidebarOpen(false);
              return;
            }
            setAdaptiveSidebarOpen(true);
          }}
          mb={2}
        >
          {buttonText}
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
        hidden={adaptiveSidebarHidden}
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          p={1}
        >
          <Typography variant="h3">Content</Typography>
          <SplitButton
            text="Hide"
            onClick={() => setAdaptiveSidebarHidden(true)}
          >
            <Button
              onClick={() => {
                setCount(0);
                setAdaptiveSidebarOpen(false);
              }}
            >
              Close
            </Button>
          </SplitButton>
        </Box>
        <Divider type="horizontal" my={0} mx={0} />
        <Box display="flex" flexDirection="column" p={1}>
          <Typography>
            This counter will update every second when the sidebar is open or
            hidden: {count}
          </Typography>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
```