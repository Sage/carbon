import React from "react";
import { text, select } from "@storybook/addon-knobs";
import OptionsHelper from "../../utils/helpers/options-helper";
import Tile from ".";
import Content from "../content";

export default {
  title: "Design System/Tile/Test",
  component: Tile,
  decorators: [],
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => {
  const tileProps = {
    as: select("as", OptionsHelper.tileThemes, "tile", "Default"),
    orientation: select(
      "orientation",
      OptionsHelper.orientation,
      "horizontal",
      "Default"
    ),
    width: text("width", "", "Default"),
  };

  const contentOneProps = {
    key: "one",
    children: text("contentOneChildren", "Test Body One", "TileContent One"),
    title: text("contentOneTitle", "Test Title One", "TileContent One"),
    width: text("contentOneWidth", "", "TileContent One"),
  };

  const contentTwoProps = {
    key: "two",
    children: text("contentTwoChildren", "Test Body Two", "TileContent Two"),
    title: text("contentTwoTitle", "Test Title Two", "TileContent Two"),
    width: text("contentTwoWidth", "", "TileContent Two"),
  };

  const contentThreeProps = {
    key: "three",
    children: text(
      "contentThreeChildren",
      "Test Body Three",
      "TileContent Three"
    ),
    title: text("contentThreeTitle", "Test Title Three", "TileContent Three"),
    width: text("contentThreeWidth", "", "TileContent Three"),
  };

  const tileContent = [
    contentOneProps.children ? <Content {...contentOneProps} /> : undefined,
    contentTwoProps.children ? <Content {...contentTwoProps} /> : undefined,
    contentThreeProps.children ? <Content {...contentThreeProps} /> : undefined,
  ];

  return <Tile {...tileProps}>{tileContent}</Tile>;
};

Default.story = {
  name: "default",
};
