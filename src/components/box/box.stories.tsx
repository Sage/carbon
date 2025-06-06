import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Box, { BoxProps } from ".";
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

export const Spacing: Story = () => {
  return (
    <Box m={3} p={3} bg="secondary">
      <Box height="100px" bg="primary" />
    </Box>
  );
};
Spacing.storyName = "Spacing";

export const Position: Story = () => {
  return (
    <Box>
      <Box
        display="inline-block"
        size="350px"
        overflow="auto"
        scrollVariant="light"
        mr="20px"
        bg="secondary"
      >
        <Box
          width="400px"
          height="80px"
          m={2}
          bg="primary"
          position="sticky"
          top="0"
        >
          <Typography color="white">This box has position sticky</Typography>
          <Button buttonType="primary" destructive>
            Button
          </Button>
        </Box>
        <Box size="500px" />
        <Box
          width="400px"
          height="80px"
          m={2}
          bg="primary"
          position="sticky"
          bottom="0"
        >
          <Typography color="white">This box has position sticky</Typography>
          <Button buttonType="primary" destructive>
            Button
          </Button>
        </Box>
      </Box>
      <Box size="500px" position="fixed" right="0" bg="primary">
        <Box>
          <Typography color="white">This box has position fixed</Typography>
        </Box>
      </Box>
    </Box>
  );
};
Position.storyName = "Position";

export const Color: Story = () => {
  return (
    <Box m={3} p={3} bg="secondary">
      <Box width="100px" height="100px" bg="primary" color="yellow">
        This is some sample text
      </Box>
    </Box>
  );
};
Color.storyName = "Color";

export const BoxShadow: Story = () => {
  return (
    <Box m={3} p={3} height="100px" bg="secondary" boxShadow="boxShadow200" />
  );
};
BoxShadow.storyName = "Box Shadow";

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
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="stretch"
        height="400px"
        m="5px"
      >
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
    </Box>
  );
};
Flex.storyName = "Flex";

export const grid: Story = () => {
  return (
    <Box>
      <Box display="grid" gap={1} gridTemplateColumns="auto auto auto">
        <Box padding={50} bg="primary" gridColumn="1 / 3" gridRow="1" />
        <Box padding={50} bg="primary" gridColumn="3" gridRow="1 / 3" />
        <Box padding={50} bg="primary" gridColumn="1" gridRow="2" />
        <Box padding={50} bg="primary" gridColumn="2" gridRow="2" />
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
          bg="primary"
          gridColumn="col / span 2"
          gridRow="row"
        />
        <Box
          padding={50}
          bg="primary"
          gridColumn="col 3 / span 2"
          gridRow="row"
        />
        <Box padding={50} bg="primary" gridColumn="col" gridRow="row 2" />
        <Box
          padding={50}
          bg="primary"
          gridColumn="col 2 / span 3"
          gridRow="row 2"
        />
        <Box
          padding={50}
          bg="primary"
          gridColumn="col / span 4"
          gridRow="row 3"
        />
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
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={3}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={4}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={5}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={6}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={7}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={8}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
      </Box>
      <Box display="flex" gap={4}>
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box display="flex" gap={8}>
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box display="flex" gap="72px">
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
    </Box>
  );
};
Gap.storyName = "Gap";

export const Layout: Story = () => {
  return (
    <Box display="block" size="150px" overflow="hidden">
      <Box
        width="100px"
        height="100px"
        bg="primary"
        display="inline-block"
        m="5px"
      />
      <Box
        width="100px"
        height="100px"
        bg="primary"
        display="inline-block"
        m="5px"
      />
      <Box
        width="100px"
        height="100px"
        bg="primary"
        display="inline-block"
        m="5px"
      />
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

export const Scroll: Story = () => {
  return (
    <div>
      <Box
        display="inline-block"
        size="150px"
        overflow="auto"
        scrollVariant="light"
        mr="20px"
      >
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
      </Box>
      <Box backgroundColor="rgb(0, 26, 37)" display="inline-block">
        <Box
          display="inline-block"
          size="150px"
          overflow="auto"
          scrollVariant="dark"
        >
          <Box
            width="100px"
            height="100px"
            bg="primary"
            display="inline-block"
            m="5px"
          />
          <Box
            width="100px"
            height="100px"
            bg="primary"
            display="inline-block"
            m="5px"
          />
          <Box
            width="100px"
            height="100px"
            bg="primary"
            display="inline-block"
            m="5px"
          />
        </Box>
      </Box>
    </div>
  );
};
Scroll.storyName = "Scroll";
Scroll.parameters = { chromatic: { disableSnapshot: true } };

export const RoundedCorners: Story = () => {
  const radiusTokens: BoxProps["borderRadius"][] = [
    "borderRadius000",
    "borderRadius010",
    "borderRadius025",
    "borderRadius050",
    "borderRadius100",
    "borderRadius200",
    "borderRadius400",
    "borderRadiusCircle",
  ];

  return (
    <Box display="flex" justifyContent="space-between">
      {radiusTokens.map((token) => (
        <Box
          key={`${token}-example`}
          backgroundColor="primary"
          height="100px"
          width="100px"
          borderRadius={token}
        />
      ))}
    </Box>
  );
};
RoundedCorners.storyName = "Rounded Corners";
RoundedCorners.parameters = { chromatic: { disableSnapshot: false } };
