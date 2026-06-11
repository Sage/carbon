```tsx
export const buttonBarMinorIcons: Story = () => {
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
            <ButtonMinor iconType="csv">{iconPosition}</ButtonMinor>
            <ButtonMinor iconType="pdf">{iconPosition}</ButtonMinor>
            <ButtonMinor iconType="delete">{iconPosition}</ButtonMinor>
          </ButtonBar>
        )),
      )}
    </>
  );
};
```