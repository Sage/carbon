import React, { useState } from "react";
import { boolean, text, select } from "@storybook/addon-knobs";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";
import Tooltip from ".";

export default {
  title: "Design System/Tooltip/Test",
  component: Tooltip,
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

const props = () => {
  const position = select("position", OptionsHelper.positions, "top");
  const isVertical = ["top", "bottom"].includes(position);
  const enableFlipOverrides = boolean("enable flip overrides", false);

  return {
    isVisible: boolean("isVisible", true),
    message: text(
      "message",
      "I'm a helpful tooltip that can display additional information to a user."
    ),
    position,
    type: select("type", ["error", "default"], "default"),
    size: select("size", ["medium", "large"], "medium"),
    bgColor: text("bgColor", undefined),
    fontColor: text("fontColor", undefined),
    flipOverrides: enableFlipOverrides
      ? select(
          "flipOverrides",
          isVertical ? ["left", "right"] : ["top", "bottom"]
        )
      : undefined,
  };
};

export const Default = () => {
  const { isVisible } = props();
  const [stateVisible, setStateVisible] = useState(undefined);

  const { flipOverrides } = props();

  return (
    <div
      style={{
        margin: "200px 400px",
        width: 350,
        height: 250,
        overflow: "auto",
      }}
    >
      <Tooltip
        {...props()}
        flipOverrides={flipOverrides ? [flipOverrides] : undefined}
        isVisible={stateVisible || isVisible}
      >
        <div
          // eslint-disable-next-line
          tabIndex="0"
          style={{
            backgroundColor: "#00815D",
            color: "white",
            width: "42px",
            height: "26px",
            position: "relative",
            outline: "none",
            cursor: "pointer",
          }}
          {...(isVisible === false && {
            onMouseOver: () => setStateVisible(true),
            onMouseLeave: () => setStateVisible(false),
            onFocus: () => setStateVisible(true),
            onBlur: () => setStateVisible(false),
          })}
        >
          <span style={{ position: "absolute", top: "4px", left: "2px" }}>
            target
          </span>
        </div>
      </Tooltip>
    </div>
  );
};

Default.story = {
  name: "default",
};
