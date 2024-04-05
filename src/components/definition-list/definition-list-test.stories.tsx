import React from "react";
import Dl, { DlProps } from "./dl.component";
import Dt from "./dt/dt.component";
import Dd from "./dd/dd.component";
import { Tile } from "../tile";
import Icon from "../icon";
import Pill from "../pill";
import Typography from "../typography";
import Box from "../box";

export default {
  title: "Definition-list/Test",
  includeStories: ["DefaultStory", "UsingBoxToOverrideBackgroundColor"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = (props: DlProps) => {
  return (
    <Dl {...props}>
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

export const UsingBoxToOverrideBackgroundColor = () => (
  <Tile width="368px">
    <Dl m={0} dtTextAlign="left" ddTextAlign="right">
      <Dt>
        <Typography variant="segment-header" as="h2">
          Foo
        </Typography>
      </Dt>
      <Dd>Bar</Dd>
      <Box
        backgroundColor="yellow"
        display="flex"
        gridColumn="1 / -1"
        alignItems="center"
        py={2}
        justifyContent="space-between"
        data-element="box1"
      >
        <Dt mb={0}>
          <Box display="inline-flex" alignItems="center">
            <Icon type="tick" mr={1} />
            <Box>Foo</Box>
          </Box>
        </Dt>
        <Dd mb={0}>Bar</Dd>
      </Box>
      <Dt>
        <Pill>Foo</Pill>
      </Dt>
      <Dt>
        <Box display="inline-flex" alignItems="center">
          <Icon type="tick" mr={1} />
          <Box>Foo</Box>
        </Box>
      </Dt>
      <Dd>Bar</Dd>
      <Dt>
        <Box display="inline-flex" alignItems="center">
          <Icon type="tick" mr={1} />
          <Box>Foo</Box>
        </Box>
      </Dt>
      <Dd>Bar</Dd>
      <Dt>
        <Pill>Foo</Pill>
      </Dt>
      <Dt>
        <Box display="inline-flex" alignItems="center">
          <Icon type="tick" mr={1} />
          <Box>Foo</Box>
        </Box>
      </Dt>
      <Dd>Bar</Dd>
      <Box
        backgroundColor="greenyellow"
        display="flex"
        gridColumn="1 / -1"
        alignItems="baseline"
        py={2}
        justifyContent="space-between"
        data-element="box2"
      >
        <Dt mb={0}>
          Foo
          <Typography mb={0}>(foo)</Typography>
        </Dt>
        <Dd>Bar</Dd>
      </Box>
      <Box display="flex" gridColumn="1 / -1" justifyContent="space-between">
        <Dt>Foo</Dt>
        <Dd>Bar</Dd>
      </Box>
      <Dt>Foo</Dt>
      <Dd>Bar</Dd>
      <Dt mb={0}>
        <Typography variant="h3">Foo</Typography>
        <Typography mb={0}>(foo)</Typography>
      </Dt>
      <Dd mb={0}>
        <Typography mb={0}>Bar</Typography>
        <Typography mb={0}>Bar</Typography>
      </Dd>
    </Dl>
  </Tile>
);

UsingBoxToOverrideBackgroundColor.parameters = {
  chromatic: { disableSnapshot: false },
};
