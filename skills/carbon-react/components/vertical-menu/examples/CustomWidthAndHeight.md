```tsx
export const CustomWidthAndHeight: Story = () => (
  <VerticalMenu
    width="500px"
    height="100vh"
    aria-label="Vertical menu with custom width and height"
  >
    <VerticalMenuItem
      iconType="analysis"
      adornment={
        <Pill borderColor="#fff" fill size="S">
          10
        </Pill>
      }
      title="Item 1"
      href="#"
    />
    <VerticalMenuItem iconType="cart" active title="Item 2" href="#" />
    <VerticalMenuItem iconType="bank" title="Item 3" href="#" />
  </VerticalMenu>
);
```