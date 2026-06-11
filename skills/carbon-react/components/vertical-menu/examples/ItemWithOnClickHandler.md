```tsx
export const ItemWithOnClickHandler: Story = () => {
  const handleClick = (e: VerticalMenuItemClickEvent) => {
    e.preventDefault();
    window.open("https://carbon.sage.com", "_blank", "noopener noreferrer");
  };

  return (
    <VerticalMenu>
      <VerticalMenuItem
        iconType="analysis"
        title="Anchor with onClick"
        href="#"
        onClick={handleClick}
      />
      <VerticalMenuItem
        iconType="admin"
        title="Button with onClick"
        onClick={handleClick}
      />
    </VerticalMenu>
  );
};
```