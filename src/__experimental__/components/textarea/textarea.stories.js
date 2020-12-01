import React, { useState } from "react";
import { boolean, number, text, select } from "@storybook/addon-knobs";

import OptionsHelper from "../../../utils/helpers/options-helper";
import Textarea from ".";

export default {
  title: "Experimental/Textarea/Test",
  component: Textarea,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
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

// eslint-disable-next-line react/prop-types
export const Default = ({ autoFocusDefault }) => {
  const [state, setState] = useState("");

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
  const required = boolean("required", false);

  const handleChange = ({ target: { value } }) => {
    setState(value);
  };

  return (
    <Textarea
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
      value={state}
    />
  );
};

Default.story = {
  name: "default",
};
