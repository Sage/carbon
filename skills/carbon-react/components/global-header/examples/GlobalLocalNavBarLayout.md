```tsx
export const GlobalLocalNavBarLayout: Story = () => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;

  return (
    <>
      <GlobalHeader
        logo={<Logo />}
        aria-label="Global header component with local nav bar"
      >
        <Menu menuType="black" flex="1" aria-label="Menu bar">
          <MenuItem flex="1" submenu="Product Switcher">
            <MenuItem href="#">Product A</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Parent Menu 1">
            <MenuItem href="#">Child Item 1</MenuItem>
            <MenuItem href="#">Child Item 2</MenuItem>
            <MenuItem href="#">Child Item 3</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Parent Menu 2">
            <MenuItem href="#">Child Item</MenuItem>
          </MenuItem>
        </Menu>
      </GlobalHeader>
      <NavigationBar
        position="fixed"
        orientation="top"
        offset="40px"
        aria-label="Local nav bar"
      >
        <Menu flex="1">
          <MenuItem href="#" flex="1">
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
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </NavigationBar>
    </>
  );
};
```