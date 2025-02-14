/* eslint-disable no-console */
import React, { useState } from "react";
import I18nProvider from "../i18n-provider/i18n-provider.component";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Switch, { SwitchProps } from "./switch.component";
import Box from "../box/box.component";

export default {
  title: "Switch/Test",
  includeStories: [
    "Default",
    "NewDefault",
    "WithLongTextStrings",
    "WithMargin",
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

export const WithMargin = ({ ...args }: Partial<SwitchProps>) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box
        margin="var(--spacing200)"
        display="flex"
        flexDirection="column"
        gap="var(--spacing200)"
        minWidth="320px"
        maxWidth="1024px"
      >
        <Box display="flex" justifyContent="flex-start">
          <Switch
            label="Some text"
            labelInline
            reverse={args.reverse}
            defaultChecked
          />
        </Box>
      </Box>
    </CarbonProvider>
  );
};

WithMargin.storyName = "With Margin";
WithMargin.parameters = {
  chromatic: {
    themeProvider: { chromatic: { theme: "sage" } },
    disableSnapshot: false,
  },
};
WithMargin.args = {
  reverse: true,
};
