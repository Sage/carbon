import React, { useState } from "react";
import { boolean, text, number, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import I18n from "i18n-js";
import { dlsThemeSelector } from "../../../../.storybook/theme-selectors";
import OptionsHelper from "../../../utils/helpers/options-helper";
import Switch, { BaseSwitch } from "./switch.component";

export default {
  title: "Experimental/Switch/Test",
  component: Switch,
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

const { translations } = I18n;
I18n.translations = {
  ...translations,
  fr: {
    ...translations.fr,
    switch: {
      on: "sur",
      off: "de",
    },
  },
};

export const Default = () => {
  const [isChecked, setIsChecked] = useState(false);

  const knobs = {
    fieldHelp: text("fieldHelp", "This text provides help for the input."),
    fieldHelpInline: boolean("fieldHelpInline", false),
    label: text("label", "Switch on this component?"),
    labelHelp: text("labelHelp", "Switch off and on this component."),
    labelInline: boolean("labelInline", false),
    loading: boolean("loading", false),
    onBlur: action("onBlur"),
    inputWidth: number("inputWidth", 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1,
    }),
    labelWidth: number("labelWidth", 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1,
    }),
    labelAlign: select(
      "labelAlign",
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ),
    labelSpacing: select("labelSpacing", [1, 2], 1),
    reverse: boolean("reverse", BaseSwitch.defaultProps.reverse),
    value: text("value", "test-value"),
    disabled: boolean("disabled", false),
    size: select("size", OptionsHelper.sizesBinary, "small"),
  };

  const handleChange = (ev) => {
    const { checked } = ev.target;
    setIsChecked(checked);
    action("change")(`checked: ${checked}`);
  };

  return (
    <Switch
      onChange={handleChange}
      name="switch-default"
      checked={isChecked}
      {...knobs}
    />
  );
};
