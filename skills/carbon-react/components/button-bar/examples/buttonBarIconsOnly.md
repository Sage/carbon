```tsx
export const buttonBarIconsOnly: Story = () => {
  const BUTTON_BAR_SIZES = ["small", "medium", "large"] as const;

  return (
    <>
      {BUTTON_BAR_SIZES.map((size) => (
        <ButtonBar size={size} key={size} ml={2} mt={2}>
          <Button iconType="pdf" />
          <Button iconType="csv" />
          <Button iconType="delete" />
        </ButtonBar>
      ))}
    </>
  );
};
```