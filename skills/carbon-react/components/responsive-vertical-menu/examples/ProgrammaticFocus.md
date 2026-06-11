```tsx
export const ProgrammaticFocus: Story = () => {
  const responsiveVerticalMenuHandle =
    useRef<ResponsiveVerticalMenuHandle>(null);

  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenu
          ref={responsiveVerticalMenuHandle}
          height="100%"
        >
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
      <Button
        mt={5}
        onClick={() =>
          responsiveVerticalMenuHandle.current?.focusLaunchButton()
        }
      >
        Focus Launch Button
      </Button>
    </>
  );
};
```