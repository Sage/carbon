```tsx
export const Active: Story = () => (
  <VerticalMenu aria-label="Active vertical menu">
    <VerticalMenuItem
      iconType="analysis"
      active={(isOpen) => !isOpen}
      title="Item 1"
    >
      <VerticalMenuItem active title="ChildItem 1" href="#" />
      <VerticalMenuItem title="ChildItem 2" href="#" />
    </VerticalMenuItem>
  </VerticalMenu>
);
```