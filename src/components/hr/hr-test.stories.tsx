import React from "react";
import Hr, { HrProps } from ".";

export default {
  title: "Hr/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = (props: HrProps) => {
  return <Hr {...props} />;
};

Default.storyName = "default";
