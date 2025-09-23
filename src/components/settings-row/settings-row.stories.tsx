import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import SettingsRow from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof SettingsRow> = {
  title: "Deprecated/Settings Row",
  component: SettingsRow,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof SettingsRow>;

export const Default: Story = () => {
  return (
    <SettingsRow description="Description" title="Title">
      Content for settings
    </SettingsRow>
  );
};
Default.storyName = "Default";

export const HeadingType: Story = () => {
  return (
    <>
      <SettingsRow
        headingType="h1"
        description="Description"
        title="This is a h1 Title"
      >
        Content for settings
      </SettingsRow>
      <SettingsRow
        headingType="h2"
        description="Description"
        title="This is a h2 Title"
      >
        Content for settings
      </SettingsRow>
      <SettingsRow
        headingType="h3"
        description="Description"
        title="This is a h3 Title"
      >
        Content for settings
      </SettingsRow>
      <SettingsRow
        headingType="h4"
        description="Description"
        title="This is a h4 Title"
      >
        Content for settings
      </SettingsRow>
      <SettingsRow
        headingType="h5"
        description="Description"
        title="This is a h5 Title"
      >
        Content for settings
      </SettingsRow>
    </>
  );
};
HeadingType.storyName = "Heading Type";
