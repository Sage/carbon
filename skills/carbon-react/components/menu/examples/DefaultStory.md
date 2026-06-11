```tsx
export const DefaultStory: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem icon="settings" href="#">
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
      ))}
    </Box>
  );
};
```