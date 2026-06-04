```tsx
export const ItemWithOnClickHandler: Story = () => {
  const handleClick = (e: ResponsiveVerticalMenuItemClickEvent) => {
    e.preventDefault();
    window.open("https://carbon.sage.com", "_blank", "noopener noreferrer");
  };

  return (
    <>
      <GlobalHeader>
        <ResponsiveVerticalMenu height="100%">
          <ResponsiveVerticalMenuItem
            icon="home"
            id="toggle-click-handler"
            label="Toggle Click Handler"
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
          />
        </ResponsiveVerticalMenu>
      </GlobalHeader>
      <Box m="50px">This text will be hidden by the menu when opened</Box>
    </>
  );
};
```