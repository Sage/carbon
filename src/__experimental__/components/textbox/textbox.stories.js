import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, select, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../../.storybook/theme-selectors";
import { notes, info } from "./documentation";
import Textbox, { OriginalTextbox } from ".";
import OptionsHelper from "../../../utils/helpers/options-helper";
import getDocGenInfo from "../../../utils/helpers/docgen-info";
import AutoFocus from "../../../utils/helpers/auto-focus";

OriginalTextbox.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /textbox\.component(?!spec)/
);

// set the display name so the story source makes sense
Textbox.displayName = "Textbox";

const defaultStoryPropsConfig = {
  inputWidthEnabled: true,
  requiredKnob: true,
};

function makeStory(name, themeSelector, component, disableChromatic = false) {
  const metadata = {
    themeSelector,
    info: {
      text: info,
      propTables: [OriginalTextbox],
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: disableChromatic,
    },
  };

  return [name, component, metadata];
}

const defaultTextbox = () => {
  return (
    <Textbox placeholder={text("placeholder")} {...getCommonTextboxProps()} />
  );
};

const disabledTextbox = () => {
  return (
    <Textbox
      placeholder={text("placeholder")}
      value="value"
      {...getCommonTextboxProps(defaultStoryPropsConfig, false, true, false)}
    />
  );
};
const readOnlyTextbox = () => {
  return (
    <Textbox
      placeholder={text("placeholder")}
      value="value"
      {...getCommonTextboxProps(defaultStoryPropsConfig, false, false, true)}
    />
  );
};

const autoFocusTextbox = () => {
  return (
    <Textbox
      placeholder={text("placeholder")}
      {...getCommonTextboxProps(defaultStoryPropsConfig, true)}
    />
  );
};

const multipleTextbox = () => {
  const { key, ...rest } = getCommonTextboxProps();

  return (
    <div>
      <Textbox placeholder={text("placeholder")} key="0" {...rest} />
      <Textbox placeholder={text("placeholder")} key={key} {...rest} />
    </div>
  );
};

const multipleTextboxAutoFocus = () => {
  boolean("autoFocus", true);
  return multipleTextbox();
};
const requiredTextbox = () => {
  return (
    <Textbox
      {...getCommonTextboxProps({
        ...defaultStoryPropsConfig,
        requiredKnob: false,
      })}
      required
    />
  );
};

function makeValidationsStory(name, themeSelector, disableChromatic = false) {
  const validationTypes = ["error", "warning", "info"];
  const component = () => {
    return (
      <>
        <h4>Validation as string</h4>
        <h6>On component</h6>
        {validationTypes.map((validation) => (
          <Textbox
            key={`${validation}-string-component`}
            placeholder={text("placeholder")}
            label="Label"
            name="textbox"
            {...{ [validation]: "Message" }}
          />
        ))}

        <h6>Read Only</h6>
        <Textbox
          placeholder={text("placeholder")}
          label="Label "
          name="textbox"
          error="Message"
          readOnly
        />

        <h6>On label</h6>
        {validationTypes.map((validation) => (
          <Textbox
            key={`${validation}-string-label`}
            placeholder={text("placeholder")}
            label="Label"
            name="textbox"
            validationOnLabel
            {...{ [validation]: "Message" }}
          />
        ))}

        <h6>Read Only</h6>
        <Textbox
          placeholder={text("placeholder")}
          label="Label"
          name="textbox"
          error="Message"
          validationOnLabel
          readOnly
        />

        <h6>On label Inline</h6>
        {validationTypes.map((validation) => (
          <Textbox
            key={`${validation}-string-label`}
            placeholder={text("placeholder")}
            label="Label"
            name="textbox"
            validationOnLabel
            labelInline
            labelWidth={10}
            inputWidth={50}
            {...{ [validation]: "Message" }}
          />
        ))}

        <h4>Validation as boolean</h4>
        {validationTypes.map((validation) => (
          <Textbox
            key={`${validation}-boolean`}
            placeholder={text("placeholder")}
            label="Label"
            name="textbox"
            {...{ [validation]: true }}
          />
        ))}

        <h6>Read Only</h6>
        <Textbox
          key="error-string-component"
          placeholder={text("placeholder")}
          label="Label"
          name="textbox"
          error
          readOnly
        />
      </>
    );
  };

  const metadata = {
    themeSelector,
    info: {
      source: false,
      propTables: [OriginalTextbox],
    },
    chromatic: {
      disable: disableChromatic,
    },
  };

  return [name, component, metadata];
}

storiesOf("Experimental/Textbox", module)
  .add(...makeStory("default", dlsThemeSelector, defaultTextbox))
  .add(...makeStory("readOnly", dlsThemeSelector, readOnlyTextbox))
  .add(...makeStory("disabled", dlsThemeSelector, disabledTextbox))
  .add(...makeStory("classic", classicThemeSelector, defaultTextbox, true))
  .add(...makeStory("multiple", dlsThemeSelector, multipleTextbox))
  .add(...makeValidationsStory("validations", dlsThemeSelector))
  .add(
    ...makeValidationsStory("validations classic", classicThemeSelector, true)
  )
  .add(...makeStory("autoFocus", dlsThemeSelector, autoFocusTextbox))
  .add(
    ...makeStory(
      "multiple autoFocus",
      dlsThemeSelector,
      multipleTextboxAutoFocus
    )
  )
  .add(...makeStory("required", dlsThemeSelector, requiredTextbox));

// eslint-disable-next-line
export function getCommonTextboxProps(
  overrides = {},
  autoFocusDefault = false,
  disabledDefault = false,
  readOnlyDefault = false
) {
  const config = {
    ...defaultStoryPropsConfig,
    ...overrides,
  };
  const previous = {
    key: "textbox",
    autoFocus: autoFocusDefault,
  };
  const percentageRange = {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  };
  const disabled = boolean("disabled", disabledDefault);
  const readOnly = boolean("readOnly", readOnlyDefault);
  const prefix = text("prefix", "");
  const autoFocus = boolean("autoFocus", autoFocusDefault);
  const fieldHelp = text("fieldHelp");
  const label = text("label", "Label");
  const labelHelp = label ? text("labelHelp") : undefined;
  const labelInline = label ? boolean("labelInline", false) : undefined;
  const adaptiveLabelBreakpoint = labelInline
    ? number("adaptiveLabelBreakpoint")
    : undefined;
  const labelWidth = labelInline
    ? number("labelWidth", 30, percentageRange)
    : undefined;
  const inputWidth =
    labelInline && config.inputWidthEnabled
      ? number("inputWidth", 70, percentageRange)
      : undefined;
  const labelAlign = labelInline
    ? select("labelAlign", OptionsHelper.alignBinary)
    : undefined;
  const size = select("size", OptionsHelper.sizesRestricted, "medium");
  const key = AutoFocus.getKey(autoFocus, previous);
  const onClick = action("onClick");
  const iconOnClick = action("iconOnClick");
  const inputIcon = select("inputIcon", ["", ...OptionsHelper.icons]);

  const required = config.requiredKnob ? boolean("required", false) : undefined;

  return {
    key,
    disabled,
    readOnly,
    autoFocus,
    inputWidth,
    fieldHelp,
    label,
    labelHelp,
    labelInline,
    adaptiveLabelBreakpoint,
    labelWidth,
    labelAlign,
    size,
    onClick,
    iconOnClick,
    inputIcon,
    prefix,
    required,
  };
}
