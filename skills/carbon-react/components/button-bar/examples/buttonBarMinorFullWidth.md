```tsx
export const buttonBarMinorFullWidth: Story = () => {
  return (
    <>
      <ButtonBar fullWidth size="small" ml={2} mt={2}>
        <ButtonMinor fullWidth>Small full width</ButtonMinor>
        <ButtonMinor>Small full width</ButtonMinor>
        <ButtonMinor>Small full width</ButtonMinor>
      </ButtonBar>
      <ButtonBar fullWidth ml={2} mt={2}>
        <ButtonMinor buttonType="primary">Medium full width</ButtonMinor>
        <ButtonMinor>Medium full width</ButtonMinor>
        <ButtonMinor>Medium full width</ButtonMinor>
      </ButtonBar>
      <ButtonBar fullWidth size="large" ml={2} mt={2}>
        <ButtonMinor>Large full width</ButtonMinor>
        <ButtonMinor>Large full width</ButtonMinor>
        <ButtonMinor>Large full width</ButtonMinor>
      </ButtonBar>
    </>
  );
};
```