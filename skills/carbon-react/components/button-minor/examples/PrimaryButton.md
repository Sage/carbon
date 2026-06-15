```tsx
export const PrimaryButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="medium">
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="large">
        Large
      </ButtonMinor>
    </>
  );
};
```