import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../../.storybook/theme-selectors";
import notes from "./documentation";
import Fieldset from "./fieldset.component";
import Textbox from "../textbox";
import { Select, Option } from "../select";
import { Checkbox } from "../checkbox";

import getDocGenInfo from "../../../utils/helpers/docgen-info";

Fieldset.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /fieldset\.component(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const legend = text("legend", "");

    return (
      <Fieldset legend={legend}>
        <Textbox
          label="First Name"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
        <Textbox
          label="Last Name"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
        <Textbox
          label="Address"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
        <Checkbox
          label="Checkbox"
          labelAlign="right"
          labelWidth={30}
          labelSpacing={2}
          reverse
        />
        <Textbox label="City" labelInline labelAlign="right" labelWidth={30} />
        <Textbox
          label="Country"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
        <Textbox
          label="Telephone"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
      </Fieldset>
    );
  };

  const metadata = {
    themeSelector,
    chromatic: {
      disable: disableChromatic,
    },
  };

  return [name, component, metadata];
}

function makeValidationsStory(name) {
  const component = () => {
    return (
      <>
        {["error", "warning", "info"].map((type) =>
          ["Message", true].map((content) => (
            <Fieldset
              key={`${type}_${content}`}
              legend={`${type} validation as ${
                typeof content === "string" ? "string" : "boolean"
              }`}
            >
              <Textbox
                label="Address"
                labelInline
                labelAlign="right"
                {...{ [type]: content }}
              />
              <Textbox label="Town/City" labelInline labelAlign="right" />
              <Select
                label="Province"
                labelInline
                labelAlign="right"
                {...{ [type]: content }}
              >
                <Option key="ab" text="Alberta" value="ab" />
                <Option key="on" text="Ontario" value="on" />
                <Option key="qc" text="Quebec" value="qc" />
              </Select>
              <Textbox
                label="ZIP Code"
                labelInline
                labelAlign="right"
                styleOverride={{ input: { width: "120px", flex: "none" } }}
              />
            </Fieldset>
          ))
        )}
      </>
    );
  };

  const metadata = {
    themeSelector: dlsThemeSelector,
  };

  return [name, component, metadata];
}

storiesOf("Experimental/Fieldset", module)
  .addParameters({
    info: {
      propTables: [Fieldset],
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
  })
  .add(...makeStory("default", dlsThemeSelector))
  .add(...makeValidationsStory("validations"))
  .add(...makeStory("classic", classicThemeSelector, true));
