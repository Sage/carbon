import React from "react";
import Preview, { PreviewProps } from "./preview.component";

export default {
  title: "Preview/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = ({ children, ...args }: { children?: string }) => (
  <Preview {...args}>{children}</Preview>
);

Default.story = {
  name: "default",
  args: {
    children: "Text rendered as children component.",
    height: "",
    lines: 1,
    loading: true,
    width: "",
  },
};

export const PreviewComponent = (props: PreviewProps) => {
  return <Preview loading {...props} />;
};
