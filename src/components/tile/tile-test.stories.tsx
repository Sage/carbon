import React from "react";
import { Tile, TileContent, TileProps } from ".";
import { TILE_ORIENTATIONS, TILE_THEMES } from "./tile.config";

export default {
  title: "Tile/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    variant: {
      options: TILE_THEMES,
      control: {
        type: "select",
      },
    },
    orientation: {
      options: TILE_ORIENTATIONS,
      control: {
        type: "select",
      },
    },
  },
};

interface TileStoryProps {
  contentOneChildren?: string;
  contentOneWidth?: string;
  contentTwoChildren?: string;
  contentTwoWidth?: string;
  contentThreeChildren?: string;
  contentThreeWidth?: string;
}

export const DefaultStory = ({
  contentOneChildren,
  contentOneWidth,
  contentTwoChildren,
  contentTwoWidth,
  contentThreeChildren,
  contentThreeWidth,
  ...args
}: TileProps & TileStoryProps) => {
  const contentOneProps = {
    key: "one",
    children: contentOneChildren,
    width: contentOneWidth,
  };
  const contentTwoProps = {
    key: "two",
    children: contentTwoChildren,
    width: contentTwoWidth,
  };
  const contentThreeProps = {
    key: "three",
    children: contentThreeChildren,
    width: contentThreeWidth,
  };
  const tileContent = [
    contentOneProps.children ? <TileContent {...contentOneProps} /> : undefined,
    contentTwoProps.children ? <TileContent {...contentTwoProps} /> : undefined,
    contentThreeProps.children ? (
      <TileContent {...contentThreeProps} />
    ) : undefined,
  ];
  return (
    <Tile p={8} {...args}>
      {tileContent}
    </Tile>
  );
};

DefaultStory.storyName = "default";
DefaultStory.args = {
  variant: "tile",
  orientation: "horizontal",
  width: "",
  contentOneChildren: "Test Body One",
  contentOneWidth: "",
  contentTwoChildren: "Test Body Two",
  contentTwoWidth: "",
  contentThreeChildren: "Test Body Three",
  contentThreeWidth: "",
};
