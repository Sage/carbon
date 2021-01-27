import React from "react";
import { select, text } from "@storybook/addon-knobs";
import OptionsHelper from "../../utils/helpers/options-helper";
import Detail from "./detail.component";

export default {
  title: "Detail/Test",
  component: Detail,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disabled: true,
    },
  },
};

export const Default = () => {
  const icon = select("icon", [null, ...OptionsHelper.icons], null);
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
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
