```tsx
export const TertiaryDestructiveButton: Story = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        destructive
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" destructive>
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        destructive
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
};
```