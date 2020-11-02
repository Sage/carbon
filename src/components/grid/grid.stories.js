/* eslint-disable max-len */
import React from "react";
import { object, withKnobs } from "@storybook/addon-knobs";
import Pod from "../pod";
import { GridContainer, GridItem } from ".";

export const basic = () => {
  const group = "GridItem";
  const viewportSettings = "viewport settings";
  const groupID1 = `${group} 1`;
  const groupID2 = `${group} 2`;
  const groupID3 = `${group} 3`;

  const item11500 = object(
    `${viewportSettings} (i)`,
    {
      alignSelf: "stretch",
      gridColumn: "1 / 7",
      gridRow: "1 / 1",
      justifySelf: "stretch",
      maxWidth: "1500px",
    },
    groupID1
  );

  const item11300 = object(
    `${viewportSettings} (ii)`,
    {
      alignSelf: "stretch",
      gridColumn: "1 / 13",
      gridRow: "1 / 1",
      justifySelf: "stretch",
      maxWidth: "1300px",
    },
    groupID1
  );

  const item1900 = object(
    `${viewportSettings} (iii)`,
    {
      alignSelf: "stretch",
      gridColumn: "1 / 9",
      gridRow: "2 / 2",
      justifySelf: "stretch",
      maxWidth: "900px",
    },
    groupID1
  );

  const item21500 = object(
    `${viewportSettings} (i)`,
    {
      alignSelf: "stretch",
      gridColumn: "7 / 13",
      gridRow: "1 / 1",
      justifySelf: "stretch",
      maxWidth: "1500px",
    },
    groupID2
  );

  const item21300 = object(
    `${viewportSettings} (ii)`,
    {
      alignSelf: "stretch",
      gridColumn: "1 / 13",
      gridRow: "2 / 2",
      justifySelf: "stretch",
      maxWidth: "1300px",
    },
    groupID2
  );

  const item2900 = object(
    `${viewportSettings} (iii)`,
    {
      alignSelf: "stretch",
      gridColumn: "1 / 9",
      gridRow: "3 / 3",
      justifySelf: "stretch",
      maxWidth: "900px",
    },
    groupID2
  );

  const item31500 = object(
    `${viewportSettings} (i)`,
    {
      alignSelf: "stretch",
      gridColumn: "1 / 13",
      gridRow: "2 / 2",
      justifySelf: "stretch",
      maxWidth: "1500px",
    },
    groupID3
  );

  const item31300 = object(
    `${viewportSettings} (ii)`,
    {
      alignSelf: "stretch",
      gridColumn: "1 / 13",
      gridRow: "3 / 3",
      justifySelf: "stretch",
      maxWidth: "1300px",
    },
    groupID3
  );

  const item3900 = object(
    `${viewportSettings} (iii)`,
    {
      alignSelf: "stretch",
      gridColumn: "1 / 9",
      gridRow: "1 / 1",
      justifySelf: "stretch",
      maxWidth: "900px",
    },
    groupID3
  );

  const item1Child = (
    <Pod alignTitle="left" border padding="medium" variant="primary">
      GridItem 1.
    </Pod>
  );

  const item2Child = (
    <Pod alignTitle="left" border padding="medium" variant="primary">
      GridItem 2.
    </Pod>
  );

  const item3Child = (
    <Pod alignTitle="left" border padding="medium" variant="primary">
      GridItem 3.
    </Pod>
  );

  return (
    <GridContainer>
      <GridItem responsiveSettings={[item11500, item11300, item1900]}>
        {item1Child}
      </GridItem>
      <GridItem responsiveSettings={[item21500, item21300, item2900]}>
        {item2Child}
      </GridItem>
      <GridItem responsiveSettings={[item31500, item31300, item3900]}>
        {item3Child}
      </GridItem>
    </GridContainer>
  );
};

basic.story = {
  name: "basic",
  parameters: {
    info: { disable: true },
    docs: { page: null },
    chromatic: { viewports: [1500, 1300, 900] },
  },
};

export const Visual = () => {
  return (
    <div>
      <GridContainer>
        <GridItem alignSelf="stretch" justifySelf="stretch">
          <Pod alignTitle="left" border padding="medium" variant="primary">
            1
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="stretch">
          <Pod alignTitle="left" border padding="medium" variant="primary">
            2
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="stretch">
          <Pod alignTitle="left" border padding="medium" variant="primary">
            3
          </Pod>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem alignSelf="stretch" justifySelf="left">
          <Pod alignTitle="left" border padding="medium" variant="primary">
            1
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="center">
          <Pod alignTitle="left" border padding="medium" variant="primary">
            2
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="right">
          <Pod alignTitle="left" border padding="medium" variant="primary">
            3
          </Pod>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem alignSelf="end" justifySelf="left" gridColumn="1 / 1">
          <Pod alignTitle="left" border padding="medium" variant="primary">
            1
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="center" gridColumn="2 / 2">
          <Pod
            alignTitle="left"
            border
            padding="medium"
            variant="primary"
            style={{ height: "100px" }}
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
          <Pod alignTitle="left" border padding="medium" variant="primary">
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
              colStart: 1,
              colEnd: 9,
              gridRow: "2 / 2",
              alignSelf: "stretch",
              justifySelf: "stretch",
            },
          ]}
        >
          <Pod alignTitle="left" border padding="medium" variant="primary">
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
          <Pod alignTitle="left" border padding="medium" variant="primary">
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
          <Pod alignTitle="left" border padding="medium" variant="primary">
            3
          </Pod>
        </GridItem>
      </GridContainer>
    </div>
  );
};

Visual.story = {
  name: "visual",
  parameters: {
    info: { disable: true },
    docs: { page: null },
    chromatic: { viewports: [1500, 1300, 900] },
  },
};

export default {
  title: "Design System/Grid/Test",
  component: GridContainer,
  decorators: [withKnobs],
  chromatic: {
    disable: true,
  },
};
