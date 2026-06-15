```tsx
export const SecondaryIconButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
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