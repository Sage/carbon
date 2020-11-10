import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, number, text, select } from "@storybook/addon-knobs";
import { State, Store } from "@sambego/storybook-state";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../../.storybook/theme-selectors";
import OptionsHelper from "../../../utils/helpers/options-helper";
import Textarea from ".";
import { notes, info } from "./documentation";
import { OriginalTextarea } from "./textarea.component";
import getDocGenInfo from "../../../utils/helpers/docgen-info";
import AutoFocus from "../../../utils/helpers/auto-focus";

OriginalTextarea.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /textarea\.component(?!spec)/
);

const store = new Store({
  value: "",
});

const handleChange = ({ target: { value } }) => {
  store.set({ value });
};

const rangeOptions = {
  range: true,
  min: 0,
  max: 300,
  step: 1,
};
const percentageRange = {
  range: true,
  min: 0,
  max: 100,
  step: 1,
};

const defaultComponent = (autoFocusDefault = false) => () => {
  const previous = {
    key: "textarea",
    autoFocus: autoFocusDefault,
  };
  const expandable = boolean("expandable", Textarea.defaultProps.expandable);
  const cols = number("cols", 0, rangeOptions);
  const rows = number("rows", 0, rangeOptions);
  const disabled = boolean("disabled", false);
  const autoFocus = boolean("autoFocus", autoFocusDefault);
  const readOnly = boolean("readOnly", false);
  const placeholder = text("placeholder", "");
  const fieldHelp = text("fieldHelp", "");
  const characterLimit = text("characterLimit", "");
  const inputWidth = number("inputWidth", 100, percentageRange);
  const warnOverLimit = characterLimit
    ? boolean("warnOverLimit", Textarea.defaultProps.warnOverLimit)
    : undefined;
  const enforceCharacterLimit = characterLimit
    ? boolean(
        "enforceCharacterLimit",
        Textarea.defaultProps.enforceCharacterLimit
      )
    : undefined;
  const label = text("label", "");
  const labelHelp = label ? text("labelHelp", "") : undefined;
  const labelInline = label ? boolean("labelInline", false) : undefined;
  const labelWidth = labelInline
    ? number("labelWidth", 30, percentageRange)
    : undefined;
  const labelAlign = labelInline
    ? select("labelAlign", OptionsHelper.alignBinary)
    : undefined;
  const adaptiveLabelBreakpoint = labelInline
    ? number("adaptiveLabelBreakpoint")
    : undefined;
  const key = AutoFocus.getKey(autoFocus, previous);
  const required = boolean("required", false);

  return (
    <State store={store}>
      <Textarea
        key={key}
        name="textarea"
        onChange={handleChange}
        warnOverLimit={warnOverLimit}
        expandable={expandable}
        characterLimit={characterLimit}
        enforceCharacterLimit={enforceCharacterLimit}
        cols={cols}
        rows={rows}
        disabled={disabled}
        autoFocus={autoFocus}
        readOnly={readOnly}
        placeholder={placeholder}
        fieldHelp={fieldHelp}
        label={label}
        labelHelp={labelHelp}
        labelInline={labelInline}
        labelWidth={labelWidth}
        inputWidth={inputWidth}
        labelAlign={labelAlign}
        adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
        required={required}
      />
    </State>
  );
};

function makeStory(name, themeSelector, component, disableChromatic = false) {
  const metadata = {
    themeSelector,
    info: {
      text: info,
      propTables: [OriginalTextarea],
      propTablesExclude: [Textarea],
    },
    notes: { markdown: notes },
    chromatic: {
      disable: disableChromatic,
    },
    knobs: { escapeHTML: false },
  };

  return [name, component, metadata];
}

function makeValidationsStory(name, themeSelector, disableChromatic = false) {
  const validationTypes = ["error", "warning", "info"];
  const component = () => {
    return (
      <>
        <h4>Validation as string</h4>
        <h6>On component</h6>
        {validationTypes.map((validation) => (
          <Textarea
            name={`${validation}-textarea`}
            label="Textarea Validation"
            labelHelp={`${validation} prop is passed as string`}
            key={`${validation}-string-component`}
            {...{ [validation]: "Message" }}
          />
        ))}

        <h6>Read Only</h6>

        <Textarea
          name="textarea-readonly"
          label="Textarea Validation"
          labelHelp="error prop is passed as string"
          error="Message"
          readOnly
        />

        <h6>On label</h6>
        {validationTypes.map((validation) => (
          <Textarea
            name={`${validation}-textarea-label`}
            label="Textarea Validation"
            labelHelp={`${validation} prop is passed as string`}
            validationOnLabel
            key={`${validation}-string-label`}
            {...{ [validation]: "Message" }}
          />
        ))}

        <h6>Read Only</h6>

        <Textarea
          name="textarea-readonly-label"
          label="Textarea Validation"
          labelHelp="error prop is passed as string"
          error="Message"
          readOnly
          validationOnLabel
        />

        <h4>Validation as boolean</h4>
        {validationTypes.map((validation) => (
          <Textarea
            name="textarea"
            label="Textarea Validation"
            labelHelp={`${validation} prop is passed as true boolean`}
            key={`${validation}-boolean`}
            {...{ [validation]: true }}
          />
        ))}
      </>
    );
  };

  const metadata = {
    themeSelector,
    info: {
      source: false,
      propTables: [OriginalTextarea],
      propTablesExclude: [Textarea],
    },
    chromatic: {
      disable: disableChromatic,
    },
  };

  return [name, component, metadata];
}

const Required = () => {
  return <Textarea label="Comment" required />;
};

storiesOf("Experimental/Textarea", module)
  .addParameters({
    info: {
      propTablesExclude: [State],
    },
  })
  .add(...makeStory("default", dlsThemeSelector, defaultComponent()))
  .add(...makeStory("required", dlsThemeSelector, Required))
  .add(...makeStory("classic", classicThemeSelector, defaultComponent(), true))
  .add(...makeValidationsStory("validations", dlsThemeSelector))
  .add(
    ...makeValidationsStory("validations classic", classicThemeSelector, true)
  )
  .add(
    ...makeStory("autoFocus", dlsThemeSelector, defaultComponent(true), true)
  );
