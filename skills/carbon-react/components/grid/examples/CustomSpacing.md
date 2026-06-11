```tsx
export const CustomSpacing: Story = () => {
  return (
    <GridContainer p="20px" gridGap="5px">
      <GridItem
        p="20px 5px 20px 0"
        gridColumn="1 / 10"
        alignSelf="stretch"
        justifySelf="stretch"
        responsiveSettings={[
          {
            maxWidth: "800px",
            gridColumn: "1 / 13",
            gridRow: "1 / 1",
            p: 0,
          },
        ]}
      >
        <Pod alignTitle="left" border size="medium" variant="primary">
          1
        </Pod>
      </GridItem>
      <GridItem
        pt="20px"
        pb="20px"
        gridColumn="10 / 13"
        alignSelf="stretch"
        justifySelf="stretch"
        responsiveSettings={[
          {
            maxWidth: "800px",
            gridColumn: "1 / 13",
            gridRow: "2 / 2",
            pt: 0,
            pb: 0,
          },
        ]}
      >
        <Pod alignTitle="left" border size="medium" variant="primary">
          2
        </Pod>
      </GridItem>
      <GridItem
        pr="20px"
        gridColumn="1 / 6"
        alignSelf="stretch"
        justifySelf="stretch"
        responsiveSettings={[
          {
            maxWidth: "800px",
            gridColumn: "1 / 13",
            gridRow: "3 / 3",
            pr: 0,
          },
        ]}
      >
        <Pod alignTitle="left" border size="medium" variant="primary">
          3
        </Pod>
      </GridItem>
      <GridItem
        pl="20px"
        gridColumn="6 / 13"
        alignSelf="stretch"
        justifySelf="stretch"
        responsiveSettings={[
          {
            maxWidth: "800px",
            gridColumn: "1 / 13",
            gridRow: "4 / 4",
            pl: 0,
          },
        ]}
      >
        <Pod alignTitle="left" border size="medium" variant="primary">
          4
        </Pod>
      </GridItem>
    </GridContainer>
  );
};
```