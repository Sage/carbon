/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within, expect } from "@storybook/test";

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
    "WithLoading",
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

export const WithLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingValidation, setIsLoadingValidation] = useState(false);
  const [isLoadingNewValidation, setIsLoadingNewValidation] = useState(false);
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (
      count <= 0 ||
      (!isLoading && !isLoadingValidation && !isLoadingNewValidation)
    )
      return () => {};

    const timeout = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [count, isLoading, isLoadingNewValidation, isLoadingValidation]);

  useEffect(() => {
    const removeLoading = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(removeLoading);
    };
  }, [isLoading]);

  useEffect(() => {
    const removeLoading = setTimeout(() => {
      setIsLoadingValidation(false);
    }, 5000);

    return () => {
      clearTimeout(removeLoading);
    };
  }, [isLoadingValidation]);

  useEffect(() => {
    const removeLoading = setTimeout(() => {
      setIsLoadingNewValidation(false);
    }, 5000);

    return () => {
      clearTimeout(removeLoading);
    };
  }, [isLoadingNewValidation]);

  return (
    <>
      <Box m={2}>
        <Switch
          label="Switch - loading"
          size="small"
          loading={isLoading}
          onChange={() => {
            setIsLoading(true);
            setCount(5);
          }}
        />
      </Box>

      <Box m={2}>
        <Switch
          label="Switch - loading with validation"
          error="Error message goes here"
          size="small"
          loading={isLoadingValidation}
          onChange={() => {
            setIsLoadingValidation(true);
            setCount(5);
          }}
        />
      </Box>

      <Box m={2}>
        <CarbonProvider validationRedesignOptIn>
          <Switch
            error="Error message goes here"
            label="Switch - loading with new validation"
            loading={isLoadingNewValidation}
            onChange={() => {
              setIsLoadingNewValidation(true);
              setCount(5);
            }}
          />
        </CarbonProvider>
      </Box>

      <Box m="2">
        {(isLoading || isLoadingValidation || isLoadingNewValidation) &&
          `Loading will finish in ${count} ...`}
      </Box>
    </>
  );
};
WithLoading.storyName = "With Loading";
WithLoading.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
// Play Functions
const meta: Meta<typeof Switch> = {
  title: "Switch",
  component: Switch,
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

    await waitFor(() => {
      expect(switchElement).toHaveFocus();
    });
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

SwitchClick.storyName = "Switch Click";
SwitchClick.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const SwitchLocale: Story = {
  render: () => <SwitchLocaleExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole("switch");

    await userEvent.click(switchElement);
  },
};

SwitchLocale.storyName = "Switch Locale";
