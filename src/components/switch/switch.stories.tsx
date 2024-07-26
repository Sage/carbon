import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Box from "../box";
import Switch, { SwitchProps } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Switch> = {
  title: "Switch",
  component: Switch,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = () => {
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
Default.storyName = "Default";

export const Sizes: Story = () => {
  return (
    <>
      <Switch label="small" name="switch-small" size="small" />
      <Switch label="large" name="switch-large" size="large" />
    </>
  );
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  return (
    <>
      <Switch label="Disabled switch" disabled />
      <Switch label="Disabled switch" disabled checked mt={2} />
    </>
  );
};
Disabled.storyName = "Disabled";

export const Required: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="Label"
      name="required"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
      required
    />
  );
};
Required.storyName = "Required";

export const Reversed: Story = () => {
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
Reversed.storyName = "Reversed";

export const IsOptional: Story = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      label="Label"
      name="switch-name"
      checked={isChecked}
      isOptional
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};
IsOptional.storyName = "IsOptional";

export const Loading: Story = () => {
  return (
    <>
      <Switch checked label="small on" size="small" loading />
      <Switch label="small off" size="small" loading />
      <Switch checked label="large on" size="large" loading />
      <Switch label="large off" size="large" loading />
    </>
  );
};
Loading.storyName = "Loading";

export const WithLabelInline: Story = () => {
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
WithLabelInline.storyName = "With labelInline";

export const WithFieldHelp: Story = () => {
  return (
    <>
      <Switch
        label="With fieldHelp"
        fieldHelp="This text provides help for the input."
      />
      <br />
      <Switch
        label="With inline fieldHelp"
        labelInline
        fieldHelp="This text provides help for the input."
        fieldHelpInline
      />
      <br />
      <Switch
        label="With fieldHelp and labelHelp"
        labelInline
        labelHelp="labelHelp"
        fieldHelp="This text provides help for the input."
      />
      <br />
      <Switch
        label="With inline fieldHelp and labelHelp"
        labelInline
        labelHelp="labelHelp"
        fieldHelp="This text provides help for the input."
        fieldHelpInline
      />
      <br />
      <Switch
        label="With inline fieldHelp and labelHelp not reversed"
        labelInline
        labelHelp="labelHelp"
        fieldHelp="This text provides help for the input."
        fieldHelpInline
        reverse={false}
      />
    </>
  );
};
WithFieldHelp.storyName = "With fieldHelp";

export const WithLabelHelp: Story = () => {
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
WithLabelHelp.storyName = "With labelHelp";

export const WithMargin: Story = () => {
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
WithMargin.storyName = "With Margin";

type StoryWithValidation = Story & {
  args: Partial<SwitchProps> & { validation?: string | boolean };
};

export const Validation: Story = {
  render: (args: Partial<SwitchProps> & { validation?: string | boolean }) => {
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
  },
  name: "Validation",
  parameters: { chromatic: { disableSnapshot: true } },
};

export const ValidationString: StoryWithValidation = {
  ...Validation,
  args: { ...Validation.args, validation: "Message" },
  name: "Single Switch - String Validation",
};

export const ValidationStringTooltip: StoryWithValidation = {
  ...Validation,
  args: { ...Validation.args, validation: "Message", tooltipPosition: "top" },
  name: "Single Switch - String Validation - Tooltip Position Overriden",
  parameters: { chromatic: { disableSnapshot: true } },
};

export const ValidationStringLabel: StoryWithValidation = {
  ...Validation,
  args: { ...Validation.args, validation: "Message", validationOnLabel: true },
  name: "Single Switch - String Validation - validationOnLabel",
};

export const ValidationStringLabelTooltip: StoryWithValidation = {
  ...Validation,
  args: {
    ...Validation.args,
    validation: "Message",
    validationOnLabel: true,
    tooltipPosition: "top",
  },
  name: "Single Switch - String Validation - validationOnLabel - Tooltip Position Overriden",
  parameters: { chromatic: { disableSnapshot: true } },
};

export const ValidationBoolean: StoryWithValidation = {
  ...Validation,
  args: { ...Validation.args, validation: true },
  name: "Single Switch - Boolean Validation",
};

export const NewValidationString: Story = () => {
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
NewValidationString.storyName = "Single Switch - New Validation";
