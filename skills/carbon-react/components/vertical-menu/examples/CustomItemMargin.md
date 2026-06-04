```tsx
export const CustomItemMargin: Story = () => (
  <VerticalMenu
    height="100vh"
    aria-label="Vertical menu with custom item margin"
  >
    <VerticalMenuItem iconType="analysis" title="Item 1" />
    <VerticalMenuItem title="Item 2" />
    <VerticalMenuItem title="Item 3" mt="auto" />
  </VerticalMenu>
);
```