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

export const Default = () => {
  const title = text("title", "Title");
  const open = boolean("open", true);

  return <PopoverContainer title={title} open={open} />;
};

Default.story = {
  name: "default",
  parameters: {
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};
