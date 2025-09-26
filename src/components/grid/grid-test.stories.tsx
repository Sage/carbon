import React from "react";

import Typography from "../typography";
import Pod from "../pod";
import { GridContainer, GridItem } from ".";

export default {
  title: "Deprecated/Grid/Test",
  parameters: {
    info: { disable: true },
    chromatic: { disableSnapshot: true, viewports: [1500, 1300, 900] },
  },
};

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

Default.story = {
  name: "default",
  args: {
    item11500: {
      alignSelf: "stretch",
      gridColumn: "1 / 7",
      gridRow: "1 / 1",
      justifySelf: "stretch",
      maxWidth: "1500px",
    },
    item11300: {
      alignSelf: "stretch",
      gridColumn: "1 / 13",
      gridRow: "1 / 1",
      justifySelf: "stretch",
      maxWidth: "1300px",
    },
    item1900: {
      alignSelf: "stretch",
      gridColumn: "1 / 9",
      gridRow: "2 / 2",
      justifySelf: "stretch",
      maxWidth: "900px",
    },
    item21300: {
      alignSelf: "stretch",
      gridColumn: "1 / 13",
      gridRow: "2 / 2",
      justifySelf: "stretch",
      maxWidth: "1300px",
    },
    item21500: {
      alignSelf: "stretch",
      gridColumn: "7 / 13",
      gridRow: "1 / 1",
      justifySelf: "stretch",
      maxWidth: "1500px",
    },
    item2900: {
      alignSelf: "stretch",
      gridColumn: "1 / 9",
      gridRow: "3 / 3",
      justifySelf: "stretch",
      maxWidth: "900px",
    },
    item31300: {
      alignSelf: "stretch",
      gridColumn: "1 / 13",
      gridRow: "3 / 3",
      justifySelf: "stretch",
      maxWidth: "1300px",
    },
    item31500: {
      alignSelf: "stretch",
      gridColumn: "1 / 13",
      gridRow: "2 / 2",
      justifySelf: "stretch",
      maxWidth: "1500px",
    },
    item3900: {
      alignSelf: "stretch",
      gridColumn: "1 / 9",
      gridRow: "1 / 1",
      justifySelf: "stretch",
      maxWidth: "900px",
    },
  },
};

