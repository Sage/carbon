```tsx
export const TertiaryDisabledButton: Story = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        disabled
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" disabled>
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        disabled
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
};
```