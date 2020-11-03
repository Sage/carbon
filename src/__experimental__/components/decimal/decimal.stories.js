import React from "react";
import { storiesOf } from "@storybook/react";
import { number, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { State, Store } from "@sambego/storybook-state";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../../.storybook/theme-selectors";
import Decimal from "./decimal.component";
import { OriginalTextbox } from "../textbox";
import { getCommonTextboxProps } from "../textbox/textbox.stories";
import OptionsHelper from "../../../utils/helpers/options-helper";
import { info, notes } from "./documentation";
import getDocGenInfo from "../../../utils/helpers/docgen-info";
import guid from "../../../utils/helpers/guid";

OriginalTextbox.__docgenInfo = getDocGenInfo(
  require("../textbox/docgenInfo.json"),
  /textbox\.component(?!spec)/
);

Decimal.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /decimal\.component(?!spec)/
);

const store = new Store({
  value: "0.00",
});

const setValue = (ev) => {
  action("onChange")(ev);
  store.set({ value: ev.target.value.rawValue });
};

const previous = {
  key: guid(),
  allowEmptyValue: false,
};

const commonProps = () => {
  const precisionRange = {
    range: true,
    min: 0,
    max: 15,
    step: 1,
  };
  const align = select(
    "align",
    OptionsHelper.alignBinary,
    Decimal.defaultProps.align
  );
  const precision = number(
    "precision",
    Decimal.defaultProps.precision,
    precisionRange
  );
  const autoFocus = boolean("autoFocus", false);
  const allowEmptyValue = boolean("allowEmptyValue", false);

  // When the allowEmptyValue knob changes we want to force the component to re-create
  // allowEmptyValue is only used in the constructor and it is not currently supported to change during the lifetime
  // of the component
  if (previous.allowEmptyValue !== allowEmptyValue) {
    previous.key = guid();
  }
  previous.allowEmptyValue = allowEmptyValue;
  const { key } = previous;

  return {
    key,
    align,
    precision,
    autoFocus,
    allowEmptyValue,
  };
};

const requiredComponent = () => {
  return (
    <State store={store}>
      <Decimal
        {...commonProps()}
        {...getCommonTextboxProps({ requiredKnob: false })}
        value={store.get("value")}
        onChange={setValue}
        onBlur={action("onBlur")}
        required
      />
    </State>
  );
};
const defaultComponent = () => {
  return (
    <State store={store}>
      <Decimal
        {...commonProps()}
        {...getCommonTextboxProps()}
        value={store.get("value")}
        onChange={setValue}
        onBlur={action("onBlur")}
      />
    </State>
  );
};

const componentWithValidations = () => {
  const validationTypes = ["error", "warning", "info"];
  return (
    <>
      <h4>Validation as string</h4>
      <h6>On component</h6>
      {validationTypes.map((validation) => (
        <State store={store} key={`${validation}-string-component`}>
          <Decimal
            {...commonProps()}
            {...getCommonTextboxProps()}
            {...{ [validation]: "Message" }}
            value={store.get("value")}
            onChange={setValue}
            onBlur={action("onBlur")}
          />
        </State>
      ))}
      <h6>On label</h6>
      {validationTypes.map((validation) => (
        <State store={store} key={`${validation}-string-label`}>
          <Decimal
            {...commonProps()}
            {...getCommonTextboxProps()}
            {...{ [validation]: "Message" }}
            validationOnLabel
            value={store.get("value")}
            onChange={setValue}
            onBlur={action("onBlur")}
          />
        </State>
      ))}

      <h4>Validation as boolean</h4>
      {validationTypes.map((validation) => (
        <State store={store} key={`${validation}-boolean`}>
          <Decimal
            {...commonProps()}
            {...getCommonTextboxProps()}
            {...{ [validation]: true }}
            value={store.get("value")}
            onChange={setValue}
            onBlur={action("onBlur")}
          />
        </State>
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
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: disableChromatic,
    },
  };

  return [name, component, metadata];
}

storiesOf("Experimental/Decimal Input", module)
  .addParameters({
    info: {
      text: info,
      propTables: [Decimal, OriginalTextbox],
    },
  })
  .add(...makeStory("default", dlsThemeSelector, defaultComponent))
  .add(...makeStory("classic", classicThemeSelector, defaultComponent, true))
  .add(...makeStory("autoFocus", dlsThemeSelector, autoFocusComponent))
  .add(...makeStory("validations", dlsThemeSelector, componentWithValidations))
  .add(...makeStory("required", dlsThemeSelector, requiredComponent));
