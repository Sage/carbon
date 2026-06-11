```tsx
export const ResponsiveMenu: Story = () => {
  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 599px)");
  const [isListViewOpen, setIsListViewOpen] = useState(false);
  const menuItems = [
    <MenuItem
      key="product-switcher"
      minWidth="160px"
      flex="1"
      submenu="Product Switcher"
    >
      <MenuItem href="#">Product A</MenuItem>
    </MenuItem>,
    <MenuItem
      key="parent-menu-1"
      minWidth="145px"
      flex="0 0 auto"
      submenu="Parent Menu 1"
    >
      <MenuItem href="#">Child Item 1</MenuItem>
      <MenuSegmentTitle text="segment title">
        <MenuItem href="#">Child Item 2</MenuItem>
        <MenuItem href="#">Child Item 3</MenuItem>
      </MenuSegmentTitle>
    </MenuItem>,
    <MenuItem
      key="parent-menu-2"
      minWidth="145px"
      flex="0 0 auto"
      submenu="Parent Menu 2"
    >
      <MenuItem href="#">Child Item</MenuItem>
    </MenuItem>,
  ];
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;

  return (
    <GlobalHeader
      logo={<Logo />}
      aria-label="Global header component with responsive menu"
    >
      <Menu menuType="black" flex="1">
        {fullscreenViewBreakPoint ? (
          <>
            <MenuItem
              onClick={(ev) => {
                ev.preventDefault();
                setIsListViewOpen(true);
              }}
            >
              Menu
            </MenuItem>
            <MenuFullscreen
              isOpen={isListViewOpen}
              onClose={() => setIsListViewOpen(false)}
            >
              {menuItems}
            </MenuFullscreen>
          </>
        ) : (
          menuItems
        )}
      </Menu>
    </GlobalHeader>
  );
};
```