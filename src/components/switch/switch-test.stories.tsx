/* eslint-disable no-console */
import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import I18nProvider from "../i18n-provider/i18n-provider.component";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Switch, { SwitchProps } from "./switch.component";
import styledSystemProps from "../../../.storybook/utils/styled-system-props";

export default {
  title: "Switch/Test",
  includeStories: [
    "Default",
    "NewDefault",
    "WithLongTextStrings",
    "SwitchClick",
    "SwitchLocale",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    inputWidth: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },
    labelWidth: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },
    labelSpacing: {
      options: [1, 2],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["small", "large"],
      control: {
        type: "select",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = ({
  fieldHelp,
  label,
  ...args
}: Partial<SwitchProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.target;
    setIsChecked(checked);
    console.log("change", `checked: ${checked}`);
  };
  return (
    <Switch
      onChange={handleChange}
      name="switch-default"
      checked={isChecked}
      onBlur={() => console.log("onBlur")}
      fieldHelp={fieldHelp}
      label={label}
      {...args}
    />
  );
};

Default.storyName = "default";
Default.args = {
  fieldHelp: "This text provides help for the input.",
  fieldHelpInline: false,
  label: "Switch on this component?",
  labelHelp: "Switch off and on this component.",
  helpAriaLabel: "Switch off and on this component.",
  labelInline: false,
  loading: false,
  inputWidth: 0,
  labelWidth: 0,
  labelSpacing: 1,
  reverse: true,
  value: "test-value",
  disabled: false,
  size: "small",
  required: false,
  isOptional: false,
};

export const NewDefault = ({
  fieldHelp,
  label,
  ...args
}: Partial<SwitchProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.target;
    setIsChecked(checked);
    console.log("change", `checked: ${checked}`);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <Switch
        m={2}
        onChange={handleChange}
        name="switch-default"
        checked={isChecked}
        onBlur={() => console.log("onBlur")}
        fieldHelp={fieldHelp}
        label={label}
        error="Error Message (Fix is required)"
        {...args}
      />
    </CarbonProvider>
  );
};

NewDefault.storyName = "new validation";
NewDefault.args = {
  label: "Label",
  labelHelp: "Hint text",
  labelInline: false,
  loading: false,
  inputWidth: 0,
  labelWidth: 0,
  labelSpacing: 1,
  reverse: true,
  value: "test-value",
  disabled: false,
  size: "small",
  required: false,
  isOptional: false,
};

export const WithLongTextStrings = () => (
  <I18nProvider
    locale={{
      locale: () => "fake-locale",
      switch: {
        on: () => "Absolutely",
        off: () => "Regrettably",
      },
    }}
  >
    <Switch />
  </I18nProvider>
);

WithLongTextStrings.storyName = "Long text strings";
WithLongTextStrings.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
};

// Play Functions
const meta: Meta<typeof Switch> = {
  title: "Switch",
  component: Switch,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export { meta };

type Story = StoryObj<typeof Switch>;

const SwitchDefaultExample = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.target;
    setIsChecked(checked);
    console.log("change", `checked: ${checked}`);
  };
  return (
    <Switch
      label="Switch on this component"
      onChange={handleChange}
      name="switch-default"
      checked={isChecked}
      onBlur={() => console.log("onBlur")}
    />
  );
};

const SwitchLocaleExample = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.target;
    setIsChecked(checked);
    console.log("change", `checked: ${checked}`);
  };
  return (
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        switch: {
          on: () => "sur",
          off: () => "de",
        },
      }}
    >
      {" "}
      <Switch
        label="Allumez ce composant"
        onChange={handleChange}
        name="switch-default"
        checked={isChecked}
        onBlur={() => console.log("onBlur")}
      />
    </I18nProvider>
  );
};

export const SwitchClick: Story = {
  render: () => <SwitchDefaultExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole("switch");

    await userEvent.click(switchElement);
  },
};

SwitchClick.storyName = "Switch Click";

export const SwitchLocale: Story = {
  render: () => <SwitchLocaleExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole("switch");

    await userEvent.click(switchElement);
  },
};

SwitchLocale.storyName = "Switch Locale";
