import React from "react";
import { ComponentStory } from "@storybook/react";
import Detail from ".";
import Card from "../card";
import { Tile, TileContent } from "../tile";
import Hr from "../hr";
import Box from "../box";

export const Default: ComponentStory<typeof Detail> = () => (
  <Detail>This is where the children will live.</Detail>
);

export const DetailWithFootnote: ComponentStory<typeof Detail> = () => (
  <Detail footnote="This is a footnote.">
    This is where the children will live.
  </Detail>
);

export const DetailWithIcon: ComponentStory<typeof Detail> = () => (
  <Detail icon="bin" footnote="This is a footnote.">
    This is where the children will live.
  </Detail>
);

export const DetailInsideCard: ComponentStory<typeof Detail> = () => (
  <Card cardWidth="300px">
    <Box pt="16px">
      <Detail>This example of Detail just has children.</Detail>
    </Box>
    <Hr />
    <Box pt="8px">
      <Detail footnote="This is a footnote">
        This example of Detail has children and also a footnote.
      </Detail>
    </Box>
    <Hr />
    <Box pb="16px">
      <Detail icon="settings" footnote="This is a footnote">
        Where as this example of Detail has a footnote and icon.
      </Detail>
    </Box>
  </Card>
);

export const DetailInsideTile: ComponentStory<typeof Detail> = () => (
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
