import React from "react";
import Dl, { DlProps } from "../definition-list/dl.component";
import Dt from "../definition-list/dt.component";
import Dd from "../definition-list/dd.component";
import Typography from "../typography";
import Hr from "../hr";
import Box from "../box";

export default {
  title: "Definition-list/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = ({
  children,
  w,
  dtTextAlign,
  ddTextAlign,
  asSingleColumn,
  ...args
}: DlProps) => {
  return (
    <Dl {...args}>
      <Dt>First</Dt>
      <Dd>Description</Dd>
      <Dt>Second</Dt>
      <Dd>Description</Dd>
      <Dt>Third</Dt>
      <Dd>Description</Dd>
    </Dl>
  );
};

DefaultStory.story = {
  name: "default",
  args: {
    children: "This is an example of a Definition-list",
    w: 50,
    dtTextAlign: "right",
    ddTextAlign: "left",
    asSingleColumn: false,
  },
};

export const DLComponent = (props: Partial<DlProps>) => {
  return (
    <div>
      <Dl data-element="dl" {...props}>
        <Dt>First</Dt>
        <Dd data-element="dd">Description 1</Dd>
        <Dt>Second</Dt>
        <Dd>Description 2</Dd>
        <Dt>Third</Dt>
        <Dd>Description 3</Dd>
      </Dl>
    </div>
  );
};

export const DLBoxComponent = () => {
  return (
    <div>
      <Box data-element="box" width="65%" px={2} pt={4} pb={3}>
        <Box width="90%">
          <Typography color="rgba(0,0,0,0.55)" variant="segment-subheader-alt">
            Segment Header
          </Typography>
          <Hr ml={0} mt={2} />
        </Box>
        <Box mb={3} display="flex">
          <Box mr={1}>
            <Dl dtTextAlign="left" asSingleColumn>
              <Dt>First</Dt>
              <Dd>Description 1</Dd>
              <Dt>Second</Dt>
              <Dd>Description 2</Dd>
              <Dt>Third</Dt>
              <Dd>Description</Dd>
            </Dl>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
