```tsx
export const TruncatedTitlesStory: MenuStory = () => {
  return (
    <Box minHeight="150px">
      <Menu>
        <MenuItem maxWidth="168px" href="#">
          A long menu item title
        </MenuItem>
        <MenuItem maxWidth="148px" submenu="Menu Item Three">
          <MenuItem maxWidth="182px" href="#">
            A long submenu menu item title
          </MenuItem>
        </MenuItem>
        <MenuItem maxWidth="180px" icon="home" href="#">
          A long menu item title
        </MenuItem>
      </Menu>
    </Box>
  );
};
```