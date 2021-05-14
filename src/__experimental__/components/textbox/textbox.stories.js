import React from "react";

import { boolean, text, select, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Textbox from ".";

import OptionsHelper from "../../../utils/helpers/options-helper";

export default {
  title: "Experimental/Textbox/Test",
  component: Textbox,
  includeStories: ["Default", "multiple"],
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

export const getCommonTextboxProps = (
  autoFocusDefault = false,
  disabledDefault = false,
  readOnlyDefault = false
) => {
  const config = {
    inputWidthEnabled: true,
    requiredKnob: true,
    disablePrefix: false,
    disableInputIcon: false,
  };

  const percentageRange = {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  };
  const disabled = boolean("disabled", disabledDefault);
  const readOnly = boolean("readOnly", readOnlyDefault);
  const prefix = !config.disablePrefix ? text("prefix", "") : undefined;
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

  const onClick = action("onClick");
  const iconOnClick = action("iconOnClick");
  const inputIcon = !config.disableInputIcon
    ? select("inputIcon", ["", ...OptionsHelper.icons])
    : undefined;

  const required = config.requiredKnob ? boolean("required", false) : undefined;

  return {
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
};

export const Default = () => (
  <Textbox placeholder={text("placeholder")} {...getCommonTextboxProps()} />
);

Default.story = {
  name: "default",
};

export const multiple = () => (
  <>
    <Textbox placeholder={text("placeholder")} {...getCommonTextboxProps()} />
    <Textbox placeholder={text("placeholder")} {...getCommonTextboxProps()} />
  </>
);

multiple.story = {
  name: "multiple",
};
