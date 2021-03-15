import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import OptionsHelper from "../../utils/helpers/options-helper";
import Help from "./help.component";

export default {
  title: "Help/Test",
  component: Help,
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
  const children = text("children", "This is help text");
  const tooltipPosition = children
    ? select(
        "tooltipPosition",
        OptionsHelper.positions,
        Help.defaultProps.tooltipPosition
      )
    : undefined;
  const href = text("href", "http://www.sage.com");
  const type = select("type", OptionsHelper.icons, "help");
  const tooltipBgColor = children
    ? text("tooltipBgColor", undefined)
    : undefined;
  const tooltipFontColor = children
    ? text("tooltipFontColor", undefined)
    : undefined;

  const isVertical = ["top", "bottom"].includes(tooltipPosition);
  const enableFlipOverrides = children
    ? boolean("enable flip overrides", false)
    : undefined;

  const tooltipFlipOverrides =
    children && enableFlipOverrides
      ? select(
          "tooltipFlipOverrides",
          isVertical ? ["left", "right"] : ["top", "bottom"],
          isVertical ? "right" : "bottom"
        )
      : undefined;

  const flipOverrides = tooltipFlipOverrides
    ? [tooltipFlipOverrides]
    : undefined;

  return (
    <div style={{ margin: "200px" }}>
      <Help
        tooltipPosition={tooltipPosition}
        href={href}
        type={type}
        tooltipBgColor={tooltipBgColor}
        tooltipFontColor={tooltipFontColor}
        tooltipFlipOverrides={flipOverrides}
      >
        {children}
      </Help>
    </div>
  );
};

Default.story = {
  name: "default",
};
