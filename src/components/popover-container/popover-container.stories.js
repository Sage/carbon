import React from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import PopoverContainer from "./popover-container.component";

export default {
  title: "Design System/Popover Container/Test",
  component: PopoverContainer,
  decorators: [withKnobs],
  parameters: {
    info: { disable: true },
    docs: {
      page: null,
    },
    chromatic: {
      disable: true,
    },
  },
};

export const Basic = () => {
  const title = text("title", "Title");
  const open = boolean("open", true);

  return <PopoverContainer title={title} open={open} />;
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};
