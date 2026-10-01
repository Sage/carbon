import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Box from ".";
import Button from "../button";
import Typography from "../typography";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
  flexBox: true,
  grid: true,
  layout: true,
  position: true,
});

const meta: Meta<typeof Box> = {
  title: "Box",
  component: Box,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

const PRIMARY_COLOR = "rgb(0, 125, 90)";
const SECONDARY_COLOR = "rgb(0, 96, 70)";

const greenBackground: React.CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: PRIMARY_COLOR,
};

const darkGreenBackground: React.CSSProperties = {
  backgroundColor: SECONDARY_COLOR,
};

const gridBlockStyle: React.CSSProperties = {
  position: "absolute",
  inset: "0",
  backgroundColor: PRIMARY_COLOR,
};

const scrollContainerStyle: React.CSSProperties = {
  ...darkGreenBackground,
  display: "inline-block",
  width: "350px",
  height: "350px",
  marginRight: "20px",
  overflow: "auto",
  scrollbarColor: "rgb(102, 132, 148) rgb(242, 245, 246)",
  scrollbarWidth: "thin",
};

export const Spacing: Story = () => {
  return (
    <Box m={3}>
      <div style={darkGreenBackground}>
        <Box p={3}>
          <Box height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
      </div>
    </Box>
  );
};
Spacing.storyName = "Spacing";

export const Position: Story = () => {
  return (
    <Box>
      <div style={scrollContainerStyle}>
        <Box width="400px" height="80px" m={2} position="sticky" top="0">
          <div style={greenBackground}>
            <Typography inverse>This box has position sticky</Typography>
            <Button buttonType="primary" destructive>
              Button
            </Button>
          </div>
        </Box>
        <Box size="500px" />
        <Box width="400px" height="80px" m={2} position="sticky" bottom="0">
          <div style={greenBackground}>
            <Typography inverse>This box has position sticky</Typography>
            <Button buttonType="primary" destructive>
              Button
            </Button>
          </div>
        </Box>
      </div>
      <Box size="500px" position="fixed" right="0">
        <div style={greenBackground}>
          <Typography inverse>This box has position fixed</Typography>
        </div>
      </Box>
    </Box>
  );
};
Position.storyName = "Position";

export const Flex: Story = () => {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="stretch"
        m="5px"
      >
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="stretch"
        height="400px"
        m="5px"
      >
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
      </Box>
    </Box>
  );
};
Flex.storyName = "Flex";

export const grid: Story = () => {
  return (
    <Box>
      <Box display="grid" gap={1} gridTemplateColumns="auto auto auto">
        <Box padding={50} position="relative" gridColumn="1 / 3" gridRow="1">
          <div style={gridBlockStyle} />
        </Box>
        <Box padding={50} position="relative" gridColumn="3" gridRow="1 / 3">
          <div style={gridBlockStyle} />
        </Box>
        <Box padding={50} position="relative" gridColumn="1" gridRow="2">
          <div style={gridBlockStyle} />
        </Box>
        <Box padding={50} position="relative" gridColumn="2" gridRow="2">
          <div style={gridBlockStyle} />
        </Box>
      </Box>
      <Box
        display="grid"
        gap={1}
        gridTemplateColumns="repeat(4, [col] auto)"
        gridTemplateRows="repeat(3, [row] auto)"
        mt={50}
      >
        <Box
          padding={50}
          position="relative"
          gridColumn="col / span 2"
          gridRow="row"
        >
          <div style={gridBlockStyle} />
        </Box>
        <Box
          padding={50}
          position="relative"
          gridColumn="col 3 / span 2"
          gridRow="row"
        >
          <div style={gridBlockStyle} />
        </Box>
        <Box padding={50} position="relative" gridColumn="col" gridRow="row 2">
          <div style={gridBlockStyle} />
        </Box>
        <Box
          padding={50}
          position="relative"
          gridColumn="col 2 / span 3"
          gridRow="row 2"
        >
          <div style={gridBlockStyle} />
        </Box>
        <Box
          padding={50}
          position="relative"
          gridColumn="col / span 4"
          gridRow="row 3"
        >
          <div style={gridBlockStyle} />
        </Box>
      </Box>
    </Box>
  );
};
grid.storyName = "Grid";

export const Gap: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" columnGap={1}>
        <Box display="flex" flexDirection="column" rowGap={2}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={3}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={4}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={5}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={6}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={7}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={8}>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
          <Box width="100px" height="100px">
            <div style={greenBackground} />
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap={4}>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
      </Box>
      <Box display="flex" gap={8}>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
      </Box>
      <Box display="flex" gap="72px">
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
        <Box width="100px" height="100px">
          <div style={greenBackground} />
        </Box>
      </Box>
    </Box>
  );
};
Gap.storyName = "Gap";

export const Layout: Story = () => {
  return (
    <Box display="block" size="150px" overflow="hidden">
      <Box width="100px" height="100px" display="inline-block" m="5px">
        <div style={greenBackground} />
      </Box>
      <Box width="100px" height="100px" display="inline-block" m="5px">
        <div style={greenBackground} />
      </Box>
      <Box width="100px" height="100px" display="inline-block" m="5px">
        <div style={greenBackground} />
      </Box>
    </Box>
  );
};
Layout.storyName = "Layout";

export const OverflowWrap: Story = () => {
  return (
    <Box display="inline-flex">
      <div
        style={{
          border: "solid 1px #00815D",
          width: "min-content",
          marginRight: "20px",
        }}
      >
        <Box p={1} overflowWrap="break-word" width="100px">
          WithOverflowWrap
        </Box>
      </div>
      <div style={{ border: "solid 1px #00815D", width: "min-content" }}>
        <Box p={1} width="100px">
          WithoutOverflowWrap
        </Box>
      </div>
    </Box>
  );
};
OverflowWrap.storyName = "OverflowWrap";
OverflowWrap.parameters = { chromatic: { disableSnapshot: true } };
