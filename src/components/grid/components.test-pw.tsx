import React from "react";
import { GridContainer, GridItem } from ".";

export const SimpleGridExample = ({ ...itemProps }) => {
  return (
    <GridContainer>
      <GridItem alignSelf="stretch" justifySelf="stretch" {...itemProps}>
        Item 1
      </GridItem>
    </GridContainer>
  );
};

export const GridLayoutExample = () => {
  return (
    <GridContainer>
      <GridItem alignSelf="stretch" justifySelf="stretch">
        Item 1
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="1 / 6"
        gridRow="2 / 3"
      >
        Item 2
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="7 / 13"
        gridRow="4 / 5"
      >
        Item 3
      </GridItem>
    </GridContainer>
  );
};

export const ResponsiveGridExample = () => {
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
            maxWidth: "900px",
            gridColumn: "1 / 9",
            gridRow: "2 / 2",
            alignSelf: "stretch",
            justifySelf: "stretch",
          },
        ]}
      >
        Item 1
      </GridItem>
      <GridItem
        responsiveSettings={[
          {
            maxWidth: "1500px",
            gridColumn: "6 / 13",
            gridRow: "1 / 1",
            alignSelf: "end",
            justifySelf: "end",
          },
          {
            maxWidth: "900px",
            gridColumn: "1 / 9",
            gridRow: "3 / 3",
            alignSelf: "end",
            justifySelf: "end",
          },
        ]}
      >
        Item 2
      </GridItem>
      <GridItem
        responsiveSettings={[
          {
            maxWidth: "1500px",
            gridColumn: "1 / 13",
            gridRow: "3 / 3",
            alignSelf: "start",
            justifySelf: "stretch",
          },
          {
            maxWidth: "900px",
            gridColumn: "1 / 9",
            gridRow: "3 / 3",
            alignSelf: "start",
            justifySelf: "stretch",
          },
        ]}
      >
        Item 3
      </GridItem>
    </GridContainer>
  );
};
