```tsx
export const TertiaryButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary">
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" size="large">
        Large
      </ButtonMinor>
    </>
  );
};
```