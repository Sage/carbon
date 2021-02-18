import React from "react";
import { text, boolean } from "@storybook/addon-knobs";
import Heading from "./heading.component";
import Pill from "../pill";

export default {
  title: "Heading/Test",
  component: Heading,
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
  const title = text("title", "This is a heading");
  const children = text("children", "This is content beneath a heading");
  const subheader = text("subheader", "This is a subheading");
  const help = text("help", "");
  const helpLink = text("helpLink", "");
  const backLink = text("backLink", "");
  const divider = boolean("divider", Heading.defaultProps.divider);
  const separator = boolean("separator", Heading.defaultProps.separator);

  return (
    <Heading
      title={title}
      subheader={subheader}
      help={help}
      helpLink={helpLink}
      backLink={backLink}
      divider={divider}
      separator={separator}
      pills={[
        <Pill mr={2} key="1">
          test pill 1
        </Pill>,
        <Pill mr={2} key="2" size="L">
          test pill 2
        </Pill>,
        <Pill mr={2} key="3" size="XL">
          test pill 3
        </Pill>,
      ]}
    >
      {children}
    </Heading>
  );
};

Default.story = {
  name: "default",
};
