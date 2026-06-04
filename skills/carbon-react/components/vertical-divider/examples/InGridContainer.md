```tsx
export const InGridContainer: Story = () => {
  return (
    <GridContainer>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="1"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <VerticalDivider h={100} />
        <Square size="40px" />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="3 / 4"
        gridRow="1 /2 "
      >
        <VerticalDivider h={180} />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="5 / 6"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <VerticalDivider h={100} />
        <Square size="40px" />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="7 / 8"
        gridRow="1 / 2"
      >
        <VerticalDivider h={180} />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="9 / 10"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <VerticalDivider h={100} />
        <Square size="40px" />
      </GridItem>
    </GridContainer>
  );
};
```