import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Card from "../card";
import { Tile, TileContent } from "../tile";
import Divider from "../divider";
import Box from "../box";

import Detail from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Detail> = {
  title: "Deprecated/Detail",
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  component: Detail,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Detail>;

export const Default: Story = () => (
  <Detail>This is where the children will live.</Detail>
);
Default.storyName = "Default";

export const DetailWithFootnote: Story = () => (
  <Detail footnote="This is a footnote.">
    This is where the children will live.
  </Detail>
);
DetailWithFootnote.storyName = "Detail with footnote";

export const DetailWithIcon: Story = () => (
  <Detail icon="bin" footnote="This is a footnote.">
    This is where the children will live.
  </Detail>
);
DetailWithIcon.storyName = "Detail with icon";

export const DetailInsideCard: Story = () => (
  <Card width="300px">
    <Box pt="16px">
      <Detail>This example of Detail just has children.</Detail>
    </Box>
    <Divider type="horizontal" />
    <Box pt="8px">
      <Detail footnote="This is a footnote">
        This example of Detail has children and also a footnote.
      </Detail>
    </Box>
    <Divider type="horizontal" />
    <Box pb="16px">
      <Detail icon="settings" footnote="This is a footnote">
        Where as this example of Detail has a footnote and icon.
      </Detail>
    </Box>
  </Card>
);
DetailInsideCard.storyName = "Detail inside Card";

export const DetailInsideTile: Story = () => (
  <Tile width="60%">
    <TileContent pt="16px">
      <Detail>This example of Detail just has children.</Detail>
    </TileContent>
    <TileContent pt="8px">
      <Detail footnote="This is a footnote">
        This example of Detail has children and also a footnote.
      </Detail>
    </TileContent>
    <TileContent pb="16px">
      <Detail icon="settings" footnote="This is a footnote">
        Where as this example of Detail has a footnote and icon.
      </Detail>
    </TileContent>
  </Tile>
);
DetailInsideTile.storyName = "Detail inside Tile";
