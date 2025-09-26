import React from "react";
import SettingsRow, { SettingsRowProps } from ".";

export default {
  component: SettingsRow,
  title: "Deprecated/Settings Row/Test",
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
  headingType,
  children,
  description,
  divider,
  className,
}: SettingsRowProps) => {
  return (
    <SettingsRow
      title={title}
      headingType={headingType}
      description={description}
      divider={divider}
      className={className}
    >
      {children}
    </SettingsRow>
  );
};

Default.storyName = "default";
Default.args = {
  title: "A group of settings",
  headingType: "h4",
  children: "Content for settings",
  description:
    "This provides more information about what this group of settings are for.",
  divider: true,
};

export const SettingsRowComponent = (props: SettingsRowProps) => {
  return <SettingsRow title="title" description="description" {...props} />;
};
