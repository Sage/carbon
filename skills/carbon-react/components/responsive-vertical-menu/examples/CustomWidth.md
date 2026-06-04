```tsx
export const CustomWidth: Story = () => {
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenu width="200px">
          <ResponsiveVerticalMenuItem
            icon="home"
            id="primary-menu"
            label="Primary Menu"
            py={1}
          >
            <ResponsiveVerticalMenuItem
              id="secondary-menu"
              label="Secondary Menu"
              py={1}
            >
              <ResponsiveVerticalMenuItem
                id="tertiary-menu"
                label="Tertiary Menu"
                py={1}
              />
            </ResponsiveVerticalMenuItem>
          </ResponsiveVerticalMenuItem>
        </ResponsiveVerticalMenu>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
```