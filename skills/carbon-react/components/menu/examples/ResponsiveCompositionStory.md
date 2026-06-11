```tsx
export const ResponsiveCompositionStory: MenuStory = () => {
  const isBelowBreakpoint1 = useMediaQuery("(max-width: 1200px)");
  const isBelowBreakpoint2 = useMediaQuery("(max-width: 1000px)");
  const isBelowBreakpoint3 = useMediaQuery("(max-width: 800px)");
  const isBelowBreakpoint4 = useMediaQuery("(max-width: 600px)");
  const responsiveMenuItems = () => {
    if (isBelowBreakpoint4) {
      return [
        <MenuItem key="submenu-4" submenu="More">
          <MenuItem href="#">Menu Item One</MenuItem>
          <MenuItem href="#">Menu Item Two</MenuItem>
          <MenuItem href="#">Menu Item Three</MenuItem>
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    if (isBelowBreakpoint3) {
      return [
        <MenuItem key="menu-item-3" href="#">
          Menu Item One
        </MenuItem>,
        <MenuItem key="submenu-3" submenu="More">
          <MenuItem href="#">Menu Item Two</MenuItem>
          <MenuItem href="#">Menu Item Three</MenuItem>
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    if (isBelowBreakpoint2) {
      return [
        <MenuItem key="menu-item-2-a" href="#">
          Menu Item One
        </MenuItem>,
        <MenuItem key="menu-item-2-b" href="#">
          Menu Item Two
        </MenuItem>,
        <MenuItem key="submenu-2" submenu="More">
          <MenuItem href="#">Menu Item Three</MenuItem>
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    if (isBelowBreakpoint1) {
      return [
        <MenuItem key="menu-item-1-a" href="#">
          Menu Item One
        </MenuItem>,
        <MenuItem key="menu-item-1-b" href="#">
          Menu Item Two
        </MenuItem>,
        <MenuItem key="menu-item-1-c" href="#">
          Menu Item Three
        </MenuItem>,
        <MenuItem key="submenu-1" submenu="More">
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    return [
      <MenuItem key="menu-item-a" href="#">
        Menu Item One
      </MenuItem>,
      <MenuItem key="menu-item-b" href="#">
        Menu Item Two
      </MenuItem>,
      <MenuItem key="menu-item-c" href="#">
        Menu Item Three
      </MenuItem>,
      <MenuItem key="menu-item-d" href="#">
        Menu Item Four
      </MenuItem>,
    ];
  };
  return (
    <Box minHeight="250px">
      <Menu>{React.Children.map(responsiveMenuItems(), (items) => items)}</Menu>
    </Box>
  );
};
```