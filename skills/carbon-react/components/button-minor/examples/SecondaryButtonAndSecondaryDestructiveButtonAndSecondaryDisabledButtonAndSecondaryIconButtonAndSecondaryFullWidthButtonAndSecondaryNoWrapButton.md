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

export const SecondaryDestructiveButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} destructive size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} destructive>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} destructive size="large">
        Large
      </ButtonMinor>
    </>
  );
};

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

export const SecondaryFullWidthButton: Story = () => {
  return (
    <ButtonMinor mt={2} mb={2} buttonType="secondary" fullWidth>
      Full Width
    </ButtonMinor>
  );
};

export const SecondaryNoWrapButton: Story = () => {
  return (
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="secondary" noWrap>
      Long button text
    </ButtonMinor>
  );
};
```