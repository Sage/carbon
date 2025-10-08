import React from "react";
import { ICONS } from "../icon/icon-config";
import Detail, { DetailProps } from ".";

export default {
  component: Detail,
  title: "Deprecated/Detail/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    icon: {
      options: ICONS,
      control: {
        type: "select",
      },
    },
    children: {
      control: { type: "text" },
    },
  },
};

export const Default = ({
  className,
  icon,
  footnote,
  children,
}: DetailProps) => {
  return (
    <Detail className={className} icon={icon} footnote={footnote}>
      {children}
    </Detail>
  );
};

Default.storyName = "default";
Default.args = {
  className: "test",
  icon: null,
  footnote: "This detail may require a footnote.",
  children: "An example of a detail.",
};
