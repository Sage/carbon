```tsx
export const Justify: Story = () => {
  return (
    <Box id="grid-justify">
      <GridContainer>
        <GridItem alignSelf="stretch" justifySelf="left">
          <Pod alignTitle="left" border size="medium" variant="primary">
            1
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="center">
          <Pod alignTitle="left" border size="medium" variant="primary">
            2
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="right">
          <Pod alignTitle="left" border size="medium" variant="primary">
            3
          </Pod>
        </GridItem>
      </GridContainer>
    </Box>
  );
};
```