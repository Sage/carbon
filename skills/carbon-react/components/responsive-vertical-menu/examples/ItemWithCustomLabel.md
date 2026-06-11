```tsx
export const ItemWithCustomLabel: Story = () => {
  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenu height="100%">
          <ResponsiveVerticalMenuItem
            icon="home"
            id="primary-menu"
            label={
              <Box display="flex" width="100%" alignItems="center" gap={1}>
                <span>Primary Menu Item</span>
                <Icon type="link" />
              </Box>
            }
          />
        </ResponsiveVerticalMenu>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
```