```tsx
export const ControllingTheSubmenuWidth: MenuStory = {
  render: () => (
    <Menu menuType="black">
      <MenuItem submenuMaxWidth="300px" submenu="Open submenu with max width">
        <MenuItem href="#">Item One</MenuItem>
        <MenuItem href="#">
          This is a longer text string. I will wrap instead of truncating!
        </MenuItem>
      </MenuItem>
      <MenuItem submenuMinWidth="300px" submenu="Open submenu with min width">
        <MenuItem href="#">Item One</MenuItem>
        <MenuItem href="#">Item Two</MenuItem>
        <MenuItem href="#">Item Three</MenuItem>
      </MenuItem>
    </Menu>
  ),
  decorators: [
    (Story) => (
      <div style={{ minHeight: "250px" }}>
        <Story />
      </div>
    ),
  ],
};
```