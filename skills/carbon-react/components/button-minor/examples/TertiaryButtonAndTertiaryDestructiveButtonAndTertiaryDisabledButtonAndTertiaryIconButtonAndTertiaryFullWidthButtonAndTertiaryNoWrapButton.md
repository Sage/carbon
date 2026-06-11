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

export const TertiaryIconButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
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
        buttonType="tertiary"
        disabled
        iconType="print"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
    </>
  );
};

export const TertiaryFullWidthButton: Story = () => {
  return (
    <ButtonMinor mt={2} mb={2} buttonType="tertiary" fullWidth>
      Full Width
    </ButtonMinor>
  );
};

export const TertiaryNoWrapButton: Story = () => {
  return (
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" noWrap>
      Long button text
    </ButtonMinor>
  );
};
```