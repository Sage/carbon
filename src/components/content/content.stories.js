import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import Content from "./content.component.js";

export default {
  title: "Design System/Content/Test",
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

export const Default = () => {
  const children = text("children", "An example of some content.");
  const title = text("title", "Content Component");
  const variant = select("variant", ["primary", "secondary"]);
  const inline = boolean("inline", false);
  const align = select("align", ["left", "center", "right"]);
  const titleWidth = inline ? text("titleWidth", "") : undefined;
  const bodyFullWidth = boolean("bodyFullWidth", false);

  return (
    <Content
      title={title}
      variant={variant}
      inline={inline}
      align={align}
      titleWidth={titleWidth}
      bodyFullWidth={bodyFullWidth}
    >
      {children}
    </Content>
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
