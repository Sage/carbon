```tsx
export const Complex: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <>
      <GlobalHeader aria-label="Global header component with basic menu">
        Example
        <Menu menuType="black" flex="1" flexDirection="row-reverse">
          <MenuItem
            onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          >
            Help
          </MenuItem>
        </Menu>
      </GlobalHeader>
      <Box position="fixed" top="40px" display="flex" flexDirection="row">
        <Box display="inline-flex" flexDirection="row" height="100vh">
          <Box display="flex" flexDirection="column">
            <Typography variant="h1">Content</Typography>
            <Typography variant="h2">Sub-header</Typography>
            <Typography variant="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
              odio ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu
              sapien tempus porta. Nullam sodales nisi ut orci efficitur, nec
              ullamcorper nunc pulvinar. Integer eleifend a augue ac accumsan.
              Fusce ultrices auctor aliquam. Sed eu metus sit amet est tempor
              ullamcorper. Praesent eu elit eget lacus fermentum porta at ut
              dui.
            </Typography>
          </Box>
          <AdaptiveSidebar
            aria-label="adaptive-sidebar"
            open={adaptiveSidebarOpen}
            width="500px"
          >
            <Box display="flex" flexDirection="column" pb={5}>
              <Button onClick={() => setAdaptiveSidebarOpen(false)} m={2}>
                Close
              </Button>
              <Typography variant="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                consequat facilisis sapien, vitae tempor nulla tempor cursus.
                Mauris et efficitur urna. Sed nibh metus, suscipit vitae maximus
                eu, consequat in nibh. Vivamus eu felis diam. Vestibulum est
                libero, rhoncus in neque ut, posuere faucibus nunc. Praesent
                porttitor sodales viverra. Curabitur ultricies varius mattis.
              </Typography>

              <Typography variant="p">
                Duis varius rutrum risus, ac tincidunt dui tristique in. Nulla
                et iaculis massa. Suspendisse finibus eleifend sodales. Nulla
                facilisi. Nunc eleifend risus lorem, ac dignissim libero
                venenatis non. Sed tristique nunc vel arcu pharetra, sit amet
                tincidunt leo dictum. Nam et mi in quam consectetur pretium.
                Curabitur id tempus massa, eget lacinia nisi. Nullam quis urna
                ac ante interdum scelerisque. Integer pretium cursus orci nec
                malesuada. Aenean nec est in diam suscipit bibendum. Proin
                viverra justo nec nulla laoreet, sit amet aliquam massa dictum.
                Nam ac mauris ac elit commodo convallis. Sed in tortor lobortis
                mi rhoncus congue a ut dolor. Etiam faucibus a nisl et
                convallis.
              </Typography>

              <Typography variant="p">
                Ut interdum vel nulla vel posuere. Nullam a odio viverra, tempus
                lorem et, commodo justo. Ut eget massa molestie, fringilla ante
                et, sagittis lorem. Donec feugiat sodales dignissim. Ut auctor
                eget ante a interdum. Integer sem risus, bibendum sit amet
                porttitor a, ultricies non elit. Nam nunc quam, scelerisque non
                mauris vel, mollis rhoncus leo. Proin in ligula sapien.
              </Typography>

              <Typography variant="p">
                Quisque sed elementum nibh, sit amet imperdiet turpis. Duis
                fermentum lacus in aliquet auctor. Nam tortor mauris, elementum
                nec urna ut, sollicitudin congue felis. Nunc porta, tellus ac
                vestibulum malesuada, quam libero mollis augue, ac lobortis
                metus quam semper lacus. Orci varius natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Sed erat odio,
                lacinia nec urna quis, elementum tristique nisi. Donec commodo
                lacinia tortor a sagittis.{" "}
              </Typography>
            </Box>
          </AdaptiveSidebar>
        </Box>
      </Box>
    </>
  );
};
```