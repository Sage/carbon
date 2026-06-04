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

export const buttonBarMinorSizes: Story = () => {
  return (
    <>
      <ButtonBar size="small" ml={2} mt={2} buttonType="primary">
        <ButtonMinor>Small</ButtonMinor>
        <ButtonMinor>Small</ButtonMinor>
        <ButtonMinor>Small</ButtonMinor>
      </ButtonBar>

      <ButtonBar ml={2} mt={2}>
        <ButtonMinor>Medium</ButtonMinor>
        <ButtonMinor>Medium</ButtonMinor>
        <ButtonMinor>Medium</ButtonMinor>
      </ButtonBar>

      <ButtonBar size="large" ml={2} mt={2}>
        <ButtonMinor>Large</ButtonMinor>
        <ButtonMinor>Large</ButtonMinor>
        <ButtonMinor>Large</ButtonMinor>
      </ButtonBar>

      <ButtonBar size="large" ml={2} mt={2}>
        <ButtonMinor subtext="subtext 1">Large</ButtonMinor>
        <ButtonMinor subtext="subtext 2">Large</ButtonMinor>
        <ButtonMinor subtext="subtext 3">Large</ButtonMinor>
      </ButtonBar>
    </>
  );
};
```