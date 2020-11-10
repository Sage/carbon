import React from "react";
import { select, text } from "@storybook/addon-knobs";
import OptionsHelper from "../../utils/helpers/options-helper";
import Detail from "./detail.js";

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

export const basic = () => {
  const icon = select("icon", [null, ...OptionsHelper.icons], null);
  const footnote = text("footnote", "This detail may require a footnote.");
  const children = text("children", "An example of a detail.");

  return (
    <Detail icon={icon} footnote={footnote}>
      {children}
    </Detail>
  );
};

basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
