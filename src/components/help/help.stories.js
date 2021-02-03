import React from "react";
import { text, select } from "@storybook/addon-knobs";
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

  return (
    <div style={{ marginLeft: "125px" }}>
      <Help tooltipPosition={tooltipPosition} href={href} type={type}>
        {children}
      </Help>
    </div>
  );
};

Default.story = {
  name: "default",
};
