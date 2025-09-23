import React from "react";
import Heading, { HeadingProps } from ".";

export default {
  title: "Deprecated/Heading/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = ({
  title,
  subheader,
  ...args
}: Partial<HeadingProps>) => {
  return <Heading title={title} subheader={subheader} {...args} />;
};

Default.storyName = "default";
Default.args = {
  title: "This is a heading",
  children: "This is content beneath a heading",
  subheader: "This is a subheading",
  help: "",
  helpLink: "",
  backLink: "",
  divider: true,
  separator: false,
  helpAriaLabel: "",
  pills: "",
  subtitleId: "",
  titleId: "",
};

export const HeadingComponent = (props: HeadingProps) => {
  return (
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      {...props}
    />
  );
};
