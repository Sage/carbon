import React, { useState } from "react";
import { StoryFn } from "@storybook/react";

import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Switch, { SwitchProps } from ".";
import Box from "../box";

export const Default = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="Label"
      name="switch-name"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};

export const Sizes = () => {
  return (
    <>
      <Switch label="small" name="switch-small" size="small" />
      <Switch label="large" name="switch-large" size="large" />
    </>
  );
};

export const Disabled = () => {
  return (
    <>
      <Switch label="Disabled switch" disabled />
      <Switch label="Disabled switch" disabled checked mt={2} />
    </>
  );
};

export const Required = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="Terms and Conditions"
      name="required"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
      required
    />
  );
};

export const Reversed = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="Reversed switch"
      name="reversed"
      reverse={false}
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};

export const Loading = () => {
  return (
    <>
      <Switch checked label="small on" size="small" loading />
      <Switch label="small off" size="small" loading />
      <Switch checked label="large on" size="large" loading />
      <Switch label="large off" size="large" loading />
    </>
  );
};

export const WithLabelInline = () => {
  return (
    <>
      <Switch label="With labelInline" labelInline />
      <Switch
        label="With labelInline and reversed"
        labelInline
        reverse={false}
      />
    </>
  );
};

export const WithFieldHelp = () => {
  return (
    <>
      <Switch
        label="With fieldHelp"
        fieldHelp="This text provides help for the input."
      />
      <Switch
        label="With inline fieldHelp"
        fieldHelp="This text provides help for the input."
        fieldHelpInline
      />
    </>
  );
};

export const WithLabelHelp = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="With labelHelp"
      labelHelp="This text provides more information for the label."
      helpAriaLabel="This text provides more information for the label."
      name="with-label-help"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};

export const WithMargin = () => {
  return (
    <>
      <Switch
        label="With labelHelp"
        labelHelp="This text provides more information for the label."
        m={2}
      />
      <Switch
        label="With labelHelp"
        labelHelp="This text provides more information for the label."
        m={4}
      />
      <Switch
        label="With labelHelp"
        labelHelp="This text provides more information for the label."
        m="9px"
      />
    </>
  );
};

export const Validation: StoryFn = (
  args: Partial<SwitchProps> & { validation?: string | boolean }
) => {
  return (
    <>
      <Switch
        error={args.validation}
        label="Example switch (error)"
        name="switch-error"
        validationOnLabel={args.validationOnLabel}
        tooltipPosition={args.tooltipPosition}
      />
      <Switch
        warning={args.validation}
        label="Example switch (warning)"
        name="switch-warning"
        validationOnLabel={args.validationOnLabel}
        tooltipPosition={args.tooltipPosition}
      />
      <Switch
        info={args.validation}
        label="Example switch (info)"
        name="switch-info"
        validationOnLabel={args.validationOnLabel}
        tooltipPosition={args.tooltipPosition}
      />
    </>
  );
};

export const ValidationString = Validation.bind({});
ValidationString.args = { validation: "Message" };

export const ValidationStringTooltip = Validation.bind({});
ValidationStringTooltip.args = {
  validation: "Message",
  tooltipPosition: "top",
};
ValidationStringTooltip.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationStringLabel = Validation.bind({});
ValidationStringLabel.args = { validation: "Message", validationOnLabel: true };

export const ValidationStringLabelTooltip = Validation.bind({});
ValidationStringLabelTooltip.args = {
  validation: "Message",
  validationOnLabel: true,
  tooltipPosition: "top",
};
ValidationStringLabelTooltip.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationBoolean = Validation.bind({});
ValidationBoolean.args = { validation: true };

export const NewValidationString: StoryFn = () => {
  return (
    <Box m={2}>
      <CarbonProvider validationRedesignOptIn>
        <Switch
          error="Error message (Fix is required)"
          label="Example switch (error)"
          labelHelp="Hint text"
          name="switch-error"
        />
        <Switch
          mt={2}
          warning="Warning message (Fix is optional)"
          label="Example switch (warning)"
          labelHelp="Hint text"
          name="switch-warning"
        />
      </CarbonProvider>
    </Box>
  );
};
