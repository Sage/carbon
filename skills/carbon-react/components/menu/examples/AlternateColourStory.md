```tsx
export const AlternateColourStory: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider size="large" />
              <MenuSegmentTitle text="segment title" variant="alternate">
                <MenuItem variant="alternate" href="#">
                  Item Submenu Two
                </MenuItem>
                <MenuItem variant="alternate" href="#">
                  Item Submenu Three
                </MenuItem>
              </MenuSegmentTitle>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
```