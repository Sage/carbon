import React from "react";
import { text, boolean } from "@storybook/addon-knobs";
import i18n from "i18n-js";
import I18nComponent from "./i18n.js";

export default {
  title: "i18nComponent/Test",
  component: I18nComponent,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disabled: true,
    },
  },
};

export const Basic = () => {
  // eslint-disable-next-line dot-notation
  i18n.translations.en["my"] = {
    example: "# My __example__ translation.",
  };
  const markdown = boolean("markdown", true);
  const inline = markdown
    ? boolean("inline", I18nComponent.defaultProps.inline)
    : undefined;
  const scope = text("scope", "my.example");
  return <I18nComponent markdown={markdown} inline={inline} scope={scope} />;
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
