```tsx
export const WithDivider: Story = () => {
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenu height="100%">
          <ResponsiveVerticalMenuItem
            icon="home"
            id="primary-menu-item-1"
            label="Primary Menu Item 1"
          />

          <ResponsiveVerticalMenuItem
            icon="home"
            id="primary-menu-item-2"
            label="Primary Menu Item 2"
          />
          <ResponsiveVerticalMenuDivider />
          <ResponsiveVerticalMenuItem
            icon="business"
            id="primary-menu-with-children"
            label="Primary Menu With Children"
          >
            <ResponsiveVerticalMenuItem
              id="secondary-menu-item-1"
              label="Secondary Menu Item 1"
            />
            <ResponsiveVerticalMenuDivider />
            <ResponsiveVerticalMenuItem
              id="secondary-menu-item-2"
              label="Secondary Menu Item 2"
            />
          </ResponsiveVerticalMenuItem>
          <ResponsiveVerticalMenuDivider m={4} />

          <ResponsiveVerticalMenuItem
            icon="business"
            id="primary-menu-item-3"
            label="Primary Menu Item 3"
          />
        </ResponsiveVerticalMenu>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
```