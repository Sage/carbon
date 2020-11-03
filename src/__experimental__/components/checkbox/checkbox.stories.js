import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { boolean, text, number, select } from "@storybook/addon-knobs";

import { dlsThemeSelector } from "../../../../.storybook/theme-selectors";
import OptionsHelper from "../../../utils/helpers/options-helper";
import { Checkbox } from ".";
import AutoFocus from "../../../utils/helpers/auto-focus";

export default {
  title: "Experimental/Checkbox/Test",
  component: Checkbox,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

function defaultKnobs(type, autoFocusDefault = false) {
  let theType = "";
  if (type === undefined) {
    theType = "default";
  } else {
    theType = type;
  }
  const label = `${text("label", "Example Checkbox", type)} (${theType})`;
  const autoFocus = boolean("autoFocus", autoFocusDefault, type);
  const previous = {
    key: "checkbox",
    autoFocus: autoFocusDefault,
  };
  const key = AutoFocus.getKey(autoFocus, previous);

  return {
    key,
    disabled: boolean("disabled", false, type),
    fieldHelp: text(
      "fieldHelp",
      "This text provides help for the input.",
      type
    ),
    fieldHelpInline: boolean("fieldHelpInline", false, type),
    reverse: boolean("reverse", false, type),
    autoFocus,
    label,
    labelHelp: text(
      "labelHelp",
      "This text provides more information for the label.",
      type
    ),
    onBlur: action("onBlur"),
    inputWidth: number(
      "inputWidth",
      0,
      {
        range: true,
        min: 0,
        max: 100,
        step: 1,
      },
      type
    ),
    labelWidth: number(
      "labelWidth",
      0,
      {
        range: true,
        min: 0,
        max: 100,
        step: 1,
      },
      type
    ),
    labelSpacing: select("labelSpacing", [1, 2], 1),
    size: select("size", OptionsHelper.sizesBinary, "small", type),
    value: text("value", type, type),
    ml: text("ml", "0", type),
    adaptiveSpacingBreakpoint: number("adaptiveSpacingBreakpoint"),
    required: boolean("required", false),
  };
}

const checkboxComponent = (autoFocus = false) => () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (ev) => {
    const { checked } = ev.target;

    setIsChecked(checked);

    action("change")(`checked: ${checked}`);
  };
  return (
    <Checkbox
      onChange={handleChange}
      {...defaultKnobs(undefined, autoFocus)}
      checked={isChecked}
    />
  );
};

export const Default = checkboxComponent();
export const autoFocus = checkboxComponent(true);
