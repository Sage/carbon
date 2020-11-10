import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import i18n from "i18n-js";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../.storybook/theme-selectors";
import { notes, Info } from "./documentation";
import I18nComponent from "./i18n";
import getDocGenInfo from "../../utils/helpers/docgen-info";

I18nComponent.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /i18n\.js(?!spec)/
);

// eslint-disable-next-line dot-notation
i18n.translations.en["my"] = {
  example: "# My __example__ translation.",
};

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const markdown = boolean("markdown", true);
    const inline = markdown
      ? boolean("inline", I18nComponent.defaultProps.inline)
      : undefined;
    const scope = text("scope", "my.example");
    return <I18nComponent markdown={markdown} inline={inline} scope={scope} />;
  };

  const metadata = {
    themeSelector,
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: disableChromatic,
    },
  };

  return [name, component, metadata];
}

storiesOf("I18nComponent", module)
  .add(...makeStory("default", dlsThemeSelector))
  .add(...makeStory("classic", classicThemeSelector, true));
