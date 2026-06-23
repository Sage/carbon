import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import Password from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Password> = {
  title: "Password",
  component: Password,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { themeProvider: { chromatic: { theme: "sage" } } },
};

export default meta;
type Story = StoryObj<typeof Password>;

export const Default: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Password label="Password" value={state} onChange={setValue} />;
};
Default.storyName = "Default";

export const ForceObscurity: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      forceObscurity
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
ForceObscurity.storyName = "Force Obscurity";

export const InputHint: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  const hintStyles = {
    color: "var(--input-labelset-label-alt)",
    margin: 0,
    fontSize: "inherit",
  };

  const hint = (
    <div style={hintStyles}>
      <p style={{ margin: "0 0 4px" }}>Password must contain:</p>
      <ul style={{ margin: 0, paddingLeft: "20px" }}>
        <li>At least 8 characters</li>
        <li>At least one uppercase letter</li>
        <li>At least one lowercase letter</li>
        <li>At least one number</li>
        <li>At least one special character</li>
      </ul>
    </div>
  );

  return (
    <Password
      label="Password"
      value={state}
      onChange={setValue}
      inputHint={hint}
    />
  );
};
InputHint.storyName = "Input Hint";

export const Sizes: Story = () => {
  const [smallState, setSmallState] = useState("Password");
  const setSmallValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSmallState(target.value);
  };
  const [mediumState, setMediumState] = useState("Password");
  const setMediumValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setMediumState(target.value);
  };
  const [largeState, setLargeState] = useState("Password");
  const setLargeValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setLargeState(target.value);
  };

  return (
    <>
      <Password
        key="Password - Small"
        label="Password - Small"
        value={smallState}
        size="small"
        onChange={setSmallValue}
        mb={2}
      />
      <Password
        key="Password - Medium"
        label="Password - Medium"
        value={mediumState}
        size="medium"
        onChange={setMediumValue}
        mb={2}
      />
      <Password
        key="Password - Large"
        label="Password - Large"
        value={largeState}
        size="large"
        onChange={setLargeValue}
        mb={2}
      />
    </>
  );
};
Sizes.storyName = "Sizes";

export const Margins: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Password m={4} label="Password" value={state} onChange={setValue} />;
};
Margins.storyName = "Margins";

export const Disabled: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password disabled label="Password" value={state} onChange={setValue} />
  );
};
Disabled.storyName = "Disabled";

export const ReadOnly: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password readOnly label="Password" value={state} onChange={setValue} />
  );
};
ReadOnly.storyName = "Read Only";

export const WithLabelInline: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password labelInline label="Password" value={state} onChange={setValue} />
  );
};
WithLabelInline.storyName = "With Label Inline";
WithLabelInline.parameters = { chromatic: { disable: true } };

export const WithCustomMaxWidth: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      maxWidth="70%"
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
WithCustomMaxWidth.storyName = "With Custom maxWidth";

export const WithRequired: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password required label="Password" value={state} onChange={setValue} />
  );
};
WithRequired.storyName = "With Required";
