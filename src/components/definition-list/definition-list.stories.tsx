import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import useMediaQuery from "../../hooks/useMediaQuery";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import { Dl, Dt, Dd } from ".";
import Icon from "../icon";

import Box from "../box";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import Divider from "../divider";
import Typography from "../typography";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof Dl> = {
  title: "Definition List",
  component: Dl,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Dl>;

export const DefaultStory: Story = () => (
  <Dl>
    <Dt>First</Dt>
    <Dd>Description</Dd>
    <Dt>Second</Dt>
    <Dd>Description</Dd>
    <Dt>Third</Dt>
    <Dd>Description</Dd>
  </Dl>
);
DefaultStory.storyName = "Default";

export const ActionPopoverAndIconSupport: Story = () => (
  <Dl>
    <Dt>
      <Box paddingTop="4px">Term example</Box>
    </Dt>
    <Dd>
      <Box display="inline-flex" alignItems="center">
        <Box mr={1}>Details example</Box>
        <Icon type="tick" />
      </Box>
    </Dd>
    <Dt>
      <Box paddingTop="4px">Term example</Box>
    </Dt>
    <Dd>
      <Box display="inline-flex" alignItems="center">
        <Icon mr={1} type="tick" />
        <Box mr={2}>Details example</Box>
        <ActionPopover rightAlignMenu>
          <ActionPopoverItem>Option 1</ActionPopoverItem>
          <ActionPopoverItem>Option 2</ActionPopoverItem>
        </ActionPopover>
      </Box>
    </Dd>
  </Dl>
);
ActionPopoverAndIconSupport.storyName = "Action Popover and Icon Support";

export const WithConditionalRendering: Story = () => (
  <Dl>
    <Dt>First</Dt>
    <Dd>Description</Dd>
    <Dt>Second</Dt>
    <Dd>Description</Dd>
    {true && (
      <>
        <Dt>Third inside of React Fragment</Dt>
        <Dd>Description inside of React Fragment</Dd>
      </>
    )}
  </Dl>
);
WithConditionalRendering.storyName = "With Conditional Rendering";
WithConditionalRendering.parameters = { chromatic: { disableSnapshot: true } };

export const AsASingleColumn: Story = () => (
  <Dl w={200} dtTextAlign="left" asSingleColumn>
    <Dt>First</Dt>
    <Dd>Description</Dd>
    <Dt>Second</Dt>
    <Dd>
      <Box display="inline-flex" alignItems="center">
        <Box mr={1}>Details example</Box>
        <Icon type="tick" />
      </Box>
    </Dd>
    <Dt>Third</Dt>
    <Dd>Description</Dd>
  </Dl>
);
AsASingleColumn.storyName = "As a single column";

export const MultipleSingleColumnsWithSegments: Story = () => (
  <Box width="65%" px={2} pt={4} pb={3}>
    <Box width="90%">
      <Typography color="rgba(0,0,0,0.55)" variant="h4">
        Segment Header
      </Typography>
      <Divider type="horizontal" ml={0} mt={2} />
    </Box>
    <Box mb={3} display="flex">
      <Box flexGrow={1}>
        <Dl dtTextAlign="left" asSingleColumn>
          <Dt>First</Dt>
          <Dd>Description</Dd>
          <Dt>Second</Dt>
          <Dd>
            <Box display="inline-flex" alignItems="center">
              <Box mr={1}>Details example</Box>
              <Icon type="tick" />
            </Box>
          </Dd>
          <Dt>Third</Dt>
          <Dd>Description</Dd>
        </Dl>
      </Box>
      <Box flexGrow={1}>
        <Dl dtTextAlign="left" asSingleColumn>
          <Dt>First</Dt>
          <Dd>Description</Dd>
          <Dt>Second</Dt>
          <Dd>
            <Box display="inline-flex" alignItems="center">
              <Box mr={1}>Details example</Box>
              <Icon type="tick" />
            </Box>
          </Dd>
          <Dt>Third</Dt>
          <Dd>Description</Dd>
        </Dl>
      </Box>
    </Box>
    <Box width="90%">
      <Typography color="rgba(0,0,0,0.55)" variant="segment-subheader-alt">
        Segment Header
      </Typography>
      <Divider type="horizontal" ml={0} mt={2} />
    </Box>
    <Box display="flex">
      <Box width="100%">
        <Dl dtTextAlign="left" asSingleColumn>
          <Dt>First</Dt>
          <Dd>Description</Dd>
          <Dt>Second</Dt>
          <Dd>
            <Box display="inline-flex" alignItems="center">
              <Box mr={1}>Details example</Box>
              <Icon type="tick" />
            </Box>
          </Dd>
          <Dt>Third</Dt>
          <Dd>Description</Dd>
        </Dl>
      </Box>
      <Box width="100%">
        <Dl dtTextAlign="left" asSingleColumn>
          <Dt>First</Dt>
          <Dd>Description</Dd>
          <Dt>Second</Dt>
          <Dd>
            <Box display="inline-flex" alignItems="center">
              <Box mr={1}>Details example</Box>
              <Icon type="tick" />
            </Box>
          </Dd>
          <Dt>Third</Dt>
          <Dd>Description</Dd>
        </Dl>
      </Box>
    </Box>
    <Box width="90%">
      <Divider type="horizontal" ml={0} mt={1} />
    </Box>
  </Box>
);
MultipleSingleColumnsWithSegments.storyName =
  "Multiple single columns with segments";
MultipleSingleColumnsWithSegments.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Responsive: Story = () => {
  const smallScreen = useMediaQuery("(max-width: 700px)");
  return (
    <Dl
      ddTextAlign={smallScreen ? "left" : undefined}
      dtTextAlign={smallScreen ? "left" : "right"}
      asSingleColumn={smallScreen}
    >
      <Dt>First</Dt>
      <Dd>Description</Dd>
      <Dt>Second</Dt>
      <Dd>
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>Details example</Box>
          <Icon type="tick" />
        </Box>
      </Dd>
      <Dt>Third</Dt>
      <Dd>Description</Dd>
    </Dl>
  );
};
Responsive.storyName = "Responsive";
Responsive.parameters = { chromatic: { viewports: [1200, 500] } };
