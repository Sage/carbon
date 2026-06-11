```tsx
export const SubmenuDirectionLeftStory: MenuStory = () => {
  return (
    <Box mb={150}>
      <Menu>
        <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="Menu Item Three" submenuDirection="left">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuDivider />
          <MenuItem icon="settings" href="#">
            Item Submenu Three
          </MenuItem>
          <MenuItem href="#">A really long Item Submenu Four</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};
```