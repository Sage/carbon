```tsx
export const WithCustomSpacing: Story = () => {
  return (
    <NavigationBar py={2} px={7}>
      <Menu>
        <MenuItem href="#">menu item one</MenuItem>
        <MenuItem href="#">menu item two</MenuItem>
      </Menu>
    </NavigationBar>
  );
};
```