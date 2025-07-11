import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import Box from "../box";
import { Dd, Dl, Dt } from "../definition-list";
import Link from "../link";
import Button from "../button";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import GridContainer from "./grid-container";
import GridItem from "./grid-item";
import Pod from "../pod";

const styledSystemProps = generateStyledSystemProps({
  padding: true,
});

const meta: Meta = {
  title: "Grid",
  argTypes: {
    ...styledSystemProps,
    alignSelf: {
      description:
        "How the grid item is aligned along the block (column) axis. Values: start, end, center, stretch",
      required: false,
      table: {
        type: { summary: "string" },
      },
    },
    gridColumn: {
      description:
        'Starting and ending column position of the GridItem within the GridContainer separated by "/"',
      required: false,
      table: {
        type: { summary: "string" },
      },
    },
    gridRow: {
      description:
        'Starting and ending row position of the GridItem within the GridContainer separated by "/"',
      required: false,
      table: {
        type: { summary: "string" },
      },
    },
    justifySelf: {
      description:
        "How the grid item is aligned along the inline (row) axis. Values: start, end, center, stretch",
      required: false,
      table: {
        type: { summary: "string" },
      },
    },
    maxWidth: {
      description:
        "Maximum width of the screen to which these rules to be applied",
      required: false,
      table: {
        type: { summary: "string" },
      },
    },
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof GridContainer>;

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
Default.storyName = "Default";

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
Justify.storyName = "Justify";

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
Align.storyName = "Align";

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
CustomSpacing.storyName = "Custom Spacing";
CustomSpacing.parameters = { chromatic: { disableSnapshot: false } };

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
ResponsiveSettings.storyName = "Responsive Settings";

export const SubGrid: Story = () => {
  return (
    <Box id="grid-align">
      <GridContainer>
        <GridItem justifySelf="left" gridColumn="1 / 1">
          <Pod alignTitle="left" variant="primary" border size="medium">
            1
          </Pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="center" gridColumn="2 / 11">
          <Dl>
            <Dt>Drink</Dt>
            <Dd>Coffee</Dd>
            <Dt>Brew Method</Dt>
            <Dd>Stove Top Moka Pot</Dd>
            <Dt>Brand of Coffee</Dt>
            <Dd>Magic Coffee Beans</Dd>
            <Dt>Website</Dt>
            <Dd>
              <Link href="www.sage.com">Magic Coffee Beans' Website</Link>
            </Dd>
            <Dt>Email</Dt>
            <Dd>
              <Link href="magic@coffeebeans.com">magic@coffeebeans.com</Link>
            </Dd>
            <Dt>Main and Registered Address</Dt>
            <Dd mb="4px">Magic Coffee Beans,</Dd>
            <Dd mb="4px">In The Middle of Our Street,</Dd>
            <Dd mb="4px">Madness,</Dd>
            <Dd mb="4px">CO4 3VE</Dd>
            <Dd>
              <Button
                buttonType="tertiary"
                iconType="link"
                iconPosition="after"
                href="https://goo.gl/maps/GMReLoBpbn9mdZVZ7"
              >
                View in Google Maps
              </Button>
            </Dd>
          </Dl>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="right" gridColumn="11 / 12">
          <Pod alignTitle="left" variant="primary" border size="medium">
            3
          </Pod>
        </GridItem>
      </GridContainer>
    </Box>
  );
};
SubGrid.storyName = "Sub Grid";
SubGrid.parameters = { chromatic: { disableSnapshot: false } };
