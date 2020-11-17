import React from "react";
import { boolean, text, select } from "@storybook/addon-knobs";
import OptionsHelper from "../../utils/helpers/options-helper";
import Tooltip from ".";

export default {
  title: "Tooltip/Test",
  component: Tooltip,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

const props = () => {
  return {
    isVisible: boolean("isVisible", true),
    children: text(
      "children",
      "I'm a helpful tooltip that can display more information to a user."
    ),
    align: select(
      "align",
      OptionsHelper.alignAroundEdges,
      Tooltip.defaultProps.align
    ),
    position: select(
      "position",
      OptionsHelper.positions,
      Tooltip.defaultProps.position
    ),
    type: select("type", ["error", "warning", "info"], "info"),
  };
};

export const Default = () => {
  return (
    <div style={{ position: "absolute" }}>
      <Tooltip {...props()} />
    </div>
  );
};
