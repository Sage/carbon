```tsx
export const buttonBarSizes: Story = () => {
  return (
    <>
      <ButtonBar size="small" ml={2} mt={2} buttonType="primary">
        <Button>Small</Button>
        <Button>Small</Button>
        <Button>Small</Button>
      </ButtonBar>
      <ButtonBar ml={2} mt={2}>
        <Button>Medium</Button>
        <Button>Medium</Button>
        <Button>Medium</Button>
      </ButtonBar>
      <ButtonBar size="large" ml={2} mt={2}>
        <Button>Large</Button>
        <Button>Large</Button>
        <Button>Large</Button>
      </ButtonBar>
      <ButtonBar size="large" ml={2} mt={2}>
        <Button subtext="subtext 1">Large</Button>
        <Button subtext="subtext 2">Large</Button>
        <Button subtext="subtext 3">Large</Button>
      </ButtonBar>
    </>
  );
};
```