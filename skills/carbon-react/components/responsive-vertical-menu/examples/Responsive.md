```tsx
export const Responsive: Story = () => {
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenu responsiveBreakpoint={900}>
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
          </ResponsiveVerticalMenuItem>
        </ResponsiveVerticalMenu>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
```