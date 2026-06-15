```tsx
export const SecondaryButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2}>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} size="large">
        Large
      </ButtonMinor>
    </>
  );
};
```