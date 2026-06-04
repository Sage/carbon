```tsx
export const buttonBarFullWidth: Story = () => {
  return (
    <>
      <ButtonBar fullWidth size="small" ml={2} mt={2}>
        <Button fullWidth>Small full width</Button>
        <Button>Small full width</Button>
        <Button>Small full width</Button>
      </ButtonBar>
      <ButtonBar fullWidth ml={2} mt={2}>
        <Button buttonType="primary">Medium full width</Button>
        <Button>Medium full width</Button>
        <Button>Medium full width</Button>
      </ButtonBar>
      <ButtonBar fullWidth size="large" ml={2} mt={2}>
        <Button>Large full width</Button>
        <Button>Large full width</Button>
        <Button>Large full width</Button>
      </ButtonBar>
    </>
  );
};
```