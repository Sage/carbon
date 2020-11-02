import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { StateDecorator, Store, State } from "@sambego/storybook-state";
import { boolean, number } from "@storybook/addon-knobs";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../../.storybook/theme-selectors";
import Number from "./number.component";
import { OriginalTextbox } from "../textbox";
import { getCommonTextboxProps } from "../textbox/textbox.stories";
import notes from "./documentation/notes.md";
import info from "./documentation/info";

const store = new Store({
  value: "",
});

const setValue = (ev) => {
  action("onChange")(ev);
  store.set({ value: ev.target.value });
};

const RequiredComponent = () => {
  return (
    <Number
      label="Amount"
      value={store.get("value")}
      onChange={setValue}
      required
    />
  );
};

const defaultComponent = () => {
  const onChangeDeferredEnabled = boolean(
    'Enable "onChangeDeferred" Action',
    false
  );
  const onKeyDownEnabled = boolean('Enable "onKeyDown" Action', false);
  const deferTimeout = onChangeDeferredEnabled
    ? number("deferTimeout")
    : undefined;

  return (
    <Number
      {...getCommonTextboxProps()}
      value={store.get("value")}
      onChange={setValue}
      onKeyDown={onKeyDownEnabled ? action("onKeyDown") : undefined}
      onChangeDeferred={
        onChangeDeferredEnabled ? action("onChangeDeferred") : undefined
      }
      deferTimeout={deferTimeout}
    />
  );
};

const validationsComponent = () => {
  const validationTypes = ["error", "warning", "info"];
  return (
    <>
      <h4>Validation as string</h4>
      <h6>On component</h6>
      {validationTypes.map((validation) => (
        <Number
          {...getCommonTextboxProps()}
          key={`${validation}-string-component`}
          onChange={() => {}}
          {...{ [validation]: "Message" }}
        />
      ))}
      <h6>On label</h6>
      {validationTypes.map((validation) => (
        <Number
          {...getCommonTextboxProps()}
          key={`${validation}-string-label`}
          onChange={() => {}}
          validationOnLabel
          {...{ [validation]: "Message" }}
        />
      ))}

      <h4>Validation as boolean</h4>
      {validationTypes.map((validation) => (
        <Number
          {...getCommonTextboxProps()}
          key={`${validation}-boolean`}
          onChange={() => {}}
          {...{ [validation]: true }}
        />
      ))}
    </>
  );
};

const autoFocusComponent = () => {
  boolean("autoFocus", true);
  return defaultComponent();
};

function makeStory(name, themeSelector, component, disableChromatic = false) {
  const metadata = {
    themeSelector,
    info: {
      text: info,
      propTables: [OriginalTextbox],
      propTablesExclude: [Number, State],
      excludedPropTypes: ["children", "leftChildren", "inputIcon"],
    },
    chromatic: {
      disable: disableChromatic,
    },
    knobs: { escapeHTML: false },
    notes: { markdown: notes },
  };

  return [name, component, metadata];
}

storiesOf("Experimental/Number Input", module)
  .addDecorator(StateDecorator(store))
  .add(...makeStory("default", dlsThemeSelector, defaultComponent))
  .add(...makeStory("classic", classicThemeSelector, defaultComponent, true))
  .add(...makeStory("validations", dlsThemeSelector, validationsComponent))
  .add(...makeStory("autoFocus", dlsThemeSelector, autoFocusComponent))
  .add(...makeStory("required", dlsThemeSelector, RequiredComponent));
