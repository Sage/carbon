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
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

const props = () => {
  return {
    isVisible: boolean("isVisible", true),
    message: text(
      "message",
      "I'm a helpful tooltip that can display additional information to a user."
    ),
    position: select("position", OptionsHelper.positions, "top"),
    type: select("type", ["error", "default"], "default"),
    size: select("size", ["medium", "large"], "medium"),
  };
};

export const Default = () => {
  const { isVisible } = props();
  const [stateVisible, setStateVisible] = useState(undefined);

  return (
    <div
      style={{
        margin: "200px 400px",
        width: 350,
        height: 250,
        overflow: "auto",
      }}
    >
      <Tooltip {...props()} isVisible={stateVisible || isVisible}>
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
