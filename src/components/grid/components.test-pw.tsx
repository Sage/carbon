import React from "react";

import Pod from "../pod";
import { GridContainer, GridItem } from ".";

interface ItemProps {
  alignSelf: string;
  gridColumn: string;
  gridRow: string;
  justifySelf: string;
  maxWidth: string;
}

interface Items {
  [key: string]: ItemProps; // you could probably define each item name but it might be overkill
}

export const Default = ({
  item11500,
  item11300,
  item1900,
  item21300,
  item21500,
  item2900,
  item31300,
  item31500,
  item3900,
}: Items) => {
  const item1Child = (
    <Pod alignTitle="left" border variant="primary">
      GridItem 1.
    </Pod>
  );
  const item2Child = (
    <Pod alignTitle="left" border variant="primary">
      GridItem 2.
    </Pod>
  );
  const item3Child = (
    <Pod alignTitle="left" border variant="primary">
      GridItem 3.
    </Pod>
  );
  const GridItemWrapper = () => (
    <>
      <GridItem responsiveSettings={[item11500, item11300, item1900]}>
        {item1Child}
      </GridItem>
      <GridItem responsiveSettings={[item21500, item21300, item2900]}>
        {item2Child}
      </GridItem>
    </>
  );
  return (
    <GridContainer>
      <GridItemWrapper />
      <GridItem responsiveSettings={[item31500, item31300, item3900]}>
        {item3Child}
      </GridItem>
    </GridContainer>
  );
};

export const Visual = () => {
  return (
    <div>
      <GridContainer>
        <GridItem alignSelf="stretch" justifySelf="stretch">
          <Pod alignTitle="left" border variant="primary">
            1
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="stretch">
          <Pod alignTitle="left" border variant="primary">
            2
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="stretch">
          <Pod alignTitle="left" border variant="primary">
            3
          </Pod>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem alignSelf="stretch" justifySelf="left">
          <Pod alignTitle="left" border variant="primary">
            1
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="center">
          <Pod alignTitle="left" border variant="primary">
            2
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="right">
          <Pod alignTitle="left" border variant="primary">
            3
          </Pod>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem alignSelf="end" justifySelf="left" gridColumn="1 / 1">
          <Pod alignTitle="left" border variant="primary">
            1
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="center" gridColumn="2 / 2">
          <Pod alignTitle="left" border variant="primary" height="100px">
            2
          </Pod>
        </GridItem>
        <GridItem
          alignSelf="stretch"
          justifySelf="right"
          gridColumn="1 / 1"
          gridRow="2 / 2"
        >
          <Pod alignTitle="left" border variant="primary">
            3
          </Pod>
        </GridItem>
      </GridContainer>
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
              gridRow: "2 / 2",
              alignSelf: "stretch",
              justifySelf: "stretch",
            },
          ]}
        >
          <Pod alignTitle="left" border variant="primary">
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
          <Pod alignTitle="left" border variant="primary">
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
          <Pod alignTitle="left" border variant="primary">
            3
          </Pod>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export const SimpleGridExample = ({ ...itemProps }) => {
  return (
    <GridContainer>
      <GridItem alignSelf="stretch" justifySelf="stretch" {...itemProps}>
        <Pod>Item 1</Pod>
      </GridItem>
    </GridContainer>
  );
};

export const GridLayoutExample = () => {
  return (
    <GridContainer>
      <GridItem alignSelf="stretch" justifySelf="stretch">
        <Pod>Item 1</Pod>
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="1 / 6"
        gridRow="2 / 3"
      >
        <Pod>Item 2</Pod>
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="7 / 13"
        gridRow="4 / 5"
      >
        <Pod>Item 3</Pod>
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
        <Pod>Item 1</Pod>
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
            maxWidth: "1300px",
            gridColumn: "1 / 13",
            gridRow: "2 / 2",
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
        <Pod>Item 2</Pod>
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
            maxWidth: "1300px",
            gridColumn: "1 / 13",
            gridRow: "2 / 2",
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
        <Pod>Item 3</Pod>
      </GridItem>
    </GridContainer>
  );
};
