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
    <Password {...props} label="Password" value={state} onChange={setValue} />
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
        validationMessagePositionTop
        label="Password"
        error="Error Message"
        inputHint="Hint text (optional)."
        value={state}
        onChange={setValue}
        mb={2}
      />
      <Password
        validationMessagePositionTop
        label="Password"
        warning="Warning Message"
        value={state}
        onChange={setValue}
        mb={2}
      />
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
      />
    </>
  );
};
Validation.storyName = "Validation";

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

export const ImportantScenariosChromatic = () => {
  return (
    <>
      <Password
        label="Password - Default"
        value="Password"
        onChange={() => {}}
        mb={2}
      />
      <Password
        label="Password - Force Obscurity"
        forceObscurity
        value="Password"
        onChange={() => {}}
        mb={2}
      />
      <Password
        label="Password - Required"
        required
        value="Password"
        onChange={() => {}}
        mb={2}
      />
      <Password
        label="Password - Disabled"
        disabled
        value="Password"
        onChange={() => {}}
        mb={2}
      />
      <Password
        label="Password - ReadOnly"
        readOnly
        value="Password"
        onChange={() => {}}
        mb={2}
      />
      <Password
        label="Password - Error"
        error="Error Message"
        inputHint="Hint text (optional)."
        value="Password"
        onChange={() => {}}
        mb={2}
      />
      <Password
        label="Password - Warning"
        warning="Warning Message"
        value="Password"
        onChange={() => {}}
        mb={2}
      />
      <Password
        validationMessagePositionTop
        label="Password - Error Top"
        error="Error Message"
        inputHint="Hint text (optional)."
        value="Password"
        onChange={() => {}}
        mb={2}
      />
      <Password
        validationMessagePositionTop
        label="Password - Warning Top"
        warning="Warning Message"
        value="Password"
        onChange={() => {}}
        mb={2}
      />
      <Password
        label="Password - Small"
        size="small"
        value="Password"
        onChange={() => {}}
        mb={2}
      />
      <Password
        label="Password - Medium"
        size="medium"
        value="Password"
        onChange={() => {}}
        mb={2}
      />
      <Password
        label="Password - Large"
        size="large"
        value="Password"
        onChange={() => {}}
      />
    </>
  );
};
ImportantScenariosChromatic.storyName = "All Inputs";
ImportantScenariosChromatic.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const Sizes = (props: PasswordProps) => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <>
      <Password
        {...props}
        label="Password - size small"
        size="small"
        value={state}
        onChange={setValue}
      />
      <Password
        mt={2}
        {...props}
        label="Password - size medium"
        size="medium"
        value={state}
        onChange={setValue}
      />
      <Password
        mt={2}
        {...props}
        label="Password - size large"
        size="large"
        value={state}
        onChange={setValue}
      />
    </>
  );
};

Sizes.storyName = "Sizes";
