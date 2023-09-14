import React from "react";
import { Dl, Dt, Dd } from ".";
import Icon from "../icon";

import Box from "../box";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import Hr from "../hr";
import Typography from "../typography";
import useMediaQuery from "../../hooks/useMediaQuery";

export const DefaultStory = () => (
  <Dl>
    <Dt>First</Dt>
    <Dd>Description</Dd>
    <Dt>Second</Dt>
    <Dd>Description</Dd>
    <Dt>Third</Dt>
    <Dd>Description</Dd>
  </Dl>
);

export const ActionPopoverAndIconSupport = () => (
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

export const WithConditionalRendering = () => (
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

WithConditionalRendering.parameters = { chromatic: { disableSnapshot: true } };

export const AsASingleColumn = () => (
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

export const MultipleSingleColumnsWithSegments = () => (
  <Box width="65%" px={2} pt={4} pb={3}>
    <Box width="90%">
      <Typography color="rgba(0,0,0,0.55)" variant="segment-subheader-alt">
        Segment Header
      </Typography>
      <Hr ml={0} mt={2} />
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
      <Hr ml={0} mt={2} />
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
      <Hr ml={0} mt={1} />
    </Box>
  </Box>
);

MultipleSingleColumnsWithSegments.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Responsive = () => {
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

Responsive.parameters = { chromatic: { viewports: [1200, 500] } };
