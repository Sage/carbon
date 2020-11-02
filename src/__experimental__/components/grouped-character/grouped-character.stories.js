import React from "react";
import { storiesOf } from "@storybook/react";
import { Store, State } from "@sambego/storybook-state";
import { text, object, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../../.storybook/theme-selectors";
import GroupedCharacter from "./grouped-character.component";
import { getCommonTextboxProps } from "../textbox/textbox.stories";
import { OriginalTextbox } from "../textbox";
import { info } from "./documentation";
import getDocGenInfo from "../../../utils/helpers/docgen-info";

GroupedCharacter.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /grouped-character\.component(?!spec)/
);

const groupedCharacterStore = new Store({
  value: "",
});

const onChange = (ev) => {
  groupedCharacterStore.set({ value: ev.target.value.rawValue });
  action("change")(ev);
};

const requiredComponent = () => {
  const groups = object("groups", [2, 2, 4]);
  const separator = text("separator", "-");

  return (
    <State store={groupedCharacterStore}>
      <GroupedCharacter
        {...getCommonTextboxProps({ requiredKnob: false })}
        groups={groups}
        separator={separator}
        value={groupedCharacterStore.get("value")}
        onChange={onChange}
        required
      />
    </State>
  );
};

const defaultComponent = () => {
  const groups = object("groups", [2, 2, 4]);
  const separator = text("separator", "-");

  return (
    <State store={groupedCharacterStore}>
      <GroupedCharacter
        {...getCommonTextboxProps()}
        groups={groups}
        separator={separator}
        value={groupedCharacterStore.get("value")}
        onChange={onChange}
      />
    </State>
  );
};

const autoFocusComponent = () => {
  boolean("autoFocus", true);
  return defaultComponent();
};

const validationsComponent = () => {
  const validationTypes = ["error", "warning", "info"];
  const groups = object("groups", [2, 2, 4]);
  const separator = text("separator", "-");

  return (
    <>
      <h4>Validation as string</h4>
      <h6>On component</h6>
      {validationTypes.map((validation) => (
        <GroupedCharacter
          {...getCommonTextboxProps()}
          key={`${validation}-string-component`}
          groups={groups}
          separator={separator}
          onChange={() => {}}
          {...{ [validation]: "Message" }}
        />
      ))}
      <h6>On label</h6>
      {validationTypes.map((validation) => (
        <GroupedCharacter
          {...getCommonTextboxProps()}
          key={`${validation}-string-label`}
          groups={groups}
          separator={separator}
          onChange={() => {}}
          validationOnLabel
          {...{ [validation]: "Message" }}
        />
      ))}

      <h4>Validation as boolean</h4>
      {validationTypes.map((validation) => (
        <GroupedCharacter
          {...getCommonTextboxProps()}
          key={`${validation}-boolean`}
          groups={groups}
          separator={separator}
          onChange={() => {}}
          {...{ [validation]: true }}
        />
      ))}
    </>
  );
};

function makeStory(name, themeSelector, component, disableChromatic = false) {
  const metadata = {
    themeSelector,
    info: {
      text: info,
      propTables: [GroupedCharacter, OriginalTextbox],
    },
    chromatic: {
      disable: disableChromatic,
    },
    knobs: { escapeHTML: false },
  };

  return [name, component, metadata];
}

storiesOf("Experimental/GroupedCharacter", module)
  .addParameters({
    info: { text: info, propTables: [GroupedCharacter, OriginalTextbox] },
    knobs: { escapeHTML: false },
  })
  .add(...makeStory("default", dlsThemeSelector, defaultComponent))
  .add(...makeStory("classic", classicThemeSelector, defaultComponent, true))
  .add(...makeStory("validations", dlsThemeSelector, validationsComponent))
  .add(...makeStory("autoFocus", dlsThemeSelector, autoFocusComponent))
  .add(...makeStory("required", dlsThemeSelector, requiredComponent));
