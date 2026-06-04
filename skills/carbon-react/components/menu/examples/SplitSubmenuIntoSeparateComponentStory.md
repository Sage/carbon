```tsx
export const SplitSubmenuIntoSeparateComponentStory: MenuStory = () => {
  const MySubMenu = (
    <MenuItem submenu="Menu Item Three">
      <MenuItem href="#">Item Submenu One</MenuItem>
      <MenuItem href="#">Item Submenu Two</MenuItem>
    </MenuItem>
  );
  return (
    <Box minHeight="150px">
      <Menu>
        <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        {MySubMenu}
      </Menu>
    </Box>
  );
};
```