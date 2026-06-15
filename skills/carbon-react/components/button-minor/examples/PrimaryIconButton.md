```tsx
export const PrimaryIconButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        destructive
        iconType="delete"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        disabled
        iconType="print"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
    </>
  );
};
```