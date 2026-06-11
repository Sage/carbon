```tsx
export const SubmenuNodes: MenuStory = () => (
  <Box mb={150}>
    {menuTypes.map((menuType) => {
      const submenuNode = (initials: string, name: string) => (
        <Box
          height="40px"
          width="60px"
          display="flex"
          alignItems="center"
          gap="2px"
          pl="7px"
        >
          <Portrait size="XS" initials={initials} />
          <Typography
            fontWeight="500"
            fontSize="14px"
            color={
              menuType === "black" || menuType === "dark" ? "white" : "black"
            }
            margin={0}
          >
            {name}
          </Typography>
        </Box>
      );
      return (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem
              submenu={submenuNode("JD", "John")}
              p={0}
              ariaLabel="John Doe"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuItem
              submenu={submenuNode("JS", "Jane")}
              p={0}
              ariaLabel="Jane Smith"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuItem
              submenu={submenuNode("AB", "Alice")}
              p={0}
              ariaLabel="Alice Brown"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuItem
              submenu={submenuNode("BC", "Bob")}
              p={0}
              ariaLabel="Bob Clark"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      );
    })}
  </Box>
);
```