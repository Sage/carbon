```tsx
export const SubmenuWithSearch: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider size="large" />
              <MenuSegmentTitle text="segment title" variant="alternate">
                <MenuItem variant="alternate" p="2px 16px">
                  <Search
                    placeholder="Search"
                    variant={
                      menuType === "black" || menuType === "dark"
                        ? "dark"
                        : "default"
                    }
                    value=""
                    onChange={() => {}}
                  />
                </MenuItem>
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