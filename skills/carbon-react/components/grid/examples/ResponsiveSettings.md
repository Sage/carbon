```tsx
export const ResponsiveSettings: Story = () => {
  return (
    <GridContainer>
      <GridItem
        responsiveSettings={[
          {
            maxWidth: "1500px",
            gridColumn: "1 / 7",
            gridRow: "1 / 1",
            alignSelf: "stretch",
            justifySelf: "stretch",
          },
          {
            maxWidth: "1300px",
            gridColumn: "1 / 13",
            gridRow: "1 / 1",
            alignSelf: "stretch",
            justifySelf: "stretch",
          },
          {
            maxWidth: "900px",
            gridColumn: "1 / 9",
            gridRow: "2 / 2",
            alignSelf: "stretch",
            justifySelf: "stretch",
          },
        ]}
      >
        <Pod alignTitle="left" border size="medium" variant="primary">
          1
        </Pod>
      </GridItem>
      <GridItem
        responsiveSettings={[
          {
            maxWidth: "1500px",
            gridColumn: "7 / 13",
            gridRow: "1 / 1",
            alignSelf: "stretch",
            justifySelf: "stretch",
          },
          {
            maxWidth: "1300px",
            gridColumn: "1 / 13",
            gridRow: "2 / 2",
            alignSelf: "stretch",
            justifySelf: "stretch",
          },
          {
            maxWidth: "900px",
            gridColumn: "1 / 9",
            gridRow: "3 / 3",
            alignSelf: "stretch",
            justifySelf: "stretch",
          },
        ]}
      >
        <Pod alignTitle="left" border size="medium" variant="primary">
          2
        </Pod>
      </GridItem>
      <GridItem
        responsiveSettings={[
          {
            maxWidth: "1500px",
            gridColumn: "1 / 13",
            gridRow: "2 / 2",
            alignSelf: "stretch",
            justifySelf: "stretch",
          },
          {
            maxWidth: "1300px",
            gridColumn: "1 / 13",
            gridRow: "3 / 3",
            alignSelf: "stretch",
            justifySelf: "stretch",
          },
          {
            maxWidth: "900px",
            gridColumn: "1 / 9",
            gridRow: "1 / 1",
            alignSelf: "stretch",
            justifySelf: "stretch",
          },
        ]}
      >
        <Pod alignTitle="left" border size="medium" variant="primary">
          3
        </Pod>
      </GridItem>
    </GridContainer>
  );
};
```