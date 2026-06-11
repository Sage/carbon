```tsx
export const Align: Story = () => {
  return (
    <Box id="grid-align">
      <GridContainer>
        <GridItem alignSelf="end" justifySelf="left" gridColumn="1 / 1">
          <Pod alignTitle="left" border size="medium" variant="primary">
            1
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="center" gridColumn="2 / 2">
          <Pod
            alignTitle="left"
            border
            size="medium"
            variant="primary"
            height={100}
          >
            2
          </Pod>
        </GridItem>
        <GridItem
          alignSelf="stretch"
          justifySelf="right"
          gridColumn="1 / 1"
          gridRow="2 / 2"
        >
          <Pod alignTitle="left" border size="medium" variant="primary">
            3
          </Pod>
        </GridItem>
      </GridContainer>
    </Box>
  );
};
```