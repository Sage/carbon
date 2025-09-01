import React, { useState, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";

import I18nProvider from "../i18n-provider/i18n-provider.component";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Switch, { SwitchProps } from "./switch.component";
import Box from "../box/box.component";

const meta: Meta<typeof Switch> = {
  title: "Switch/Test",
  component: Switch,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    label: {
      control: { type: "text" },
    },
    labelHelp: {
      control: { type: "text" },
    },
    fieldHelp: {
      control: { type: "text" },
    },
    error: {
      control: { type: "text" },
    },
    warning: {
      control: { type: "text" },
    },
    info: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = ({ ...args }: Partial<SwitchProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.target;
    setIsChecked(checked);
  };
  return (
    <Switch
      onChange={handleChange}
      name="switch-default"
      checked={isChecked}
      {...args}
    />
  );
};

Default.storyName = "Default";
Default.args = {
  fieldHelp: "This text provides help for the input.",
  label: "Switch on this component?",
  labelHelp: "Switch off and on this component.",
  helpAriaLabel: "Switch off and on this component.",
};

export const Validation: Story = ({ ...args }: Partial<SwitchProps>) => {
  return (
    <>
      <Switch error="Error Message" mb={2} {...args} />
      <Switch warning="Warning Message" mb={2} {...args} />
      <Switch info="Info Message" mb={2} {...args} />

      <Switch error="Error Message" validationOnLabel mb={2} {...args} />
      <Switch warning="Warning Message" validationOnLabel mb={2} {...args} />
      <Switch info="Info Message" validationOnLabel mb={2} {...args} />

      <Switch error mb={2} {...args} />
      <Switch warning mb={2} {...args} />
      <Switch info mb={2} {...args} />
    </>
  );
};
Validation.storyName = "Validation";
Validation.args = {
  label: "Label",
};
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation: Story = ({ ...args }: Partial<SwitchProps>) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Switch error="Error Message (Fix is required)" mb={2} {...args} />
      <Switch warning="Warning Message" mb={2} {...args} />
      <Switch
        validationMessagePositionTop={false}
        error="Error Message (Fix is required)"
        mb={2}
        {...args}
      />
      <Switch
        validationMessagePositionTop={false}
        warning="Warning Message"
        mb={2}
        {...args}
      />
    </CarbonProvider>
  );
};

NewValidation.storyName = "New Validation";
NewValidation.args = {
  label: "Label",
  labelHelp: "Hint text",
};
NewValidation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidationInline: Story = ({
  ...args
}: Partial<SwitchProps>) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box maxWidth="400px" backgroundColor="#f5f5f5" p={2}>
        <Switch {...args} />
        <Switch labelHelp="Hint text" mt={2} {...args} />
        <Switch labelHelp="Hint text" fieldHelp="fieldHelp" mt={2} {...args} />
        <Switch
          labelHelp="Really long hint text that should wrap to the next line if it gets too long because labelWidth is set to 50%"
          fieldHelp="fieldHelp"
          labelWidth={50}
          mt={2}
          {...args}
        />
        <Switch
          labelHelp="Hint text"
          error="Error Message (Fix is required)"
          mt={2}
          {...args}
        />
        <Switch
          warning="Warning Message"
          fieldHelp="fieldHelp"
          my={2}
          {...args}
        />
        <Switch
          labelHelp="Hint text"
          error="Error Message (Fix is required)"
          validationMessagePositionTop={false}
          mt={2}
          {...args}
        />
        <Switch
          warning="Warning Message"
          fieldHelp="fieldHelp"
          validationMessagePositionTop={false}
          my={2}
          {...args}
        />
        <Switch
          reverse={false}
          labelHelp="Hint text"
          error="Error Message (Fix is required)"
          mt={2}
          {...args}
        />
      </Box>
    </CarbonProvider>
  );
};
NewValidationInline.storyName = "New Validation Inline";
NewValidationInline.args = {
  label: "Label",
  labelInline: true,
};
NewValidationInline.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
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

export const LabelHelpAndFieldHelp = () => {
  return (
    <>
      <Switch
        label="With fieldHelp and labelHelp"
        labelInline
        labelHelp="labelHelp"
        fieldHelp="This text provides help for the input."
      />
      <Switch
        label="With inline fieldHelp and labelHelp"
        labelInline
        labelHelp="labelHelp"
        fieldHelp="This text provides help for the input."
        fieldHelpInline
        mt={2}
      />
      <Switch
        label="With inline fieldHelp and labelHelp not reversed"
        labelInline
        labelHelp="labelHelp"
        fieldHelp="This text provides help for the input."
        fieldHelpInline
        reverse={false}
        mt={2}
      />
    </>
  );
};
LabelHelpAndFieldHelp.storyName = "With labelHelp and fieldHelp";
LabelHelpAndFieldHelp.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
