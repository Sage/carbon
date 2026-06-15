```tsx
export const buttonBarMinorIconsOnly: Story = () => {
  const BUTTON_BAR_SIZES = ["small", "medium", "large"] as const;

  return (
    <>
      {BUTTON_BAR_SIZES.map((size) => (
        <ButtonBar size={size} key={size} ml={2} mt={2}>
          <ButtonMinor iconType="pdf" />
          <ButtonMinor iconType="csv" />
          <ButtonMinor iconType="delete" />
        </ButtonBar>
      ))}
    </>
  );
};
```