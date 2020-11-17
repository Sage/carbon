import React from "react";
import { storiesOf } from "@storybook/react";
import { text, select, boolean } from "@storybook/addon-knobs";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../.storybook/theme-selectors";
import OptionsHelper from "../../utils/helpers/options-helper";
import notes from "./documentation";
import Content from "./content.js";
import getDocGenInfo from "../../utils/helpers/docgen-info";

Content.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /content(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const children = text("children", "An example of some content.");
    const title = text("title", "Content Component");
    const knobAs = select(
      "as",
      OptionsHelper.themesBinary,
      Content.defaultProps.as
    );
    const inline = boolean("inline", Content.defaultProps.inline);
    const align = select(
      "align",
      OptionsHelper.alignFull,
      Content.defaultProps.align
    );
    const titleWidth = inline ? text("titleWidth", "") : undefined;
    const bodyFullWidth = boolean(
      "bodyFullWidth",
      Content.defaultProps.bodyFullWidth
    );

    return (
      <Content
        title={title}
        as={knobAs}
        inline={inline}
        align={align}
        titleWidth={titleWidth}
        bodyFullWidth={bodyFullWidth}
      >
        {children}
      </Content>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    chromatic: {
      disable: disableChromatic,
    },
    knobs: { escapeHTML: false },
  };

  return [name, component, metadata];
}

storiesOf("Content", module)
  .add(...makeStory("default", dlsThemeSelector))
  .add(...makeStory("classic", classicThemeSelector, true));
