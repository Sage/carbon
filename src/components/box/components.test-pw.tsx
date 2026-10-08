import React from "react";
import Box, { BoxProps } from ".";
import Typography from "../typography";
import Button from "../button";

const greenBackground: React.CSSProperties = {
  backgroundColor: "rgb(0, 125, 90)",
  color: "rgb(255, 255, 255)",
  height: "100px",
  width: "100px",
};

const darkTealBackground: React.CSSProperties = {
  backgroundColor: "rgb(0, 26, 37)",
  display: "inline-block",
};

const boxShadowExample: React.CSSProperties = {
  boxShadow:
    "0 10px 20px 0 rgba(0, 20, 30, 0.2), 0 20px 40px 0 rgba(0, 20, 30, 0.1)",
  height: "100px",
  margin: "var(--global-space-layout-xs)",
  padding: "var(--global-space-layout-xs)",
};

export const Default = (props: Partial<BoxProps>) => {
  return (
    <Box m={3} p={3} width={400} height={400} data-element="box" {...props}>
      This is some sample text
    </Box>
  );
};

export const Spacing = () => {
  return (
    <Box m={3} p={3}>
      <Box height="100px" />
    </Box>
  );
};

export const Position = () => {
  return (
    <Box>
      <Box display="inline-block" size="350px" overflow="auto" mr="20px">
        <Box width="400px" height="80px" m={2} position="sticky" top="0">
          <Typography inverse>This box has position sticky</Typography>
          <Button buttonType="primary" destructive>
            Button
          </Button>
        </Box>
        <Box size="500px" />
        <Box width="400px" height="80px" m={2} position="sticky" bottom="0">
          <Typography inverse>This box has position sticky</Typography>
          <Button buttonType="primary" destructive>
            Button
          </Button>
        </Box>
      </Box>
      <Box size="500px" position="fixed" right="0">
        <Box>
          <Typography inverse>This box has position fixed</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const Color = () => {
  return (
    <Box m={3} p={3}>
      <div style={greenBackground}>This is some sample text</div>
    </Box>
  );
};

export const BoxShadow = () => {
  return <div style={boxShadowExample} />;
};

export const Flex = () => {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="stretch"
        m="5px"
      >
        <Box width="100px" height="100px" />
        <Box width="100px" height="100px" />
        <Box width="100px" height="100px" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="stretch"
        height="400px"
        m="5px"
      >
        <Box width="100px" height="100px" />
        <Box width="100px" height="100px" />
        <Box width="100px" height="100px" />
      </Box>
    </Box>
  );
};

export const Gap = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" columnGap={1}>
        <Box display="flex" flexDirection="column" rowGap={2}>
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={3}>
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={4}>
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={5}>
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={6}>
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={7}>
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={8}>
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
          <Box width="100px" height="100px" />
        </Box>
      </Box>
      <Box display="flex" gap={4}>
        <Box width="100px" height="100px" />
        <Box width="100px" height="100px" />
        <Box width="100px" height="100px" />
      </Box>
      <Box display="flex" gap={8}>
        <Box width="100px" height="100px" />
        <Box width="100px" height="100px" />
        <Box width="100px" height="100px" />
      </Box>
      <Box display="flex" gap="72px">
        <Box width="100px" height="100px" />
        <Box width="100px" height="100px" />
        <Box width="100px" height="100px" />
      </Box>
    </Box>
  );
};

export const Layout = () => {
  return (
    <Box display="block" size="150px" overflow="hidden">
      <Box width="100px" height="100px" display="inline-block" m="5px" />
      <Box width="100px" height="100px" display="inline-block" m="5px" />
      <Box width="100px" height="100px" display="inline-block" m="5px" />
    </Box>
  );
};

export const OverflowWrap = () => {
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

export const Scroll = () => {
  return (
    <div>
      <Box display="inline-block" size="150px" overflow="auto" mr="20px">
        <Box width="100px" height="100px" display="inline-block" m="5px" />
        <Box width="100px" height="100px" display="inline-block" m="5px" />
        <Box width="100px" height="100px" display="inline-block" m="5px" />
      </Box>
      <div style={darkTealBackground}>
        <Box display="inline-block" size="150px" overflow="auto">
          <Box width="100px" height="100px" display="inline-block" m="5px" />
          <Box width="100px" height="100px" display="inline-block" m="5px" />
          <Box width="100px" height="100px" display="inline-block" m="5px" />
        </Box>
      </div>
    </div>
  );
};
