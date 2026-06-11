```tsx
export const ProgrammaticFocus: MenuStory = () => {
  const menuItemHandle = useRef<MenuItemHandle>(null);

  return (
    <Box mb={150}>
      <Box>
        <Button mb={2} onClick={() => menuItemHandle.current?.focus()}>
          Click to focus Menu Item One
        </Button>
        <Menu>
          <MenuItem ref={menuItemHandle} icon="settings" href="#">
            Menu Item One
          </MenuItem>
          <MenuItem icon="settings" onClick={() => {}}>
            Menu Item Two
          </MenuItem>
          <MenuItem submenu="Menu Item Three">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
            <MenuDivider />
            <MenuItem icon="entry" href="#">
              Item Submenu Three
            </MenuItem>
            <MenuItem icon="settings" href="#">
              Item Submenu Four
            </MenuItem>
          </MenuItem>
          <MenuItem submenu="Menu Item Four" onClick={() => {}}>
            <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
```