```tsx
export const CustomComponent: Story = () => (
  <VerticalMenu aria-label="Custom vertical menu component">
    <VerticalMenuItem
      iconType="analysis"
      title="Item 1"
      component={Link}
      to="/item-1"
    />
  </VerticalMenu>
);
```