```tsx
export const SecondaryDisabledButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} size="small" disabled>
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} disabled>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} size="large" disabled>
        Large
      </ButtonMinor>
    </>
  );
};
```