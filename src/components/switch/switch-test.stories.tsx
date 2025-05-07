import React, { useState, useEffect } from "react";
import I18nProvider from "../i18n-provider/i18n-provider.component";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Switch, { SwitchProps } from "./switch.component";
import Box from "../box/box.component";

export default {
  title: "Switch/Test",
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
  };
  return (
    <Switch
      onChange={handleChange}
      name="switch-default"
      checked={isChecked}
      fieldHelp={fieldHelp}
      label={label}
      {...args}
    />
  );
};

Default.storyName = "Default";
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

export const Validation = ({ ...args }: Partial<SwitchProps>) => {
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
  labelHelp: "",
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
Validation.parameters = {
  chromatic: { disableSnapshot: true },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = ({ ...args }: Partial<SwitchProps>) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Switch error="Error Message (Fix is required)" mb={2} {...args} />
      <Switch warning="Warning Message (Fix is optional)" mb={2} {...args} />
    </CarbonProvider>
  );
};

NewValidation.storyName = "New Validation";
NewValidation.args = {
  label: "Label",
  labelHelp: "Hint text",
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
NewValidation.parameters = {
  chromatic: { disableSnapshot: true },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidationInline = ({ ...args }: Partial<SwitchProps>) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Switch labelInline mb={2} {...args} />
      <Switch labelInline labelHelp="Hint text" mb={2} {...args} />
      <Switch
        labelInline
        labelHelp="Hint text"
        fieldHelp="fieldHelp"
        {...args}
      />
      <Switch
        label="Example switch"
        labelInline
        labelHelp="Really long hint text that should wrap to the next line if it gets too long"
        fieldHelp="Field help"
        mt={2}
      />

      <Switch
        labelHelp="Hint text"
        error="Error Message (Fix is required)"
        labelInline
        my={2}
        {...args}
      />
      <Switch
        warning="Warning Message (Fix is optional)"
        labelInline
        fieldHelp="fieldHelp"
        mb={2}
        {...args}
      />
    </CarbonProvider>
  );
};
NewValidationInline.storyName = "New Validation Inline";
NewValidationInline.args = {
  label: "Label",
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
NewValidationInline.parameters = {
  chromatic: { disableSnapshot: true },
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
WithLoading.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

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
