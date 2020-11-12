import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, number } from "@storybook/addon-knobs";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../.storybook/theme-selectors";
import Preview from "./preview.component";
import info from "./documentation";
import getDocGenInfo from "../../utils/helpers/docgen-info";

Preview.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /preview\.component(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const children = text("children", "Text rendered as children component.");
    const height = text("height");
    const lines = number("lines", Preview.defaultProps.lines);
    const loading = boolean("loading", true);
    const width = text("width");

    return (
      <Preview height={height} lines={lines} loading={loading} width={width}>
        {children}
      </Preview>
    );
  };

  const metadata = {
    themeSelector,
    info: { text: info, propTables: [Preview] },
    chromatic: {
      disable: disableChromatic,
    },
    knobs: { escapeHTML: false },
  };

  return [name, component, metadata];
}

storiesOf("Preview", module)
  .add(...makeStory("default", dlsThemeSelector))
  .add(...makeStory("classic", classicThemeSelector, true));
