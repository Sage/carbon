import React, { useState, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";

import I18nProvider from "../../i18n-provider/i18n-provider.component";
import CarbonProvider from "../../carbon-provider/carbon-provider.component";
import Switch, { SwitchProps } from "./switch.component";
import Box from "../../box/box.component";
import { useMultiInputBoolean } from "../../../hooks/use-multi-input/use-multi-input";

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
  const { state, setValue } = useMultiInputBoolean();

  return (
    <>
      <Switch
        error="Error Message"
        mb={2}
        name="switch-error"
        checked={state["switch-error"] || false}
        onChange={setValue}
        {...args}
      />
      <Switch
        warning="Warning Message"
        mb={2}
        name="switch-warning"
        checked={state["switch-warning"] || false}
        onChange={setValue}
        {...args}
      />
      <Switch
        info="Info Message"
        mb={2}
        name="switch-info"
        checked={state["switch-info"] || false}
        onChange={setValue}
        {...args}
      />

      <Switch
        error="Error Message"
        validationOnLabel
        mb={2}
        name="switch-error-vol"
        checked={state["switch-error-vol"] || false}
        onChange={setValue}
        {...args}
      />
      <Switch
        warning="Warning Message"
        validationOnLabel
        mb={2}
        name="switch-warning-vol"
        checked={state["switch-warning-vol"] || false}
        onChange={setValue}
        {...args}
      />
      <Switch
        info="Info Message"
        validationOnLabel
        mb={2}
        name="switch-info-vol"
        checked={state["switch-info-vol"] || false}
        onChange={setValue}
        {...args}
      />

      <Switch
        error
        mb={2}
        name="switch-error-bool"
        checked={state["switch-error-bool"] || false}
        onChange={setValue}
        {...args}
      />
      <Switch
        warning
        mb={2}
        name="switch-warning-bool"
        checked={state["switch-warning-bool"] || false}
        onChange={setValue}
        {...args}
      />
      <Switch
        info
        mb={2}
        name="switch-info-bool"
        checked={state["switch-info-bool"] || false}
        onChange={setValue}
        {...args}
      />
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
  const { state, setValue } = useMultiInputBoolean();

  return (
    <CarbonProvider validationRedesignOptIn>
      <Switch
        error="Error Message (Fix is required)"
        mb={2}
        name="switch-error"
        checked={state["switch-error"] || false}
        onChange={setValue}
        {...args}
      />
      <Switch
        warning="Warning Message (Fix is optional)"
        mb={2}
        name="switch-warning"
        checked={state["switch-warning"] || false}
        onChange={setValue}
        {...args}
      />
      <Switch
        validationMessagePositionTop={false}
        error="Error Message (Fix is required)"
        mb={2}
        name="switch-error-bottom"
        checked={state["switch-error-bottom"] || false}
        onChange={setValue}
        {...args}
      />
      <Switch
        validationMessagePositionTop={false}
        warning="Warning Message (Fix is optional)"
        mb={2}
        name="switch-warn-bottom"
        checked={state["switch-warn-bottom"] || false}
        onChange={setValue}
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
  const { state, setValue } = useMultiInputBoolean();

  return (
    <CarbonProvider validationRedesignOptIn>
      <Box maxWidth="400px" backgroundColor="#f5f5f5" p={2}>
        <Switch
          labelInline
          mb={2}
          name="switch-il"
          checked={state["switch-il"] || false}
          onChange={setValue}
          {...args}
        />
        <Switch
          labelInline
          labelHelp="Hint text"
          mb={2}
          name="switch-il-hint"
          checked={state["switch-il-hint"] || false}
          onChange={setValue}
          {...args}
        />
        <Switch
          labelInline
          labelHelp="Hint text"
          fieldHelp="fieldHelp"
          name="switch-il-field"
          checked={state["switch-il-field"] || false}
          onChange={setValue}
          {...args}
        />
        <Switch
          label="Label"
          labelInline
          labelWidth={50}
          labelHelp="Really long hint text that should wrap to the next line if it gets too long because labelWidth is set to 50%"
          fieldHelp="field help"
          mt={2}
          name="switch-il-long-help"
          checked={state["switch-il-long-help"] || false}
          onChange={setValue}
        />

        <Switch
          labelHelp="Hint text"
          error="Error Message (Fix is required)"
          labelInline
          my={2}
          name="switch-il-hint-error"
          checked={state["switch-il-hint-error"] || false}
          onChange={setValue}
          {...args}
        />
        <Switch
          warning="Warning Message (Fix is optional)"
          labelInline
          fieldHelp="fieldHelp"
          mb={2}
          name="switch-il-field-warn"
          checked={state["switch-il-field-warn"] || false}
          onChange={setValue}
          {...args}
        />
        <Switch
          labelHelp="Hint text"
          error="Error Message (Fix is required)"
          labelInline
          validationMessagePositionTop={false}
          my={2}
          name="switch-il-help-error-bot"
          checked={state["switch-il-help-error-bot"] || false}
          onChange={setValue}
          {...args}
        />
        <Switch
          warning="Warning Message (Fix is optional)"
          labelInline
          fieldHelp="fieldHelp"
          validationMessagePositionTop={false}
          mb={2}
          name="switch-il-field-warn-bot"
          checked={state["switch-il-field-warn-bot"] || false}
          onChange={setValue}
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

export const WithLongTextStrings = () => {
  const [state, setState] = useState(false);
  return (
    <I18nProvider
      locale={{
        locale: () => "fake-locale",
        switch: {
          on: () => "Absolutely",
          off: () => "Regrettably",
        },
      }}
    >
      <Switch checked={state} onChange={(e) => setState(e.target.checked)} />
    </I18nProvider>
  );
};

WithLongTextStrings.storyName = "Long text strings";
WithLongTextStrings.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
};

export const WithMargin = ({ ...args }: Partial<SwitchProps>) => {
  const [state, setState] = useState(false);
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
            checked={state}
            onChange={(e) => setState(e.target.checked)}
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
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
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
            setIsChecked((state) => !state);
          }}
          checked={isChecked}
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
            setIsChecked2((state) => !state);
          }}
          checked={isChecked2}
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
              setIsChecked3((state) => !state);
            }}
            checked={isChecked3}
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
  const { state, setValue } = useMultiInputBoolean();
  return (
    <>
      <Switch
        label="With fieldHelp and labelHelp"
        labelInline
        labelHelp="labelHelp"
        fieldHelp="This text provides help for the input."
        name="switch1"
        checked={state["switch1"] || false}
        onChange={setValue}
      />
      <Switch
        label="With inline fieldHelp and labelHelp"
        labelInline
        labelHelp="labelHelp"
        fieldHelp="This text provides help for the input."
        fieldHelpInline
        mt={2}
        name="switch2"
        checked={state["switch2"] || false}
        onChange={setValue}
      />
      <Switch
        label="With inline fieldHelp and labelHelp not reversed"
        labelInline
        labelHelp="labelHelp"
        fieldHelp="This text provides help for the input."
        fieldHelpInline
        reverse={false}
        mt={2}
        name="switch3"
        checked={state["switch3"] || false}
        onChange={setValue}
      />
    </>
  );
};
LabelHelpAndFieldHelp.storyName = "With labelHelp and fieldHelp";
LabelHelpAndFieldHelp.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
