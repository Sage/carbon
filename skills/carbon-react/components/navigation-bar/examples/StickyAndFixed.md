```tsx
export const Sticky: Story = () => {
  return (
    <Box id="sticky-container" height={250}>
      <NavigationBar
        position="sticky"
        orientation="top"
        offset="25px"
        aria-label="header"
      >
        <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
          <Menu flex="1">
            <MenuItem flex="1" onClick={() => {}}>
              Menu Item One
            </MenuItem>
            <MenuItem flex="0 0 auto" href="#">
              Menu Item Two
            </MenuItem>
            <MenuItem flex="0 0 auto" submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuDivider />
              <MenuItem icon="settings" href="#">
                Item Submenu Three
              </MenuItem>
              <MenuItem href="#">Item Submenu Four</MenuItem>
            </MenuItem>
            <MenuItem flex="0 0 auto" submenu="Menu Item Four">
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      </NavigationBar>
      <Box height={1000} backgroundColor="green" />
      <NavigationBar
        position="sticky"
        orientation="bottom"
        offset="25px"
        aria-label="footer"
      >
        <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
          <Menu flex="1">
            <MenuItem flex="1" onClick={() => {}}>
              Menu Item One
            </MenuItem>
            <MenuItem flex="0 0 auto" href="#">
              Menu Item Two
            </MenuItem>
            <MenuItem flex="0 0 auto" href="#">
              Menu Item Three
            </MenuItem>
            <MenuItem flex="0 0 auto" href="#">
              Menu Item Four
            </MenuItem>
          </Menu>
        </Box>
      </NavigationBar>
    </Box>
  );
};

export const Fixed: Story = () => {
  return (
    <>
      <NavigationBar
        position="fixed"
        orientation="top"
        offset="25px"
        aria-label="header"
      >
        <Menu flex="1">
          <MenuItem flex="1" onClick={() => {}}>
            Menu Item One
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Two
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Three">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
            <MenuDivider />
            <MenuItem icon="settings" href="#">
              Item Submenu Three
            </MenuItem>
            <MenuItem href="#">Item Submenu Four</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Four">
            <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </NavigationBar>
      <Box height={1000} backgroundColor="green" />
      <NavigationBar
        position="fixed"
        orientation="bottom"
        offset="25px"
        aria-label="footer"
      >
        <Menu flex="1">
          <MenuItem flex="1" onClick={() => {}}>
            Menu Item One
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Two
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Three
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Four
          </MenuItem>
        </Menu>
      </NavigationBar>
    </>
  );
};
```