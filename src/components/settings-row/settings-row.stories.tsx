import React from "react";
import { ComponentStory } from "@storybook/react";
import SettingsRow from ".";

export const Default: ComponentStory<typeof SettingsRow> = () => (
  <SettingsRow description="Description" title="Title">
    Content for settings
  </SettingsRow>
);

export const HeadingType: ComponentStory<typeof SettingsRow> = () => (
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
