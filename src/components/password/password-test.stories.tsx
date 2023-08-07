import React, { useState } from "react";
import Password, { PasswordProps } from ".";

export default {
  title: "Password/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    labelInline: {
      control: {
        type: "boolean",
      },
    },
    labelAlign: {
      options: ["left", "right"],
      control: {
        type: "select",
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
    value: {
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
    forceObscurity: {
      control: {
        type: "boolean",
      },
    },
    inputHint: {
      control: {
        type: "text",
      },
    },
    prefix: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = (props: PasswordProps) => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password label="Password" value={state} onChange={setValue} {...props} />
  );
};

Default.storyName = "default";

export const PasswordComponent = ({ onChange, ...props }: PasswordProps) => {
  const [state, setState] = React.useState("test");

  const setValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState(ev.target.value);
    if (onChange) {
      onChange(ev);
    }
  };

  return (
    <Password label="Password" value={state} onChange={setValue} {...props} />
  );
};
