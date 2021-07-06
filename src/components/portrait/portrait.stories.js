import React from "react";
import { select, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Portrait from "./portrait.component";
import { ICONS } from "../icon/icon-config";
import { PORTRAIT_SHAPES, PORTRAIT_SIZES } from "./portrait.config";

export default {
  title: "Portrait/Test",
  component: Portrait,
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

export const Default = () => {
  return <Portrait {...commonKnobs()} {...dlsKnobs()} />;
};

Default.story = {
  name: "default",
};

function commonKnobs() {
  const source = select("source", ["src", "gravatar"], "src");

  return {
    alt: text("alt", Portrait.defaultProps.alt),
    darkBackground: boolean(
      "darkBackground",
      Portrait.defaultProps.darkBackground
    ),
    gravatar: source === "gravatar" ? text("gravatar") : undefined,
    src: source === "src" ? text("src") : undefined,
    initials: text("initials", ""),
    iconType: select("iconType", ICONS),
    onClick: (ev) => action("click")(ev),
  };
}

function dlsKnobs() {
  return {
    size: select("size", PORTRAIT_SIZES, "M"),
    shape: select("shape", PORTRAIT_SHAPES, "square"),
  };
}
