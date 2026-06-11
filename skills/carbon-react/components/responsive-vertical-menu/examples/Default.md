```tsx
export const Default: Story = () => {
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenu height="100%">
          <ResponsiveVerticalMenuItem
            icon="home"
            id="primary-menu"
            label="Primary Menu With Children"
          >
            <ResponsiveVerticalMenuItem
              id="secondary-menu"
              label="Secondary Menu With Children"
            >
              <ResponsiveVerticalMenuItem
                id="tertiary-menu"
                label="Tertiary Menu"
              />
            </ResponsiveVerticalMenuItem>
            <ResponsiveVerticalMenuItem
              id="secondary-menu-no-children"
              label="Secondary Menu Item"
            />
          </ResponsiveVerticalMenuItem>
          <ResponsiveVerticalMenuItem
            icon="home"
            id="primary-menu-no-children"
            label="Primary Menu Item"
          />
        </ResponsiveVerticalMenu>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
```