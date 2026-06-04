```tsx
export const MenuFullscreenWithSegmentStyling = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSegmentedOpen, setIsSegmentedOpen] = useState(false);

  return (
    <Box minHeight="250px">
      <Box display="flex" marginBottom={2}>
        <Menu menuType="black">
          <MenuItem onClick={() => setIsOpen(true)} icon="entry">
            Open Normal Menu
          </MenuItem>
          <MenuFullscreen isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <MenuItem variant="default" href="#">
              Default Menu Item
            </MenuItem>
            <MenuItem variant="alternate" href="#">
              Alternate Menu Item
            </MenuItem>
          </MenuFullscreen>

          <MenuItem
            onClick={() => setIsSegmentedOpen(true)}
            icon="stacked_squares"
          >
            Open Segmented Menu
          </MenuItem>
          <MenuFullscreen
            isOpen={isSegmentedOpen}
            onClose={() => setIsSegmentedOpen(false)}
          >
            <MenuSegmentTitle
              key="default-variant"
              variant="default"
              text="Menu items (default variant)"
            >
              <MenuItem variant="default" href="#">
                Segmented Default Menu Item
              </MenuItem>
            </MenuSegmentTitle>
            <MenuSegmentTitle
              key="alternate-variant"
              variant="alternate"
              text="Menu items (alternate variant)"
            >
              <MenuItem variant="alternate" href="#">
                Segmented Alternate Menu Item
              </MenuItem>
            </MenuSegmentTitle>
          </MenuFullscreen>
        </Menu>
      </Box>
      <Box display="flex">
        <Menu menuType="black">
          <MenuItem submenu="Standard Menu">
            <MenuItem href="#" variant="default">
              Default Menu Item
            </MenuItem>
            <MenuItem href="#" variant="alternate">
              Alternate Menu Item
            </MenuItem>
            <MenuSegmentTitle
              key="default-variant"
              variant="default"
              text="Menu items (default variant)"
            >
              <MenuItem href="#" variant="default">
                Segmented Default Menu Item
              </MenuItem>
            </MenuSegmentTitle>
            <MenuSegmentTitle
              key="alternate-variant"
              variant="alternate"
              text="Menu items (alternate variant)"
            >
              <MenuItem href="#" variant="alternate">
                Segmented Alternate Menu Item
              </MenuItem>
            </MenuSegmentTitle>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
```