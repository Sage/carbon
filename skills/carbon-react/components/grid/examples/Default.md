```tsx
export const Default: Story = () => {
  return (
    <GridContainer>
      <GridItem alignSelf="stretch" justifySelf="stretch">
        <Pod alignTitle="left" border size="medium" variant="primary">
          1
        </Pod>
      </GridItem>
      <GridItem alignSelf="stretch" justifySelf="stretch">
        <Pod alignTitle="left" border size="medium" variant="primary">
          2
        </Pod>
      </GridItem>
      <GridItem alignSelf="stretch" justifySelf="stretch">
        <Pod alignTitle="left" border size="medium" variant="primary">
          3
        </Pod>
      </GridItem>
    </GridContainer>
  );
};
```