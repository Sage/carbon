```tsx
export const buttonBarIcons: Story = () => {
  const BUTTON_BAR_SIZES = ["small", "medium", "large"] as const;
  const BUTTON_BAR_ICON_POSITIONS = ["before", "after"] as const;

  return (
    <>
      {BUTTON_BAR_ICON_POSITIONS.map((iconPosition) =>
        BUTTON_BAR_SIZES.map((size) => (
          <ButtonBar
            iconPosition={iconPosition}
            size={size}
            key={size + iconPosition}
            ml={2}
            mt={2}
          >
            <Button iconType="csv">{iconPosition}</Button>
            <Button iconType="pdf">{iconPosition}</Button>
            <Button iconType="delete">{iconPosition}</Button>
          </ButtonBar>
        )),
      )}
    </>
  );
};
```