import React from "react";
import { text, boolean } from "@storybook/addon-knobs";

import SettingsRow from ".";

export default {
  title: "SettingsRow/Test",
  component: SettingsRow,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  const children = text("children", "Content for settings");
  const description = text(
    "description",
    "This provides more information about what this group of settings are for."
  );
  const divider = boolean("divider", true);
  const title = text("title", "A GROUP OF SETTINGS");

  return (
    <SettingsRow description={description} divider={divider} title={title}>
      {children}
    </SettingsRow>
  );
};
