import React, { useState } from "react";
import Password, { PasswordProps } from ".";

export default {
  title: "Password/Test",
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
    inputWidth: {
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
    <Password label="Password" {...props} value={state} onChange={setValue} />
  );
};

Default.storyName = "Default";

export const Validation = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <>
      <Password
        label="Password"
        error="Error Message"
        inputHint="Hint text (optional)."
        value={state}
        onChange={setValue}
        mb={2}
      />
      <Password
        label="Password"
        warning="Warning Message"
        value={state}
        onChange={setValue}
        mb={2}
      />
      <Password
        validationMessagePositionTop={false}
        label="Password"
        error="Error Message"
        inputHint="Hint text (optional)."
        value={state}
        onChange={setValue}
        mb={2}
      />
      <Password
        validationMessagePositionTop={false}
        label="Password"
        warning="Warning Message"
        value={state}
        onChange={setValue}
      />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const AutoFocus = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password autoFocus label="Password" value={state} onChange={setValue} />
  );
};
AutoFocus.storyName = "Auto Focus";
AutoFocus.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
