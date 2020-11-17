import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import Content from "./content.js";

export default {
  title: "Content/Test",
  component: Content,
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
  const children = text("children", "An example of some content.");
  const title = text("title", "Content Component");
  const knobAs = select("as", ["primary", "secondary"]);
  const inline = boolean("inline", false);
  const align = select("align", ["left", "center", "right"]);
  const titleWidth = inline ? text("titleWidth", "") : undefined;
  const bodyFullWidth = boolean("bodyFullWidth", false);

  return (
    <Content
      title={title}
      as={knobAs}
      inline={inline}
      align={align}
      titleWidth={titleWidth}
      bodyFullWidth={bodyFullWidth}
    >
      {children}
    </Content>
  );
};

basic.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
