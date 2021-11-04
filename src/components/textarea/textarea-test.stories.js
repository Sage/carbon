/* eslint-disable react/prop-types */
import React, { useState } from "react";

import specialCharacters, {
  number,
} from "../../../.storybook/utils/argTypes/specialCharacters";
import Textarea from ".";

export default {
  component: Textarea,
  title: "Textarea/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    labelAlign: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    cols: {
      control: {
        min: 0,
        max: 100,
        step: 1,
        type: "range",
      },
    },
    rows: {
      control: {
        min: 0,
        max: 100,
        step: 1,
        type: "range",
      },
    },
    inputWidth: {
      control: {
        min: 0,
        max: 100,
        step: 1,
        type: "range",
      },
    },
    labelWidth: {
      control: {
        min: 0,
        max: 100,
        step: 1,
        type: "range",
      },
    },
    adaptiveLabelBreakpoint: {
      control: {
        type: "number",
      },
    },
    placeholderSpecialCharacters: specialCharacters,
    labelSpecialCharacters: specialCharacters,
    labelHelpSpecialCharacters: specialCharacters,
    characterLimitSpecialCharacters: {
      options: [...specialCharacters.options, ...number.options],
      mapping: {
        ...specialCharacters.mapping,
        ...number.mapping,
      },
    },
    fieldHelpSpecialCharacters: specialCharacters,
  },
  args: {
    expandable: false,
    cols: 0,
    rows: 0,
    disabled: false,
    autoFocus: false,
    readOnly: false,
    placeholder: "",
    fieldHelp: "",
    characterLimit: "",
    inputWidth: 100,
    warnOverLimit: false,
    enforceCharacterLimit: true,
    label: "",
    labelHelp: "",
    labelInline: false,
    labelWidth: 30,
    labelAlign: undefined,
    adaptiveLabelBreakpoint: undefined,
    required: false,
    placeholderSpecialCharacters: undefined,
    labelSpecialCharacters: undefined,
    labelHelpSpecialCharacters: undefined,
    characterLimitSpecialCharacters: undefined,
    fieldHelpSpecialCharacters: undefined,
  },
};

export const Default = ({
  placeholder,
  placeholderSpecialCharacters,
  label,
  labelSpecialCharacters,
  labelHelp,
  labelHelpSpecialCharacters,
  characterLimit,
  characterLimitSpecialCharacters,
  fieldHelp,
  fieldHelpSpecialCharacters,
  ...args
}) => {
  const [state, setState] = useState("");
  const handleChange = ({ target: { value } }) => {
    setState(value);
  };
  return (
    <Textarea
      {...args}
      name="textarea"
      onChange={handleChange}
      value={state}
      placeholder={placeholder || placeholderSpecialCharacters}
      label={label || labelSpecialCharacters}
      labelHelp={labelHelp || labelHelpSpecialCharacters}
      helpAriaLabel={labelHelp || labelHelpSpecialCharacters}
      characterLimit={characterLimit || characterLimitSpecialCharacters}
      fieldHelp={fieldHelp || fieldHelpSpecialCharacters}
    />
  );
};
