```tsx
export const Adornment: Story = () => (
  <VerticalMenu aria-label="Vertical menu with adornment">
    <VerticalMenuItem
      iconType="analysis"
      adornment={(isOpen) =>
        !isOpen && (
          <Pill borderColor="#fff" fill size="S">
            10
          </Pill>
        )
      }
      title="Item 1"
    >
      <VerticalMenuItem
        adornment={
          <Pill borderColor="#fff" fill size="S">
            10
          </Pill>
        }
        title="ChildItem 1"
        href="#"
      />
      <VerticalMenuItem title="ChildItem 2" href="#" />
    </VerticalMenuItem>
  </VerticalMenu>
);
```