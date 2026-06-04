```tsx
export const InAMenu: Story = () => {
  return (
    <Box minHeight={120}>
      <Menu menuType="dark">
        <MenuItem href="#">Menu Item One</MenuItem>
        <VerticalDivider height={24} p={1} tint={20} />
        <MenuItem submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};
```