Visual.story = {
  name: "visual",
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

const paddingPropsAndValues = [
  ["p", "15px"],
  ["pl", "15px"],
  ["pr", "15px"],
  ["pt", "15px"],
  ["pb", "15px"],
  ["px", "15px"],
  ["py", "15px"],
  ["p", 0],
  ["pl", 1],
  ["pr", 2],
  ["pt", 3],
  ["pb", 4],
  ["px", 5],
  ["py", 6],
  ["p", 7],
  ["pl", 8],
  ["padding", "15px"],
  ["padding", "15px 20px"],
  ["padding", "15px 20px 11px"],
  ["padding", "15px 20px 11px 5px"],
  ["paddingLeft", "15px"],
  ["paddingRight", "15px"],
  ["paddingTop", "15px"],
  ["paddingBottom", "15px"],
  ["padding", 2],
  ["paddingLeft", 4],
  ["paddingRight", 7],
  ["paddingTop", 3],
  ["paddingBottom", 8],
  ["padding", "var(--spacing125)"],
  ["padding", "var(--spacing125) var(--spacing150)"],
  ["padding", "var(--spacing125) var(--spacing150) var(--spacing100)"],
  [
    "padding",
    "var(--spacing125) var(--spacing150) var(--spacing100) var(--spacing150)",
  ],
  ["paddingLeft", "var(--spacing125)"],
  ["paddingRight", "var(--spacing150)"],
  ["paddingTop", "var(--spacing100)"],
  ["paddingBottom", "var(--spacing150)"],
];

export const CustomPadding = () => {
  return (
    <GridContainer>
      {paddingPropsAndValues.map(([prop, value], index) => (
        <GridItem key={`${prop}_${index + 1}`} {...{ [prop]: value }}>
          <Pod>
            {prop}: {value}
          </Pod>
        </GridItem>
      ))}
    </GridContainer>
  );
};

export const CustomPaddingResponsive = () => {
  return (
    <GridContainer>
      <GridItem
        responsiveSettings={[
          { p: "8px", maxWidth: "1500px" },
          { p: "12px", maxWidth: "1300px" },
        ]}
      >
        <Pod>1</Pod>
      </GridItem>
      <GridItem
        responsiveSettings={[
          { pl: "8px", maxWidth: "1500px" },
          { pl: "12px", maxWidth: "1300px" },
        ]}
      >
        <Pod>2</Pod>
      </GridItem>
      <GridItem
        responsiveSettings={[
          { pr: "8px", maxWidth: "1500px" },
          { pr: "12px", maxWidth: "1300px" },
        ]}
      >
        <Pod>3</Pod>
      </GridItem>
      <GridItem
        responsiveSettings={[
          { pt: "8px", maxWidth: "1500px" },
          { pt: "12px", maxWidth: "1300px" },
        ]}
      >
        <Pod>4</Pod>
      </GridItem>
      <GridItem
        responsiveSettings={[
          { pb: "8px", maxWidth: "1500px" },
          { pb: "12px", maxWidth: "1300px" },
        ]}
      >
        <Pod>5</Pod>
      </GridItem>
    </GridContainer>
  );
};

export const gridGapExample = () => {
  return (
    <GridContainer gridGap="16px">
      <GridItem>
        <Pod>1</Pod>
      </GridItem>
      <GridItem>
        <Pod>2</Pod>
      </GridItem>
      <GridItem>
        <Pod>3</Pod>
      </GridItem>
    </GridContainer>
  );
};

export const gridRowGapExample = () => {
  return (
    <GridContainer gridRowGap="16px">
      <GridItem>
        <Pod>1</Pod>
      </GridItem>
      <GridItem>
        <Pod>2</Pod>
      </GridItem>
      <GridItem>
        <Pod>3</Pod>
      </GridItem>
    </GridContainer>
  );
};

export const gridColumnGapExample = () => {
  return (
    <GridContainer gridColumnGap="16px">
      <GridItem>
        <Pod>1</Pod>
      </GridItem>
      <GridItem>
        <Pod>2</Pod>
      </GridItem>
      <GridItem>
        <Pod>3</Pod>
      </GridItem>
    </GridContainer>
  );
};

export const gridAutoFlowExample = () => {
  return (
    <>
      <Typography variant="h1" fontWeight="700" fontSize="16px">
        grid-auto-flow = "row dense"
      </Typography>

      <GridContainer gridAutoFlow="row dense">
        <GridItem>
          <Pod>1</Pod>
        </GridItem>
        <GridItem>
          <Pod>2</Pod>
        </GridItem>
        <GridItem>
          <Pod>3</Pod>
        </GridItem>
      </GridContainer>

      <Typography fontWeight="700" fontSize="16px" variant="h1">
        grid-auto-flow = "dense"
      </Typography>
      <GridContainer gridAutoFlow="dense">
        <GridItem>
          <Pod>4</Pod>
        </GridItem>
        <GridItem>
          <Pod>5</Pod>
        </GridItem>
        <GridItem>
          <Pod>6</Pod>
        </GridItem>
      </GridContainer>

      <Typography fontWeight="700" fontSize="16px" variant="h1">
        grid-auto-flow = "column dense"
      </Typography>
      <GridContainer gridAutoFlow="column dense">
        <GridItem>
          <Pod>7</Pod>
        </GridItem>
        <GridItem>
          <Pod>8</Pod>
        </GridItem>
        <GridItem>
          <Pod>9</Pod>
        </GridItem>
      </GridContainer>
    </>
  );
};

export const gridTemplateRowsExample = () => {
  return (
    <GridContainer gridTemplateRows="100px 1fr">
      <GridItem>
        <Pod>1</Pod>
      </GridItem>
      <GridItem>
        <Pod>2</Pod>
      </GridItem>
      <GridItem>
        <Pod>3</Pod>
      </GridItem>
    </GridContainer>
  );
};

export const gridTemplateColumnsExample = () => {
  return (
    <GridContainer gridTemplateColumns="100px 1fr">
      <GridItem>
        <Pod>1</Pod>
      </GridItem>
      <GridItem>
        <Pod>2</Pod>
      </GridItem>
      <GridItem>
        <Pod>3</Pod>
      </GridItem>
    </GridContainer>
  );
};
