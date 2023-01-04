import React from "react";
import Tile, { TileProps } from ".";
import Content from "../content";
import { TILE_ORIENTATIONS, TILE_THEMES } from "./tile.config";

export default {
  title: "Tile/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
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
  contentOneTitle?: string;
  contentOneWidth?: string;
  contentTwoChildren?: string;
  contentTwoTitle?: string;
  contentTwoWidth?: string;
  contentThreeChildren?: string;
  contentThreeTitle?: string;
  contentThreeWidth?: string;
}

export const DefaultStory = ({
  contentOneChildren,
  contentOneTitle,
  contentOneWidth,
  contentTwoChildren,
  contentTwoTitle,
  contentTwoWidth,
  contentThreeChildren,
  contentThreeTitle,
  contentThreeWidth,
  ...args
}: TileProps & TileStoryProps) => {
  const contentOneProps = {
    key: "one",
    children: contentOneChildren,
    title: contentOneTitle,
    width: contentOneWidth,
  };
  const contentTwoProps = {
    key: "two",
    children: contentTwoChildren,
    title: contentTwoTitle,
    width: contentTwoWidth,
  };
  const contentThreeProps = {
    key: "three",
    children: contentThreeChildren,
    title: contentThreeTitle,
    width: contentThreeWidth,
  };
  const tileContent = [
    contentOneProps.children ? <Content {...contentOneProps} /> : undefined,
    contentTwoProps.children ? <Content {...contentTwoProps} /> : undefined,
    contentThreeProps.children ? <Content {...contentThreeProps} /> : undefined,
  ];
  return <Tile {...args}>{tileContent}</Tile>;
};

DefaultStory.storyName = "default";
DefaultStory.args = {
  variant: "tile",
  orientation: "horizontal",
  width: "",
  contentOneChildren: "Test Body One",
  contentOneTitle: "Test Title One",
  contentOneWidth: "",
  contentTwoChildren: "Test Body Two",
  contentTwoTitle: "Test Title Two",
  contentTwoWidth: "",
  contentThreeChildren: "Test Body Three",
  contentThreeTitle: "Test Title Three",
  contentThreeWidth: "",
};
