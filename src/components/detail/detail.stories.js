import React from "react";
import { select, text } from "@storybook/addon-knobs";
import Detail from "./detail.component";
import { ICONS } from "../icon/icon-config";

export default {
  title: "Detail/Test",
  component: Detail,
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
  const icon = select("icon", [null, ...ICONS], null);
  const footnote = text("footnote", "This detail may require a footnote.");
  const children = text("children", "An example of a detail.");

  return (
    <Detail icon={icon} footnote={footnote}>
      {children}
    </Detail>
  );
};

Default.story = {
  name: "default",
};
