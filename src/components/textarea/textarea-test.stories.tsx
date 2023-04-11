/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Textarea, { TextareaProps } from ".";

interface TextareaTestProps extends TextareaProps {
  labelHelp?: string;
}

export default {
  title: "Textarea/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
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
    children: {
      control: {
        type: "text",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
    warning: {
      control: {
        type: "text",
      },
    },
    info: {
      control: {
        type: "text",
      },
    },
    characterLimit: {
      control: {
        type: "number",
      },
    },
    maxWidth: {
      control: {
        type: "text",
      },
    },
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
    characterLimit: undefined,
    inputWidth: 100,
    enforceCharacterLimit: true,
    label: "Textarea",
    labelHelp: "",
    labelInline: false,
    labelWidth: 30,
    labelAlign: undefined,
    adaptiveLabelBreakpoint: undefined,
    required: false,
  },
};

export const Default = ({
  placeholder,
  label,
  labelHelp,
  characterLimit,
  fieldHelp,
  ...args
}: TextareaTestProps) => {
  const [state, setState] = useState("");
  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };
  return (
    <Textarea
      {...args}
      name="textarea"
      onChange={handleChange}
      value={state}
      placeholder={placeholder}
      label={label}
      labelHelp={labelHelp}
      helpAriaLabel={labelHelp}
      characterLimit={characterLimit}
      fieldHelp={fieldHelp}
    />
  );
};

Default.storyName = "default";

export const TextareaComponent = ({ ...props }) => {
  const [state, setState] = React.useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Textarea label="Textarea" value={state} onChange={setValue} {...props} />
  );
};
